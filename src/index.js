require('dotenv').config(); // 拿取dotenv的設定檔

const express = require('express'); // 1. 引入 express
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const moment = require('moment-timezone');

const multer = require('multer'); // multer, dest=destination
// const upload = multer({dest: 'tmp_uploads/'});
const upload = require(__dirname + '/modules/upload-imgs')
const db = require(__dirname + '/modules/db_connect2')
const sessionStore = new MysqlStore({}, db)

const app = express(); // 2. 建立 web server 物件

app.set('view engine', 'ejs'); // 設定ejs樣版

app.use(express.static('public')); // express.static提供對靜態資原始檔的服務
// Top-level Middleware
app.use(express.urlencoded({extended:false})); // extended: false引用預設的"系統模塊querystring官方推薦
app.use(express.json());
app.use(session({
    secret: 'sdkjghoif39097894508tyighdsgkgiso', //  '加密用的字串'
    saveUninitialized: false, // 未初始化是否儲存
    resave: false,  // 沒變更內容是否強制回存
    store: sessionStore,
    cookie: {
        maxAge: 1800000  // 20分鐘，單位毫秒
    }
}));

app.use((req, res, next)=>{ // 動態baseUrl
    res.locals.baseUrl = req.baseUrl;
    res.locals.url = req.url;
    next();
});

// 若此行在app.use(express.static('public')); 優先顯示此行訊息
// app.get('/a.html', (req, res)=>{
//     res.send('假的')
// })
app.get('/', (req, res)=>{ // 3. 路由:指判斷應用程式如何回應用戶端對特定端點的要求
    res.send('hola')
})

app.get('/try-ejs', (req, res)=>{ // ejs
    res.render('a', {name:'Shinder'})
})

app.get('/json-sales', (req, res)=>{ // json
    const sales = require(__dirname + '/../data/sales')
// res.json or res.send 皆可
// res.json(sales);

res.render('json-sales', {sales}); // 建立json-sales.ejs可使用render
})

app.get('/try-qs', (req, res)=>{ // query:取得參數 於網址輸入?a=123
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

app.get('/try-post-form', (req, res)=>{ // get:ejs
    res.render('try-post-form', {email:'',password:''})
})

app.post('/try-post-form', (req, res)=>{ // post:按鈕送出後
    res.render('try-post-form', req.body)
})

app.get('/pending', (req, res)=>{
    // res.send('ok')
})

app.post('/try-upload', upload.single('avatar'), (req, res)=>{ // .single()上傳一個檔案
    res.json({
        file: req.file,
        body: req.body,
    })
})

app.post('/try-upload2', upload.array('photo'), (req, res)=>{ // .array()上傳多個檔案
    res.json(req.files)
})


app.get('/my-params1/:action/:id', (req, res)=>{ // : 冒號之後為代稱名, ? 為選擇性的
    req.params.second = true;
    res.json(req.params)
})

app.get('/my-params1/:action?/:id?', (req, res)=>{
    req.params.first = true;
    res.json(req.params)
})

// \d{}:數值 ?:-可有可無 ^:開頭 $:結尾 i:不區分大小寫
// /^\/09\d{2}-?\d{3}-?\d{3}$/i
app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res)=>{
    let u = req.url.slice(3);
    u = u.split('?')[0]; // query string 的部份不要
    // u = u.split('-').join('');
    u = u.replace(/-/g,''); // g全域
    res.send(u)
})

// 路由模組化
app.use('/ttt', require(__dirname + '/routes/admin2')); // '/ttt', 前綴網址 // 當成 middleware 使用
app.use('/', require(__dirname + '/routes/admin2'));

// express-session
app.get('/try-session', (req, res)=>{
    req.session.my_var = req.session.my_var || 0;
    req.session.my_var++;

    res.json({
        my_var: req.session.my_var,
        session: req.session
    })
})

// moment-timezone
app.get('/try-moment', (req, res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss'; // https://momentjs.com/docs/#/displaying/format/
    const m1 = moment();
    const m2 = moment('02/29/20', 'MM/DD/YY'); //輸入完時間要給格式

    res.json({
        m1: m1.format(fm),
        m1a: m1.tz('Europe/London').format(fm), //tz():timezone
        m2: m2.format(fm),
        m2a: m2.tz('Europe/London').format(fm),
    })
})


app.get('/try-db', async (req, res)=>{
    const [rows,fields] = await db.query("SELECT * FROM `address_book` ORDER BY `sid` DESC LIMIT 6")
    res.json({rows,fields}); // rows,fields 結果, 欄位定義的資料。 fields可不填
})

app.use('/address-book', require(__dirname + '/routes/address-book'))






// use->get.post.delete.put什麼方法都接受。網址後面KEY找不到的路徑
app.use((req, res)=>{
    res.type('text/plain');
    res.status(404).send('找不到頁面')
})

const port = process.env.PORT || 3000; // 4. Server 偵聽
app.listen(port, ()=>{
    console.log(`port: ${port}`, new Date());
})