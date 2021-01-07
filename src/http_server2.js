const http = require('http');
const fs = require('fs'); // fs module可用於與文件系統進行互動,所有的文件系统操作都具有同步的、callback、以及基於promise 的形式。

const server = http.createServer((req, res)=>{
    // fs.writeFile(file, data, callback)
    fs.writeFile(__dirname + '/headers.txt', JSON.stringify(req.headers), error=>{
        if(!error){
            res.end('ok');
        } else {
            res.end('error:' + error);
        }
    });
})

server.listen(3000)

