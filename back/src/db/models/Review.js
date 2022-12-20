const { pool } = require("../database");

class Review {
    static async findAll() {
      const [results, fields, error] = await pool.query(
        {
          sql: "SELECT * FROM reviews"
        },
        function (error, results, fields) {
          if (error) throw error;
          console.log(results);
        }
      );
      return JSON.stringify(results);
    }
  }
  module.exports = { Review };