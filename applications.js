const express = require('express');

const { data, deleter, updater } = require('./db');


const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function application(req, res) {
  const datab = await data();
  res.render('applications', { datab });
}

router.get('/delete', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const id = req.query.id;
  deleter(id);
  res.redirect('/applications');
});

router.get('/update', (req, res) => {
  const updateid = req.query.id;
  updater(updateid);
  res.redirect('/applications');
});

/* todo útfæra */
router.get('/', catchErrors(application));

module.exports = router;
