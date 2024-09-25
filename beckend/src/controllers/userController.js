const jwt = require("jsonwebtoken");
const bcrypt =  require("bcryptjs");
const User = require("../models/user");

const storeUser = (req, res) => {
    const { nama, email, password } = req.body;
    User.insertUser(nama, email, password, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "User Created", userId: result.insertId });
    });
};

const showUser = (req, res) => {
    const { id } = req.params;
    User.selectUserById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }
        res.status(200).json(result);
    });
};

const destroyUser = (req, res) => {
    const { id } = req.params;
    User.deleteUser(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("Data berhasil dihapus");
    });
};

const index = (req, res) => {
    User.selectUser((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "User Tidak Ditemukan" });
        }
        res.status(200).json(result);
    });
};

const login = (req, res) => {
    const { email, password } = req.body;
    User.selectUserByEmail(email, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const user = result[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ message: "Password Salah" });
        }
        const token = jwt.sign({ id: user.id }, "ayoosekolah", {
            expiresIn: 86400,
        });
        res.status(200).json({ auth: true, token });
    });
};

const logout = (req, res) => {
    res.status(200).json({ auth: false, token: null });
};

module.exports = {
    storeUser,
    showUser,
    login,
    logout,
    index,
    destroyUser
};