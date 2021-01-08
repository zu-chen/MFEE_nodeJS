// 拿取dotenv的設定檔
require('dotenv').config();

// 1. 引入 express
const express = require('express');

// 2. 建立 web server 物件
const app = express();

// 設定ejs樣版
app.set('view engine', 'ejs');

// express.static提供對靜態資原始檔的服務
app.use(express.static('public'));
// Top-level Middleware
// extended: false引用預設的"系統模塊querystring官方推薦
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// 若此行在app.use(express.static('public')); 優先顯示此行訊息
// app.get('/a.html', (req, res)=>{
//     res.send('假的')
// })

// 3. 路由:指判斷應用程式如何回應用戶端對特定端點的要求
app.get('/', (req, res)=>{
    res.send('hola')
})

// ejs
app.get('/try-ejs', (req, res)=>{
    res.render('a', {name:'Shinder'})
})

// json
app.get('/json-sales', (req, res)=>{
    const sales = require(__dirname + '/../data/sales')
// res.json or res.send 皆可
// res.json(sales);

// 建立json-sales.ejs可使用render
res.render('json-sales', {sales});
})

// query:取得參數 於網址輸入?a=123
app.get('/try-qs', (req, res)=>{
    res.json(req.query);
})

// 把 urlencodedParser 當 middleware中介軟體(過濾)
// const urlencodedParser = express.urlencoded({extended:false})
// app.post('/try-post', urlencodedParser, (req, res)=>{
//     res.json(req.body);
// })
// 有Top-level Middleware
app.post('/try-post', (req, res)=>{
    res.json(req.body);
})

// get:ejs
app.get('/try-post-form', (req, res)=>{
    res.render('try-post-form', {email:'',password:''})
})
// post:按鈕送出後
app.post('/try-post-form', (req, res)=>{
    res.render('try-post-form', req.body)
})

app.get('/pending', (req, res)=>{
    // res.send('ok')
})

// use->get.post.delete.put什麼方法都接受。網址後面KEY找不到的路徑
app.use((req, res)=>{
    res.type('text/plain');
    res.status(404).send('找不到頁面')
})

// 4. Server 偵聽
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`port: ${port}`, new Date());
})