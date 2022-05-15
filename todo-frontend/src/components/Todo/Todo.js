import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import './Todo.css';

const Todo = (props) => {
    const todoData = props.data;
    const todoId = props.data._id;

    const [ todoText, setTodoText ] = useState(todoData.payload.todo);
    const [ isChecked, setIsChecked ] = useState(todoData.payload.checked);

    const [ toggle, setToggle ] = useState(true);

    async function update() {
        console.log("Sending update to server");
        const todoObj = {
            todoId,
            payload: {
                checked: isChecked,
                todo: todoText
            }
        }
        props.updateTodo(todoObj);

    }

    const handleOnChange = async () => {
        setIsChecked(!isChecked);
    }

    useEffect((e) => {
        update();
    }, [isChecked]);

    return (
        <div className="Todo">
            { toggle ? (
                <>
                <div>
                <Button variant="danger"
                onClick={async (e) => {
                    await props.deleteTodo(todoId);
                    await props.getTodos();
                }}
                >X</Button>
                </div>
                <div>
                <span
                    onDoubleClick = {() => {
                        setToggle(false)
                    }}
                > {todoText} </span>
                </div>
                </>
            ) : (
                <>
                <div>
                <Button variant="success"
                onClick={(e) => {
                    setToggle(true);
                    update();
                }}
                >Save</Button>
                </div>
                <div>
                <input
                    type="text"
                    value={todoText}
                    style={{width: "80%"}}
                    onChange={(e) => { setTodoText(e.target.value) }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === 'Escape') {
                            setToggle(true)
                            update();
                            event.preventDefault()
                            event.stopPropagation()
                        }
                    }}
                />
                </div>
                </>
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