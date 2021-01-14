<<<<<<< HEAD
const express = require('express')
const upload = require(__dirname + '/../modules/upload-imgs') // 使資料可以寫入
const moment = require('moment-timezone')
const router = express.Router();
const db = require(__dirname + '/../modules/db_connect2');

router.use((req, res, next)=>{ // 動態baseUrl
    if(!req.session.admin){
        return res.redirect('/');
    }
    res.locals.baseUrl = req.baseUrl;
    res.locals.url = req.url;
    next();
});

const listHandler = async (req)=>{
    const perPage = 10;
    const [t_rows] = await db.query("SELECT COUNT(1) num FROM `address_book`");
    const totalRows = t_rows[0].num;
    const totalPages = Math.ceil(totalRows/perPage);

    let page = parseInt(req.query.page) || 1;

    let rows = [];
    if(totalRows > 0) {
        if(page < 1) page=1;
        if(page>totalPages) page=totalPages;

        [rows] = await db.query("SELECT * FROM `address_book` ORDER BY `sid` DESC LIMIT ?, ?",
            [(page-1)* perPage, perPage]);
        rows.forEach(item=>{ // 物件, 索引, 全部陣列 item, index, array
            item.birthday = moment(item.birthday).format('YYYY-MM-DD');
        })
    }
    return {
        perPage,
        totalRows,
        totalPages,
        page,
        rows,
    }
};
// 編輯
router.get('/:sid/edit', async (req, res)=>{ // 讀取
    const [rows] = await db.query("SELECT * FROM `address_book` WHERE sid=?", [ req.params.sid ]);
    if(rows.length !== 1){
        return res.redirect( res.locals.baseUrl + '/list' );
    }
    rows[0].birthday = moment(rows[0].birthday).format('YYYY-MM-DD'); // 轉換日期顯示格式, value才可顯示
    res.render('address-book/edit', rows[0]);
})
router.post('/:sid/edit', upload.none(), async (req, res)=>{ // 更新
    const {name, email, mobile, birthday, address} = req.body;
    const data = {name, email, mobile, birthday, address};

    const [result] = await db.query("UPDATE `address_book` SET ? WHERE sid=?", [data, req.params.sid]);
    // console.log(result); //terminal顯示
    // affectedRows, changedRows
    res.json({
        body:result, // console顯示
        success: result.changedRows===1
    });
    
})


// 刪除
router.delete('/:sid', async (req, res)=>{ // :sid, : 冒號之後為代稱名, 直接key數字得到params, key:sid value:158
    const [result] = await db.query("DELETE FROM `address_book` WHERE sid=?", [ req.params.sid ]);
    res.json({
        success: result.affectedRows===1
    });
})
//新增
router.get('/add', async (req, res)=>{
    res.render('address-book/add');
})
router.post('/add', upload.none(), async (req, res)=>{ // upload.none():抓取值但不更新
    // const data = {...req.body};
    const {name, email, mobile, birthday, address} = req.body; // 選擇要顯示的資料
    const data = {name, email, mobile, birthday, address};
    data.created_at =  new Date();
    data.stars =  10;
    const [result] = await db.query("INSERT INTO `address_book` SET ?", [data]);
    console.log(result);

    if(result.affectedRows===1){
        res.json({
            success: true,
            body: req.body,result
        });
    } else {
        res.json({
            success: false,
            body: req.body,
        });
    }
})



router.get('/list', async (req, res)=>{
    const output = await listHandler(req);
    res.render('address-book/list', output); // css
})

router.get('/api/list', async (req, res)=>{
    const output = await listHandler(req); // json
    res.json(output);
})

// router.get('/', listHandler)

module.exports = router;
=======
const express = require('express')
const upload = require(__dirname + '/../modules/upload-imgs') // 使資料可以寫入
const moment = require('moment-timezone')
const router = express.Router();
const db = require(__dirname + '/../modules/db_connect2');

router.use((req, res, next)=>{ // 動態baseUrl
    res.locals.baseUrl = req.baseUrl;
    res.locals.url = req.url;
    next();
});

const listHandler = async (req)=>{
    const perPage = 10;
    const [t_rows] = await db.query("SELECT COUNT(1) num FROM `address_book`");
    const totalRows = t_rows[0].num;
    const totalPages = Math.ceil(totalRows/perPage);

    let page = parseInt(req.query.page) || 1;

    let rows = [];
    if(totalRows > 0) {
        if(page < 1) page=1;
        if(page>totalPages) page=totalPages;

        [rows] = await db.query("SELECT * FROM `address_book` ORDER BY `sid` DESC LIMIT ?, ?",
            [(page-1)* perPage, perPage]);
        rows.forEach(item=>{ // 物件, 索引, 全部陣列 item, index, array
            item.birthday = moment(item.birthday).format('YYYY-MM-DD');
        })
    }
    return {
        perPage,
        totalRows,
        totalPages,
        page,
        rows,
    }
};
// 編輯
router.get('/:sid/edit', async (req, res)=>{ // 讀取
    const [rows] = await db.query("SELECT * FROM `address_book` WHERE sid=?", [ req.params.sid ]);
    if(rows.length !== 1){
        return res.redirect( res.locals.baseUrl + '/list' );
    }
    rows[0].birthday = moment(rows[0].birthday).format('YYYY-MM-DD'); // 轉換日期顯示格式, value才可顯示
    res.render('address-book/edit', rows[0]);
})
router.post('/:sid/edit', upload.none(), async (req, res)=>{ // 更新
    const {name, email, mobile, birthday, address} = req.body;
    const data = {name, email, mobile, birthday, address};

    const [result] = await db.query("UPDATE `address_book` SET ? WHERE sid=?", [data, req.params.sid]);
    // console.log(result); //terminal顯示
    // affectedRows, changedRows
    res.json({
        body:result, // console顯示
        success: result.changedRows===1
    });
    
})


// 刪除
router.delete('/:sid', async (req, res)=>{ // :sid, : 冒號之後為代稱名, 直接key數字得到params, key:sid value:158
    const [result] = await db.query("DELETE FROM `address_book` WHERE sid=?", [ req.params.sid ]);
    res.json({
        success: result.affectedRows===1
    });
})
//新增
router.get('/add', async (req, res)=>{
    res.render('address-book/add');
})
router.post('/add', upload.none(), async (req, res)=>{ // upload.none():抓取值但不更新
    // const data = {...req.body};
    const {name, email, mobile, birthday, address} = req.body; // 選擇要顯示的資料
    const data = {name, email, mobile, birthday, address};
    data.created_at =  new Date();
    data.stars =  10;
    const [result] = await db.query("INSERT INTO `address_book` SET ?", [data]);
    console.log(result);

    if(result.affectedRows===1){
        res.json({
            success: true,
            body: req.body,result
        });
    } else {
        res.json({
            success: false,
            body: req.body,
        });
    }
})



router.get('/list', async (req, res)=>{
    const output = await listHandler(req);
    res.render('address-book/list', output); // css
})

router.get('/api/list', async (req, res)=>{
    const output = await listHandler(req); // json
    res.json(output);
})

// router.get('/', listHandler)

module.exports = router;
>>>>>>> d48aef3134b77e01a8a5ac32e713b0cb64086178
