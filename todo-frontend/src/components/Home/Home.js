import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';

import './Home.css';
import Todo from '../Todo/Todo';

const Home = (props) => {
    const [ todos, setTodos ] = useState([]);
    const [ username, setUsername ] = useState("");
    const [ newTodo, setNewTodo ] = useState("");

    useEffect(() => {
        getUsername();
        getTodos();
    }, []);

    async function getTodos() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            fetch('http://localhost:7999/api/getAllTodos', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': accessToken
                },
            }).then(res => res.json())
            .then(data => {
                const parsedTodos = data.message
                setTodos(parsedTodos)
                console.log("Todos updated")
            });
        } else {
            console.log('no access token');
        }
    }
    
    async function createTodo(todo) {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            fetch('http://localhost:7999/api/todo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': accessToken
                },
                body: JSON.stringify({
                    'todo': todo
                })
            }).then(res => {
                if (res.ok) {
                    const notify = () => toast(`Successfully created todo!`, {
                        toastId: 'createdTodo'
                      });
                    notify();
                    console.log('Created todo data')
                    return res.json()
                } else {
                    const notify = () => toast.error(`Error: ${res.message}`, {
                        toastId: 'failedCreateTodo'
                      });
                    notify();
                }
            });
        } else {
            console.log('no access token');
        }
    }

    async function deleteTodo(id) {
        const accessToken = localStorage.getItem('accessToken');
        const todoId = id
        console.log(`Requested todo id ${todoId}`);
        if (accessToken) {
            fetch(`http://localhost:7999/api/todo/${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                },
            }).then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(data => {
                console.log("Delete, then Todo Data updated");
                setTodos(data.todos);
                console.log(todos)
            });
        } else {
            console.log('no access token');
        }
    }
    
    async function getUsername() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            fetch('http://localhost:7999/api/getUsername', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'x-access-token': accessToken
                },
            }).then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(data => {
                console.log("Username data updated");
                setUsername(data.username);
            });
        } else {
            console.log('no access token');
        }
    }
    
    async function updateTodo(todoObj) {
        const accessToken = localStorage.getItem('accessToken');
        console.log(todoObj)
        const todoId = todoObj.todoId;
        const payload = todoObj.payload;

        if (accessToken) {
            fetch(`http://localhost:7999/api/todo/${todoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                },
                body: JSON.stringify({
                    payload: payload
                })
            }).then(res => {
                if (res.ok) {
                    return res.json()
                }
            }).then(data => {
                console.log(data);
            });
        } else {
            console.log('no access token');
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
    
        const todo = newTodo;
        const res = await createTodo(todo)
        .then(() => { setNewTodo(''); })
        .then(() => { getTodos(); })
    }

    return (
        <div className="Home">
            <div className="Welcome">
                <h2>Welcome, {username}!</h2>
            </div>
            <div className="todoContainer">
                {/* <button onClick={() => getTodos()}>Load todos</button>  */}
                <Form onSubmit={handleSubmit} autoComplete="off">
                    <Form.Group size="lg" controlId="todo">
                    <Form.Label>Todo</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    </Form.Group>


                    <Button size="lg" type="submit" disabled={!(newTodo.length > 0)}>
                    Submit todo
                    </Button>

                </Form>

                {/* <ul>
                {todos.map((todo, i) => {
                    return <li key={i}>{JSON.stringify(todo)}</li>
                })}
                </ul> */}

                {todos.map((todo, i) => {
                    return <Todo key = {todo._id} data = {todo} deleteTodo = {deleteTodo} getTodos = {getTodos} updateTodo = {updateTodo}/>
                })}
            </div>
        </div>
    );
}
export default Home;