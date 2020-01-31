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
}

export default new AnswerController();
