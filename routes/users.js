const express = require('express');
const router  = express.Router();
const db = require("../db");
const { Item,User } = db;
router.post('/create', function(req, res) {
  User.create({
    username: req.body.username
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:user_id/destroy', function(req, res) {
  User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/');
  });
});


module.exports = router;