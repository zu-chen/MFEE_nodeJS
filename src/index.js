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

// use->get.post.delete.put什麼方法都接受網址後面KEY找不到的路徑
app.use((req, res)=>{
    res.type('text/plain');
    res.status(404).send('找不到頁面')
})

// 4. Server 偵聽
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`port: ${port}`);
})