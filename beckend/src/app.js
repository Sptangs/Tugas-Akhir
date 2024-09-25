const express = require("express");
const cors = require("cors");
const user = require("./models/user");
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

try {
    user.createUserTable();
} catch (error) {
    console.error('Error creating user table:', error);
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
