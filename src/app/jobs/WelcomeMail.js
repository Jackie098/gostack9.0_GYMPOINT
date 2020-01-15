import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name} <${enrollment.student.email}`,
      subject: 'Matrícula feita com sucesso',
      template: 'welcome',
      context: {
        student: enrollment.student.name,
        tot_price: enrollment.price,
        plan: enrollment.plan.title,
        price_month: enrollment.plan.price,
        duration: enrollment.plan.duration,
        start_date: format(
          parseISO(enrollment.start_date),
          "'dia' dd 'de' MMMM', às' H:mm'h",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(enrollment.end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h",
          {
            locale: pt,
          }
        ),
        enrollment_date: format(
          parseISO(enrollment.created_ad),
          "'dia' dd 'de' MMMM', às' H:mm'h",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new WelcomeMail();
