import * as Yup from 'yup';
import { parseISO, addMonths, isBefore } from 'date-fns';
// import pt from 'date-fns/locale/pt';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

import WelcomeMail from '../jobs/WelcomeMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      where: { on: true },
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(enrollments);
  }

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

    const enrollmentExists = await Enrollment.findOne({
      where: { student_id: student.id },
    });

    if (enrollmentExists) {
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

    const { id } = await Enrollment.create({
      start_date: startDate,
      end_date: endDate,
      studentId: student.id,
      planId: plan.id,
      price,
    });

    const enrollment = await Enrollment.findByPk(id, {
      attributes: ['id', 'start_date', 'end_date', 'price', 'created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    await Queue.add(WelcomeMail.key, {
      enrollment,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' });
    }

    enrollment.on = false;

    await enrollment.save();

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
