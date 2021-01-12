const express = require('express')
const router = express.Router();
const db = require(__dirname + '/../modules/db_connect2');

router.get('/list', async (req, res)=>{
    const perPage = 10;
    const [t_rows] = await db.query("SELECT COUNT(1) num FROM `address_book`");
    const totalRows = t_rows[0].num;
    const totalPages = Math.ceil(totalRows/perPage);

    let page = parseInt(req.query.page) || 1;

    const [rows] = await db.query("SELECT * FROM `address_book` ORDER BY `sid` DESC LIMIT ?, ?",
        [(page-1)* perPage, perPage]); // 從第幾筆+1開始, 總共顯示幾筆

    res.json({
        perPage,
        totalRows,
        totalPages,
        page,
        rows,
    })
    // res.render('address-book/list', output);
})

module.exports = router;
