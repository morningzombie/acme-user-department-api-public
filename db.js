const pg = require("pg");
const uuid = require("uuid");
const { Client } = pg;

const client = new Client("postgres://localhost/api_public");
client.connect();

const sync = async () => {
  const SQL = `
  DROP TABLE IF EXISTS people;
  CREATE TABLE people(
      id uuid PRIMARY KEY,
      name VARCHAR
      --'departmentId' uuid
  );
  CREATE TABLE department(
      name VARCHAR,
      'departmentId' UUID PRIMARY KEY
  );
  INSERT INTO people (name) VALUES ('RJ');
  `;
  //DROP and RECREATE TABLES
  //remember "departmentId" will need to be in quotes
};

const readDepartments = async () => {
  return [];
};

const readUsers = async () => {
  const SQL = "SELECT * FROM people";
  const response = await client.query(SQL);
  return response;
};
sync();

module.exports = {
  sync,
  readDepartments,
  readUsers
};
//you will eventually need to export all of these
/*
module.exports = {
  sync,
  readDepartments,
  readUsers,
  createDepartment,
  createUser,
  deleteDepartment,
  deleteUser,
  updateUser,
  updateDepartment
};
*/
