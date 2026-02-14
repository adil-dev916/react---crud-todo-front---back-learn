const express = require('express');
const cors = require("cors");
const router = require('./routes/todoRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/todo', router)

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})