const pg = require("pg");
const uuid = require("uuid");
const { Client } = pg;

const client = new Client("postgres://localhost/api_public");
client.connect();

const sync = async () => {
  const SQL = `
  DROP TABLE IF EXISTS people;
  DROP TABLE IF EXISTS department;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE people(
      id uuid PRIMARY KEY,
      name VARCHAR
  );
CREATE TABLE department(
  "departmentId" uuid PRIMARY KEY,
  name VARCHAR
);
  INSERT INTO people(id, name) VALUES (uuid_generate_v4(), 'RJ');
  INSERT INTO department("departmentId", name) VALUES (uuid_generate_v4(), 'HR');
  `;
  const response = await client.query(SQL);
  return response;
  //DROP and RECREATE TABLES
  //remember "departmentId" will need to be in quotes
};

// const readDepartments = async () => {
//   return [];
// };

const readUsers = async () => {
  const SQL = "SELECT * FROM people";
  const response = await client.query(SQL);
  return response;
};

const readDepartments = async () => {
  const SQL = "SELECT * FROM department";
  const response = await client.query(SQL);
  return response;
};


const createDepartment = async (name) => {
  const SQL = 'INSERT INTO department("departmentId", name) values($1, $2) returning *';
  const response = await client.query(SQL, [uuid(), name]);
  return response;
}

const deleteDepartment = async("departmentId") => {
  const SQL = 'DELETE FROM department WHERE "departmentId"=$1';
  await client.query(SQL, ["departmentId"]);
};


sync();

module.exports = {
  sync,
  readDepartments,
  readUsers,
  createDepartment,
  deleteDepartment

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
