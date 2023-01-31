import ReferralRepository, { DataNotFound } from "./model.js"

const { createNewReferral, editNewReferralById, getReferralById, getAllReferrals } = ReferralRepository;

class RefferalController {
  static async addNewReferral(req, res, next) {
    try {
      const { code, description, type, added_by } = req.body;
      await createNewReferral(code, description, type, added_by);
      res.status(200).send({
        message: "Referral Code has been saved!"
      })
    }
    catch (err) {
      next(err)
    }
  }

  static async editReferral(req, res, next) {
    try {
      const { id } = req.params;
      const { code, description, type } = req.body;
      await getReferralById(id);
      await editNewReferralById(id, code, description, type);
      res.status(200).send({
        message: "Referral Code has been edited"
      })
    }
    catch (err) {
      if(err instanceof DataNotFound) {
        res.status(400).send({ message: `Referral with id [${id}] is not found!`});
        return;
      }
      next(err)
    }
  }

  static async getReferral(req, res,next) {
    try {
      const { id } = req.params;
      const referral = await getReferralById(id);
      res.status(200).send(referral)
    }
    catch (err) {
      if(err instanceof DataNotFound) {
        res.status(400).send({ message: `Referral with id [${id}] is not found!`});
        return;
      }
      next(err)
    }
  }

  static async getAllReferrals(req, res, next) {
    try {
      const { currentPage, paginationNumber = 10 } = req.query;
      
      if (!currentPage) {
        res.status(400).send('Current page [int] is required');
        return;
      }

      const referrals = await getAllReferrals(currentPage, paginationNumber);
      res.status(200).send({
        page: page,
        currentPage: referrals.length,
        pageLength: 0,
        referrals: referrals
      })
    }
    catch (err) {
      next(err)
    }
  }
}

export default RefferalController;