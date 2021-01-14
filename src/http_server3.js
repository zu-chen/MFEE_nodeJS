const http = require('http');
const fs = require('fs');

// fs.promises.writeFile  -->fs沒有promise功能時的寫法
const server = http.createServer((req, res)=>{
    // fs.Promises.writeFile(file, data)
    fs.promises.writeFile(__dirname + '/headers3.txt', JSON.stringify(req.headers))
        // promise then    
        .then(()=>{
            res.end('ok');
        })
        .catch(ex=>{
            res.end('error:' + ex);
        })
})

server.listen(3000)

