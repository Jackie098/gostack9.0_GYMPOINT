import * as Yup from 'yup';
import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

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
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // HelpOrder id and not student id
    const { id } = req.params;

    const question = await HelpOrders.findByPk(id, {
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
      include: [
        { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
      ],
    });

    if (!question) {
      return res.status(401).json({ error: 'No question found' });
    }

    const { answer } = req.body;

    await question.update({
      answer,
      answer_at: new Date(),
    });

    await Queue.add(AnswerMail.key, {
      question,
    });

    return res.json(question);
  }
}

export default new AnswerController();
