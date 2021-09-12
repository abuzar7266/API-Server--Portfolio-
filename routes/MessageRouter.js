var express = require('express');
var messageRouter = express.Router();
var mongoose = require('mongoose');
var Message = require('../models/messages');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');


messageRouter.use(bodyParser.json());
messageRouter.route('/')
  .get(authenticate.verifyUser,function(req, res, next) {
        Message.find()
        .then((msg) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(msg);
        }, (err) => next(err))
        .catch((err) => next(err));
  })
  .post(authenticate.verifyUser,function(req, res, next) {
        Message.create(req.body)
            .then((msg) => {
                console.log('Message Created ', msg);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(msg);
            }, (err) => next(err))
            .catch((err) => next(err));
  })
  .put(authenticate.verifyUser,function(req, res, next) {
    res.statusCode = 403;
    res.send('Warning: Operation is not valid');
  })
  .delete(authenticate.verifyUser,function(req, res, next) {
    Message.deleteMany()
    .then((msg) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(msg);
    }, (err) => next(err))
    .catch((err) => next(err));
  });
messageRouter.route('/:id')
  .get(authenticate.verifyUser,function(req, res, next)
  {
    Message.findById(req.params.id)
    .then((msg) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(msg);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  .post(authenticate.verifyUser,function(req, res, next) {
    res.statusCode = 403;
    res.send('Warning: Operation is not valid');
  })
  .put(authenticate.verifyUser,function(req, res, next) 
  {
    Message.findByIdAndUpdate(req.params.id,req.body)
    .then((msg) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(msg);
    }, (err) => next(err))
    .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser,function(req, res, next) {
    Message.findByIdAndRemove(req.params.id)
    .then((msg) => {
            res.statusCode = 200;
            res.send('Deleted successfully');
    }, (err) => next(err))
    .catch((err) => next(err));
  });
module.exports = messageRouter;
