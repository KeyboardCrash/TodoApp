import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from 'react-toastify';

import './Home.css';
import Todo from '../Todo/Todo';
import helper from '../../lib/helper';

const Home = (props) => {
    const [ todos, setTodos ] = useState([]);
    const [ username, setUsername ] = useState("");
    const [ newTodo, setNewTodo ] = useState("");
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

    async function getTodos() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {

            fetch(API_ENDPOINT + '/getAllTodos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                },
            })
            .then(res => res.json())
            .then(data => {
                const parsedTodos = data.message
                setTodos(parsedTodos)
                console.log("Todos updated");
            })
            .catch(e => {
                helper.failedToConnectAlert();
                console.log(e);
            });

        } else {
            console.log('no access token');
        }
    }
    
    async function createTodo(todo) {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            fetch(API_ENDPOINT + '/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken
                },
                body: JSON.stringify({
                    'todo': todo
                })
            })
            .then(res => {
                if (res.ok) {
                    const notify = () => toast(`Successfully created todo!`, {
                        toastId: 'createdTodo'
                        });
                    notify();
                    console.log('Created todo data')
                    return res.json()
                } else {
                    const notify = () => toast.error(`Could not create todo. Error: ${res.message}`, {
                        toastId: 'failedCreateTodo'
                        });
                    notify();
                }
            })
            .then((data) => { 
                console.log(data)
                setNewTodo('');
                const newTodos = data.todos;
                setTodos(newTodos);
            })
            .catch(e => {
                helper.failedToConnectAlert();
                console.log(e);
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
            fetch(API_ENDPOINT + `/todo/${todoId}`, {
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
            })
            .catch(e => {
                helper.failedToConnectAlert();
                console.log(e);
            });
        } else {
            console.log('no access token');
        }
    }
    
    async function getUsername() {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            fetch(API_ENDPOINT + '/getUsername', {
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
            })
            .catch(e => {
                helper.failedToConnectAlert();
                console.log(e);
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
            fetch(API_ENDPOINT + `/todo/${todoId}`, {
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
            })
            .catch(e => {
                helper.failedToConnectAlert();
                console.log(e);
            });
        } else {
            console.log('no access token');
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
    
        const todo = newTodo;
        await createTodo(todo);
    }

    useEffect(() => {
        getUsername();
        getTodos();
    }, [props.todos]);

    return (
        <div className="Home">
            <div className="Welcome">
                <h2>Welcome, {username}!</h2>
            </div>
            <div className="todoContainer">
                {/* <button onClick={() => getTodos()}>Load todos</button>  */}

                <div className="newTodoForm">

                    <div className="newTodoInput">
                        <Form onSubmit={handleSubmit} autoComplete="off">
                        <Form.Group size="lg" controlId="todo">
                        {/* <Form.Label>Create a new todo</Form.Label> */}
                        <Form.Control
                            autoFocus
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        </Form.Group>
                        </Form>
                    </div>
                    <div className="newTodoButton">
                        <Button onClick={handleSubmit} size="lg" type="submit" disabled={!(newTodo.length > 0)}>
                            Submit
                        </Button>
                    </div>
                </div>


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