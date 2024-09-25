const db = require("../config/db");
const bcrypt = require("bcryptjs");

const createUserTable = () => {
    const q = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(255)
    )`;

    db.query(q, (err, result) => {
        if (err) {
            console.error("error waktu buat table user", err.stack);
            return;
        }
        console.log("tabel user berhasil dibuat");
    });
};

const insertUser = (nama, email, password, callback) => {
    if (password) {
        const hashedPass = bcrypt.hashSync(password, 10);
        const q = "INSERT INTO users(nama, email, password) VALUES(?,?,?)";
        db.query(q, [nama, email, hashedPass], callback);
    } else {
        console.error("Password is undefined");
    }
};

const selectUserByEmail = (email, callback) => {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], callback);
};

const selectUserById = (id, callback) => {
    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q, [id], callback);
};

const deleteUser = (id, callback) => {
    const q = "DELETE FROM users WHERE id = ?";
    db.query(q, [id], callback);
};

const selectUser = (callback) => {
    const q = "SELECT * FROM users";
    db.query(q, callback);
};

module.exports = {
    createUserTable,
    selectUserByEmail,
    selectUserById,
    selectUser,
    insertUser,
    deleteUser,
};
