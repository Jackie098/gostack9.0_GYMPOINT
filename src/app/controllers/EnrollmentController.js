import * as Yup from 'yup';
import { parseISO, addMonths, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      startDate: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.params.studentId);

    if (!student) {
      return res.status(400).json({ error: "Student doesn't exists" });
    }

    if (await Enrollment.findOne({ where: { student_id: student.id } })) {
      return res.status(401).json({ error: 'Student already enrollmented' });
    }

    const plan = await Plan.findByPk(req.params.planId);

    if (!plan) {
      return res.status(400).json({ error: "Plan doesn't exists" });
    }

    const startDate = parseISO(req.body.startDate);

    if (isBefore(startDate, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const endDate = addMonths(startDate, plan.duration);

    const price = plan.price * plan.duration;

    const enrollment = await Enrollment.create({
      start_date: startDate,
      end_date: endDate,
      studentId: student.id,
      planId: plan.id,
      price,
    });

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
