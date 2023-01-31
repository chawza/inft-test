import sqlite3 from "sqlite3";
// const dbLocation = ':memory:';
const dbLocation = './db/data.db';
const db = new sqlite3.Database(dbLocation);

export class DataNotFound extends Error {
  constructor(message = 'Data not Found'){
    super(message);
  }
}

class ReferralRepository {
  static async getReferralById(id) {
    const sql = `SELECT id, code, description, type, added_by, created_at FROM referral WHERE id=${id};`;
    return new Promise(resolve => {
      db.get(sql, (err, row) => {
        if (err) {
          throw new DataNotFound();  
        }
        resolve(row)
      })
    })
  }

  static async getAllReferrals(page, pageNumbering=10) {
    const sql = `
      SELECT
        id, code, description, type, added_by, created_at
      FROM referral
      LIMIT ${pageNumbering}
      OFFSET ${pageNumbering * (page - 1)}
    `
    return new Promise(resolve => {
      db.get(sql, (err, row) => {
        if (err) {
          throw new DataNotFound();  
        }
        resolve(row)
      })
    })
  }

  static async createNewReferral(code, description, type, added_by) {
    const created_add = Date.now(); 
    const sql = `
      INSERT INTO referral(
        code, description, type, added_by, created_at
      )
      VALUES(
        '${code}',
        '${description}',
        '${type}',
        '${added_by}',
        ${created_add}
      );
    `;
    return new Promise(resolve => {
      db.run(sql, (result, error) => {
        if (error) {
          throw new Error(error);
        }
        resolve();
      })
    })
  }

  static async editNewReferralById(id, code, description, type) {
    const sql = `
      UPDATE referral
      SET
        code = '${code}',
        description = '${description}',
        type = '${type}'
      WHERE
        id=${id};
    `;
    return new Promise(resolve => {
      db.run(sql, (result, error) => {
        if (error) {
          throw new Error(error);
        }
        console.log(result)
        resolve();
      })
    })
  }
}

export default ReferralRepository;