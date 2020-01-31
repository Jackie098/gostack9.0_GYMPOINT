import HelpOrders from '../models/HelpOrders';

class HelpOrdersController {
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
