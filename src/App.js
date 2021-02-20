import React, { useEffect } from 'react'
import ToDoList from './Todo/ToDoList'
import Context from './context'
import { func } from 'prop-types'
import Loader from './loader'
import Modal from './Modal/Modal'

const AddToDo = React.lazy(
    () =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(import('./Todo/AddToDo'))
            }, 3000)
        })
)

function App() {
    const [todos, setTodos] = React.useState([
        // { id: 1, completed: false, title: 'Купити хліб' },
        // { id: 2, completed: true, title: 'Купити масло' },
        // { id: 3, completed: false, title: 'Купити молоко' },
    ])
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then((response) => response.json())
            .then((todos) => {
                setTimeout(() => {
                    setTodos(todos)
                    setLoading(false)
                }, 2000)
            })
    }, [])

    function toggleToDo(id) {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        )
    }

    function removeToDo(id) {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    function addToDo(title) {
        setTodos(
            todos.concat([
                {
                    title,
                    id: Date.now(),
                    completed: false,
                },
            ])
        )
    }

    return (
        <Context.Provider value={{ removeToDo }}>
            <div className="wrapper">
                <h1>React tutorial</h1>
                <Modal />

                <React.Suspense fallback={<Loader />}>
                    <AddToDo onCreat={addToDo} />
                </React.Suspense>

                {loading && <Loader />}
                {todos.length ? (
                    <ToDoList todos={todos} onToggle={toggleToDo} />
                ) : loading ? null : (
                    <p>No ToDos</p>
                )}
            </div>
        </Context.Provider>
    )
}

export default App
