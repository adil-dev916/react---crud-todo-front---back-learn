const { v4: uuidv4 } = require("uuid");

let todo = [
    {
        id: "sdfsd-23423-sdfsd-23423",
        txt: "Learn React",
        isCom: false
    },
    {
        id: "sdfsd-23423-sdfsd-23424",
        txt: "Learn Node",
        isCom: false
    },
    {
        id: "sdfsd-23423-sdfsd-23425",
        txt: "Learn Express",
        isCom: false
    },
]

const getTodo = (req, res) => {
    res.status(200).json(todo)
}

const addTodo = (req, res) => {
    const newTodo = {
        id: uuidv4(),
        txt: req.body.txt,
        isCom: false,
    };

    todo.push(newTodo)

    res.status(201).json(newTodo);
}

const todoUpdate = (req, res) => {
    todo = todo.map(todos => todos.id == req.params.id
        ? { ...todos, txt: req.body.txt }
        : todos
    )
    res.json({ message: "Todo updated" })
}

const todoDelete = (req, res) => {
    todo = todo.filter(todo => todo.id != req.params.id);
    res.json({ message: "Todo deleted" })
}


const todoComplete = (req, res) => {
    todo = todo.map(todos => todos.id == req.params.id
        ? { ...todos, isCom: !todos.isCom }
        : todos
    )
    res.json({ message: "Todo completed" })
}

module.exports = { getTodo, addTodo, todoUpdate, todoDelete, todoComplete }