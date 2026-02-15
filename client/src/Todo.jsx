import React, { useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { TbXboxXFilled } from "react-icons/tb";
import { ImRadioUnchecked } from "react-icons/im";
import { HiOutlinePencil } from "react-icons/hi2";
import { IoTrashOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useEffect } from 'react';
import toast from 'react-hot-toast';


const API_URL = "http://localhost:3000/api/todo";

const Todo = () => {

  const [todoData, setTodoData] = useState([])
  const [inputData, setInputData] = useState('')
  const [editData, setEditData] = useState('')
  const [editId, setEditId] = useState(null)
  const [showEdit, setShowEdit] = useState(false)

  const [cmpList, setCmpList] = useState([])
  const [filterShow, setFilterShow] = useState(false)

  // data fetching from backend
  const fetchTodo = async () => {
    const res = await axios.get(API_URL);
    setTodoData(res.data)
  }

  // data adding to backend
  const addTodo = async () => {
    if (inputData == '') return toast.error("Blank?")
    await axios.post(API_URL, { txt: inputData })
    setInputData("")
    fetchTodo();
  }

  // data delete from backend
  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodo();
  }

  // COMPLETE
  const completeTask = async (id) => {
    await axios.patch(`${API_URL}/${id}`)
    fetchTodo()
  }

  // data updating to backend
  const updateTodo = async () => {
    // if (editData.trim() === "") return

    await axios.put(`${API_URL}/${editId}`, { txt: editData })
    fetchTodo()
    setShowEdit(false)
  }

  const handlePending = async () => {
    const res = await axios.get(API_URL);
    setCmpList(res.data.filter(val => !val.isCom))
    setFilterShow(true)
    setShowEdit(false)
  }

  const handleComplete = async () => {
    const res = await axios.get(API_URL);
    setCmpList(res.data.filter(val => val.isCom))
    setFilterShow(true)
    setShowEdit(false)
  }

  // EDIT
  const todoEdit = (todo) => {
    if (todo.isCom) return
    setEditData(todo.txt)
    setEditId(todo.id)
    setShowEdit(true)
  }

  // FILTERS
  // const handlePending = () => {
  //   setCmpList(todoData.filter(val => !val.isCom))
  //   setFilterShow(true)
  //   setShowEdit(false)
  // }

  // const handleComplete = () => {
  //   setCmpList(todoData.filter(val => val.isCom))
  //   setFilterShow(true)
  //   setShowEdit(false)
  // }

  const handleAllData = () => {
    setFilterShow(false)
    setShowEdit(false)
  }

  const showList = filterShow ? cmpList : todoData

  useEffect(() => {
    fetchTodo();
  }, [])

  return (
    <div className='todo-main'>
      <div className='todo-bg'>

        <div className='todo-input-div'>
          <div className='he'>
            <input value={inputData} placeholder='Add Todo' onChange={(e) => setInputData(e.target.value)} />
            <button onClick={addTodo}>Add</button>
          </div>

          <div className="todo-filter-btn-main">
            <button onClick={handleAllData}>All</button>
            <button onClick={handlePending}>Pending</button>
            <button onClick={handleComplete}>Completed</button>
          </div>

          {showEdit &&
            <div className='he'>
              <input value={editData} placeholder='Edit todo' onChange={(e) => setEditData(e.target.value)} />
              <button onClick={updateTodo}>Update</button>
            </div>
          }
        </div>

        <div>
          {showList.map((value, index) => (
            <div key={value.id} className='todo-list'>

              <div className='todo-list-items'>
                <button onClick={() => completeTask(value.id)}>
                  {value.isCom
                    ? <FaCheckCircle color="white" />
                    : <ImRadioUnchecked color="white" />}
                </button>

                {value.isCom
                  ? <p><del>{value.txt}</del></p>
                  : <p>{value.txt}</p>}
              </div>

              <div className='todo-dlt-edit-btns'>
                {value.isCom
                  ? <button style={{ cursor: 'not-allowed' }}>
                    <TbXboxXFilled color='white' />
                  </button>
                  : <button onClick={() => todoEdit(value)}>
                    <HiOutlinePencil />
                  </button>
                }
                <button onClick={() => deleteTodo(value.id)}>
                  <IoTrashOutline />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Todo
