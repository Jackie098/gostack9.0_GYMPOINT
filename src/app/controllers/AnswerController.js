import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';

class AnswerController {
  async index(req, res) {
    const { page } = req.query;

    const openOrders = await HelpOrders.findAll({
      where: { answer: null },
      attributes: ['id', 'question', 'answer', 'answer_at'],
      order: ['created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(openOrders);
  }

  async update(req, res) {
    // HelpOrder id and not student id
    const { id } = req.params;

    const question = await HelpOrders.findByPk(id);

    if (!question) {
      return res.status(401).json({ error: 'No question found' });
    }

    const { answer } = req.body;

    await question.update({
      answer,
      answer_at: new Date(),
    });

    return res.json(question);
  }
}

export default new AnswerController();
