import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactDOM from 'react-dom';

import './Todo.css';

const Todo = (props) => {
    const todoData = props.data;
    const todoId = props.id;
    console.log(props)
    const [ todoText, setTodoText ] = useState(todoData.payload.todo);
    const [ isChecked, setIsChecked ] = useState(todoData.payload.checked);
    const [ toggle, setToggle ] = useState(true);

    async function updateTodo() {
        console.log("Sending update to server");
    }

    const handleOnChange = () => {
        setIsChecked(!isChecked);
        updateTodo();
    }

    return (
        <div className="Todo">
            { toggle ? (
                <div>
                    <Button variant="danger"
                    className="deleteButton"
                    onClick={(e) => {
                        console.log('deleted this todo, props data');
                        console.log(props)
                        props.deleteTodo(props);
                        props.getTodos();
                    }}
                    >X</Button>
                    <span
                        onDoubleClick = {() => {
                            setToggle(false)
                        }}
                    > {todoText} </span>
                </div>

            ) : (
                <div>
                    <Button variant="success"
                    className="editButton"
                    onClick={(e) => {
                        updateTodo();
                        setToggle(true);
                    }}
                    >Save</Button>
                    <input
                        type="text"
                        value={todoText}
                        style={{width: "80%"}}
                        onChange={(e) => { setTodoText(e.target.value) }}
                        onKeyDown={(event) => {
                            if (event.key == 'Enter' || event.key == 'Escape') {
                                setToggle(true)
                                updateTodo();
                                event.preventDefault()
                                event.stopPropagation()
                            }
                        }}
                    />
                </div>

                )
            }
            <input
                type="checkbox"
                id="checked"
                name="check"
                checked={isChecked}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default Todo;