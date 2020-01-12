// import * as Yup from 'yup';

import Plan from '../models/Plan';
// import User from '../models/User';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async store(req, res) {
    const planExists = await Plan.findOne();

    return res.json(planExists);
  }
}

export default new PlanController();
