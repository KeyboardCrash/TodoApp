const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const UserModel = require('../model/user');
const TodoModel = require('../model/todo');

const auth_middlewares = require('../middlewares/auth');

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res, next) {
    res.json({
        message: 'Todo App API v1.0'
    });
});

/**
 * 
 * Grab Todo
 * GET /todo/:id will find the todo with matching id and return it
 * 
 * Returns the Todo object found
 */
router.get('/todo/:id', auth_middlewares.verifyJWT, async function(req, res) {
    const requestedId: string = req.params.id;

    const todo = await TodoModel.findById(requestedId).exec();

    console.log(`Requested todo ${requestedId}`);

    if (todo) {
        res.json({
            status: "Success",
            message: `Todo ${requestedId} found`,
            todo: todo
        });
    } else {
        res.status(404).json({
            status: "Fail",
            message: `Todo ${requestedId} not found`
        });
    }
});

/**
 * Create Todo
 * POST /todo will take a todo message and create a todo object, then store it in the database
 * 
 * Returns the Todo object created
 */
 router.post('/todo/', auth_middlewares.verifyJWT, async function(req, res) {
    
    const todo: string = req.body.todo;
    const {id, username} = req.user;
    // console.log(todo)
    // console.log(id, username)

    if(todo) {
        await TodoModel.create({
            userId: id,
            payload: {
                checked: false,
                todo: todo
            }
        }, function(err, ret) {
            if(err) res.json({message: err});
            console.log(`Created new todo`)
            console.log(ret)
            res.status(201).json({
                message: "Successfully created todo",
                created: ret
            });
        })

    } else {
        res.status(400).json(
            {
                status: "Fail",
                message: 'Todo must follow proper format {todo: message}'
            });
    }
});

/**
 * Update Todo
 * PATCH /todo/:id will find the matching Todo and replace the Todo object's payload with the new payload in the request body
 * 
 * Returns the new Todo payload
 */
router.patch('/todo/:id', auth_middlewares.verifyJWT, async function (req, res) {
    const {id, username} = req.user

    const updatePayload: object = req.body.payload
    const todoId: string = req.params.id

    if (todoId && updatePayload) {
        let todo = await TodoModel.findOneAndUpdate({_id: todoId}, {payload: updatePayload}, {
            new: true
        });

        if (todo) {
            res.status(202).json({
                message: "Updated Todo",
                todo: todo
            });
        } else {
            res.status(404).json({
                message: `Failed to edit Todo ${todoId}`
            });
        }
    } else {
        res.status(400).json({
            message: `Bad request`
        })
    }
});

router.delete('/todo/:id/', auth_middlewares.verifyJWT, async function(req, res) {
    
    const {id, username} = req.user;

    const todoId: string = req.params.id;
    // console.log(todo)
    // console.log(id, username)

    if (todoId) {
        try {
            const ret = await TodoModel.deleteOne({
                _id: todoId
            }); 
            if (ret.deletedCount) {
                const todos = await TodoModel.find();
                res.status(202).json({
                    message: `Deleted Todo ${todoId}`,
                    todos: todos
                });
            }  else {
                res.status(500).json({
                    message: `Failed to delete Todo ${todoId}`
                })
            }
        } catch (e) {
            res.status(500).json({
                message: `Failed to delete Todo ${todoId}`
            })
        }
    } else {
        res.status(404).json({
            message: `Bad request`
        });
    }
});

/**
 * Get All Todos
 * GET /getAllTodos will find all Todo's belonging to the logged in user and return them
 * 
 * Returns an array of Todo objects
 */
router.get('/getAllTodos', auth_middlewares.verifyJWT, async function(req, res) {
    
    const {id, username} = req.user
    // console.log(todo)
    // console.log(id, username)
    console.log(`Get all todos`)
    // const todos = await TodoModel.find();
    const todos = await TodoModel.find({
        userId: id
    });
    console.log(todos)
    res.json({message: todos})
});

/**
 * Delete All Todos
 * GET /deleteAllTodos will find all Todo's belonging to logged in user and delete them from the database
 * 
 * Returns number of todos deleted
 */
router.get('/deleteAllTodos', auth_middlewares.verifyJWT, async function(req, res) {
    
    const {id, username} = req.user
    // console.log(todo)
    // console.log(id, username)
    console.log(`Deleting all todos made by user ${username} userId ${id}`)
    const ret = await TodoModel.deleteMany({
        userId: {
            $eq: id
        }
    });
    res.json({
        message: `Deleted ${ret.deletedCount} entries`
    })
});

module.exports = router;
export {}