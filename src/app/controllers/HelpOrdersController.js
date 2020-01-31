import HelpOrders from '../models/HelpOrders';

class HelpOrdersController {
  async index(req, res) {
    const { id } = req.params;

    const questions = await HelpOrders.findAll({
      where: { student_id: id },
      attributes: ['question', 'answer'],
    });

    if (questions.length === 0) {
      return res.status(400).json({ error: "You don't have any question yet" });
    }

    return res.json(questions);
  }

  async store(req, res) {
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
