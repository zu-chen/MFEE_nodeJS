const express = require('express') //與index內的相同, 共用同個記憶體位置

const router = express.Router();

// router.get('/admin2/:p1?/:p2?', (req, res)=>{ // ? 為選擇性的
//     res.json({
//         params: req.params,
//         url: req.url,
//         baseUrl: req.baseUrl, //前綴網址 "/ttt"
//     })
// })


router.use((req, res, next)=>{ // next接受一個function
    res.locals.shinder = '777'; // res.locals上通常挂载变量信息，即每次请求可能的值都不一样
    // res.send('middle'); // 不執行next(), 可打開此段
    next(); // 若是middleware一定要next(), 不然後面不會執行
})

const handler1 = (req, res)=>{
    res.json({
        params: req.params,
        url: req.url,
        baseUrl: req.baseUrl,
        locals: res.locals,
    })
};
router.get('/admin2/:p1?/:p2?', handler1);
router.get('/admin2a/:p3?/:p4?', handler1);

module.exports = router;


