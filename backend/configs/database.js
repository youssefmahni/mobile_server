const { createPool } = require("mysql");

const pool = createPool({
  port: 3306,
  host: "mariadb",
  user: "ysf",
  password: "ysf",
  database: "todos",
  connectionLimit: 10,
});


pool.getConnection((err, connection) => {
  if (err) {
    console.log("error connecting to database", err);
    setTimeout(() => {
      pool.getConnection((err, connection) => {
        if (err) {
          console.log("error connecting to database", err);
        } else {
          console.log("connected to database");
          createDev();
        }
      });
    }, 2000);
  } else {
    console.log("connected to database");
  }
}
);

module.exports = pool;