import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';

class AnswerController {
  async index(req, res) {
    const openOrders = await HelpOrders.findAll({
      where: { answer: null },
      attributes: ['id', 'question', 'answer', 'answer_at'],
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
