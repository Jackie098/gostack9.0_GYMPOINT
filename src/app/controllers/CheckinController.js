import { Op } from 'sequelize';
import { startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async store(req, res) {
    const studentId = req.params.id;

    const enrollment = await Enrollment.findOne({
      where: { student_id: studentId },
    });

    if (!enrollment) {
      return res.status(401).json({ error: "Students doesn't enrollmented" });
    }

    const today = new Date();

    const checkinsWeekly = await Checkin.findAll({
      where: {
        student_id: studentId,
        created_at: {
          [Op.between]: [startOfWeek(today), endOfWeek(today)],
        },
      },
    });

    if (checkinsWeekly.length > 5) {
      return res
        .status(400)
        .json({ error: 'Student already has the maximum weekly checkins' });
    }

    const checkinToday = await Checkin.findOne({
      where: {
        student_id: studentId,
        created_at: {
          [Op.between]: [startOfDay(today), endOfDay(today)],
        },
      },
    });

    if (checkinToday) {
      return res.status(401).json({ error: 'Checkin of today already done' });
    }

    const checkin = await Checkin.create({
      student_id: studentId,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
