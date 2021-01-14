const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'zu',
    password: 'admin',
    database: 'project11',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// module.exports 或 exports 。它們是一個特別的object，可以將 javascript裡任何型別的宣告，變成一個模組，供其他的應用程式或模組使用。
module.exports = pool.promise();