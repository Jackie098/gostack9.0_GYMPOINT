import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { question } = data;

    await Mail.sendMail({
      to: `${question.student.name} <${question.student.email}`,
      subject: 'Pergunta respondida',
      template: 'question',
      context: {
        student: question.student.name,
        question: question.question,
        answer: question.answer,
        answerAt: format(
          parseISO(question.answer_at),
          "'dia' dd 'de' MMMM', às' H:mm'h",
          {
            locale: pt,
          }
        ),
        orderDate: format(
          parseISO(question.created_at),
          "'dia' dd 'de' MMMM', às' H:mm'h",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new AnswerMail();
