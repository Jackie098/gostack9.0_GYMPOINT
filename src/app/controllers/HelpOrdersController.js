import * as Yup from 'yup';
import HelpOrders from '../models/HelpOrders';

class HelpOrdersController {
  async index(req, res) {
    const { id } = req.params;

    const questions = await HelpOrders.findAll({
      where: { student_id: id },
      attributes: ['id', 'question', 'answer'],
    });

    if (questions.length === 0) {
      return res.status(400).json({ error: "You don't have any question yet" });
    }

    return res.json(questions);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentId = req.params.id;

    const { question } = req.body;

    const { createdAt } = await HelpOrders.create({
      student_id: studentId,
      question,
    });

    return res.json({ studentId, question, createdAt });
  }
}

export default new HelpOrdersController();
