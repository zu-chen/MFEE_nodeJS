const multer = require('multer');
// v4: uuidv4 固定寫法, 將軟件包導入本地文件的語法
const {v4: uuidv4} = require('uuid');

const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
}

// diskStorage儲存在硬碟
const storage = multer.diskStorage({
    // 路徑, cb:callback怎麼處理
    // null:沒有錯誤會丟一個空值(固定寫法)
    destination: function(req, file, cb){
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, __dirname + '/../../public/img');
    },
    // 檔名
    filename: function (req, file, cb){
        // uuidv4():會在img顯示獨立亂碼
        // .mimetype可以在<input>標籤裡面加上accept屬性，規定檔案的mimetype,須注意要使用mimetype，不是使用副檔名。
        cb(null, uuidv4() + extMap[file.mimetype])
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        //cb(null, ~~(Math.random() * 999999) +  "avatar-" + file.originalname);
    },
});

// 檔案過濾
const  fileFilter = function (req, file, cb){
    // !!:布林值有的話true沒有則false
    cb(null, !!extMap[file.mimetype])
}

module.exports = multer({storage, fileFilter})
