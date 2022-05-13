import React, { useEffect, useState } from "react";

async function getTodos(setTodos) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        fetch('http://localhost:7999/api/getAllTodos', {
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
            console.log("Data updated");
            setTodos(data.message);
        });
    } else {
        console.log('no access token');
    }
}

async function getUsername(setUsername) {
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
            console.log("Data updated");
            setUsername(data.username);
        });
    } else {
        console.log('no access token');
    }
}

const Home = (props) => {
    const [ todos, setTodos ] = useState([]);
    const [ username, setUsername ] = useState("");

    useEffect(() => {
        getUsername(setUsername);
    })

    return (
        <div className="Home">
            <h2>Hi, {username}!</h2>
            <button onClick={() => getTodos(setTodos)}>Load todos</button> 
            {console.log(todos)}
            <ul>
            {todos.map((todo) => {
                return <li>{JSON.stringify(todo)}</li>
            })}
            </ul>

        </div>
    );
}
export default Home;