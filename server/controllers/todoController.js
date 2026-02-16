const { v4: uuidv4 } = require("uuid");

let todo = []

const getTodo = (req, res) => {
    const { status } = req.query;

    let result = todo;

    if (status === "pending") {
        result = todo.filter(t => !t.isCom);
    } else if (status === "completed") {
        result = todo.filter(t => t.isCom);
    }

    res.status(200).json(result);
};


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