const express = require('express');

const router = express.Router();
const db = require('../db');

const { User } = db;
router.post('/create', (req, res) => {
  User.create({
    username: req.body.username,
  }).then(() => {
    res.redirect('/');
  });
});

router.get('/:user_id/destroy', (req, res) => {
  User.destroy({
    where: {
      id: req.params.user_id,
    },
  }).then(() => {
    res.redirect('/');
  });
});

module.exports = router;
