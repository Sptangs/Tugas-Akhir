const db = require('mysql2');
const koneksi = db.createConnection({
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'portofolio'
});

koneksi.connect((err) => {
    if (err) {
        console.error('Error saat konek ke database', err.tack);
        return;
    }
    console.log("Berhasil Konek Database");
});

module.exports = koneksi;
