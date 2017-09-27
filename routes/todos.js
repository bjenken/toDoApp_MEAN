var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin@ds149974.mlab.com:49974/meantodos', ['todos']);

// get todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err, todos){
        if (err){
            res.send(err);
        }else{
            res.json(todos);
        }
    });
});

// get single todo
router.get('/todo/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, todo){
        if (err){
            res.send(err);
        }else{
            res.json(todo);
        }
    });
});

// save todo
router.post('/todo', function(req, res, next){
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error" : "invalid data"
        });
    } else {
        db.save(todo, function(err, result){
            if (err){
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});

module.exports = router;