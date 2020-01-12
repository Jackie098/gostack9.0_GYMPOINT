// import * as Yup from 'yup';

import Plan from '../models/Plan';
// import User from '../models/User';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async store(req, res) {
    const planExists = await Plan.findOne({
      where: {
        title: req.body.title,
      },
    });

    if (planExists) {
      return res
        .status(401)
        .json({ error: `Plan ${req.body.title} already exists` });
    }

    const { title, duration, price } = req.body;

    const plan = await Plan.create({
      title,
      duration,
      price,
    });

    return res.json(plan);
  }
}

export default new PlanController();
