const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

// 有port讀port，反之則設為3000
const port = process.env.PORT || 3000;

// 註冊通用模板
hbs.registerPartials(__dirname + '/views/partials');

// 設定template模板要偵測哪個格式
app.set('view engine', 'hbs');

/* 用來註冊函式 */
hbs.registerHelper('getContent', () => {
    return 'Hello!~~~';
})

hbs.registerHelper('capital', (text) => {
    return text.toUpperCase();
})

// 很像中斷器(interceptor)，每一個url都會經過這個function
app.use((req, res, next) => {
    const date = new Date();
    fs.appendFile('server.log', `${date}: ${req.method}${req.url}\n`, (err) => {
        if (err) {
            console.log('can\'t not save to log');
        }
    })
    next();
});

/* 假設在維護可以用這個方式 要維護的東西在這之後就都會是顯示維護中*/
// app.use((req, res, next) => {
//     res.render('maintain.hbs', {});
// })

// 使用靜態頁面
app.use(express.static(__dirname + '/public'));


/* 呼叫的api */
app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'YUR',
        content: 'Hello!'
    })
    // res.send({
    //     name: 'YUR',
    //     age: 25
    // });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About',
        content: 'Hello I\'m content.'
    });
})

app.get('/projects', (req, res) => {
    res.render('project.hbs', {
        title: 'Project'
    });
});

app.get('/error', (req, res) => {
    res.send({
        errorMsg: 'your request is not correct.'
    })
})

// 開啟的網頁在哪個port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});