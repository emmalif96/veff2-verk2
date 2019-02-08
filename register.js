const express = require('express');
const { check, validationResult } = require('express-validator/check');

const { sanitize } = require('express-validator/filter');

const { insert } = require('./db');

const router = express.Router();


function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

const validation = [
  check('name').isLength({ min: 1 }).withMessage('Nafn má ekki vera tómt'),

  check('email').isLength({ min: 1 }).withMessage('Netfang má ekki vera tómt'),

  check('email').isEmail().withMessage('Netfang verður að vera netfang'),

  check('phone').matches(/^[0-9]{3}[-,' ']?[0-9]{4}$/).withMessage('Símarnúmer verður að vera sjö tölustafir'),

  check('texti').isLength({ min: 100 }).withMessage('Kynning verður að vera minnsta kosti 100 stafir'),

  check('job').isLength({ min: 1 }).withMessage('Velja verður starf'),
];

const sanitazion = [
  sanitize('name')
    .trim()
    .escape(),
  sanitize('email')
    .normalizeEmail(),
  sanitize('phone')
    .blacklist('-')
    .toInt(),
  sanitize('texti')
    .trim()
    .escape(),
];

function form(req, res) {
  res.render('index', {
    name: '', email: '', phone: '', texti: '', job: '', errors: [],
  });
}

async function register(req, res) {
  let {body: {name, email, phone, texti, job,} = {} , } = req; // eslint-disable-line
  const errorsResult = validationResult(req);

  if (!errorsResult.isEmpty()) {
    const errors = errorsResult.mapped();
    if (email === '@') email = '';
    res.render('index', {
      name, email, phone, texti, job, errors,
    });
  } else {
    try {
      await insert(name, email, phone, texti, job);
    } catch (e) {
      throw e;
    }
    res.render('thanks');
  }
}

/* todo útfæra */
router.get('/', catchErrors(form));
router.post('/register', validation, sanitazion, catchErrors(register));
module.exports = router;
