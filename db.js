/* eslint-disable no-unused-vars */
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL; // sótt úr env gegnum dotenv pakka
const client = new Client({
  connectionString,
});

/* todo útfæra */

async function insert(name, email, phone, texti, job) {
  client.connect();
  try {
    const query = 'INSERT INTO students (name, email, phone, texti, job) VALUES ($1, $2, $3, $4, $5)';
    const res = await client.query(query, [name, email, phone, texti, job]); //eslint-disable-line
  } catch (err) {
    throw (err);
  }
}

async function data() {
  client.connect();
  let res;
  try {
    res = await client.query('SELECT * FROM students ORDER BY id');
  } catch (err) {
    throw err;
  }
  return res.rows;
}

async function deleter(id) {
  client.connect();
  try {
    const query = `DELETE FROM students WHERE ID = ${id};`;
    const res = await client.query(query);
  } catch (err) {
    throw err;
  }
}

async function updater(id) {
  client.connect();
  try {
    const query = `UPDATE students SET processed = true, updated = current_timestamp WHERE ID = ${id};`;
    const res = await client.query(query);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  insert,
  data,
  deleter,
  updater,
};
