const { v4: uuidv4 } = require("uuid");
const Todo = require("../model/Todo");

let todo = []

const getTodo = async (req, res) => {
    const { status } = req.query;

    // let result = todo;

    // if (status === "pending") {
    //     result = todo.filter(t => !t.isCom);
    // } else if (status === "completed") {
    //     result = todo.filter(t => t.isCom);
    // }

    // res.status(200).json(result);

    const todos = await Todo.find();

    let result = todos;

    if (status === "pending") {
        result = todos.filter(t => !t.isCom);
    } else if (status === "completed") {
        result = todos.filter(t => t.isCom);
    }

    res.status(200).json(result);
};

const addTodo = async (req, res) => {
    // const newTodo = {
    //     id: uuidv4(),
    //     txt: req.body.txt,
    //     isCom: false,
    // };

    // todo.push(newTodo)

    // res.status(201).json(newTodo);
    // const {txt} = req.body;

    const todo = await Todo.create(req.body);
    res.status(201).json(todo)

}

const todoUpdate = async (req, res) => {
    // todo = todo.map(todos => todos.id == req.params.id
    //     ? { ...todos, txt: req.body.txt }
    //     : todos
    // )
    // res.json({ message: "Todo updated" })
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(todo);
}

const todoDelete = async (req, res) => {
    // todo = todo.filter(todo => todo.id != req.params.id);
    // res.json({ message: "Todo deleted" })
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo Deleted" })
}


const todoComplete = async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todo.isCom = !todo.isCom;
    await todo.save();

    res.json(todo);
};

module.exports = { getTodo, addTodo, todoUpdate, todoDelete, todoComplete }
