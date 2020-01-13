import * as Yup from 'yup';
import { parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      end_date: Yup.date().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findByPk(req.params.studentId);

    if (!studentExists) {
      return res.status(400).json({ error: "Student doesn't exists" });
    }

    const planExists = await Plan.findByPk(req.params.planId);

    if (!planExists) {
      return res.status(400).json({ error: "Plan doesn't exists" });
    }

    return res.json({
      student: studentExists,
      plan: planExists,
    });
  }
}

export default new EnrollmentController();
