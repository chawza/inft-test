import sqlite3 from "sqlite3";
// const dbLocation = ':memory:';
const dbLocation = './db/data.db';
const db = new sqlite3.Database(dbLocation);

export class DataNotFound extends Error {
  constructor(message = 'Data not Found'){
    super(message);
  }
}

export class ClientError extends Error {
  constructor(message = "Client Error", status = 400) {
    super(message);
    this.status = status;
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

  static async countAllReferrals() {
    const sql = 'SELECT count() FROM referral;';
    return new Promise(resolve => {
      db.get(sql, (err, row) => {
        if (err) {
          throw new DataNotFound();  
        }
        resolve(row['count()'])
      })
    })
  }

  static async getAllReferrals(page, pageNumbering=10) {
    const numberReferrals = await ReferralRepository.countAllReferrals();
    const maxPage = Math.ceil(numberReferrals / pageNumbering);
    if (page > maxPage) {
      throw new ClientError('page number has exceded max number of page');
    }

    const sql = `
      SELECT
        id, code, description, type, added_by, created_at
      FROM referral
      LIMIT ${pageNumbering}
      OFFSET ${(page - 1) * pageNumbering}
    `

    const referrals =  await new Promise(resolve => {
      db.all(sql, (err, rows) => {
        if (err) {
          throw new DataNotFound();  
        }
        resolve(rows)
      })
    })

    return {
      number: numberReferrals,
      maxPage,
      currentPage: page,
      referrals
    }
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
        resolve();
      })
    })
  }
}

export default ReferralRepository;