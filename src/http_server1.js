const http = require('http'); // 載入 Node.js 原生模組 http

const server = http.createServer((req, res)=>{ // 建立server
    // 在此處理 客戶端向 http server 發送過來的 req。
    
    // res.writeHead() 瀏覽器會根據這個回應格式，正確的將資料呈現在瀏覽器上
    // res.writeHead() 寫出的東西是出現在http的header，不是在body中喔。
    // 200 http的狀態碼 2正常 3轉向 4錯誤
    res.writeHead(200, {
    // ; charset=utf-8 新增中文顯示 p.s.用分號隔開
        'Content-Type': 'text/html; charset=utf-8'
    });

    // 送出response，用 end() —這個不是結束喔！
    // req.url ->get得到的值
    res.end(`
        <h2>Hello 123 台灣</h2>
        <p>${req.url}</p>
    `);
})

// 3000port
server.listen(3000)

