/**
 * view
 *
 * 1. template
 * 2. add event
 * 3. forward events to the controller
 */
import questionViewTemplate from './questionViewTemplate';
import ContentModal from './components/ContentModal';
import AnswerModal from './components/AnswerModal';
import View from '../View';

export default class QuestionView extends View {
  title = null;
  answer = null;

  constructor() {
    super(document.querySelector('main'));
  }

  addEvent(handlers) {
    this.$newEl.addEventListener('click', this.runDomEvents(handlers), true);
    this.$newEl.addEventListener('input', this.runDomEvents(handlers), true);
    document.addEventListener('keyup', ({ target, key }) => {
      if (target.classList.contains('answer_textarea')) {
        return;
      }
      if (key === 'ArrowRight') {
        handlers.handleChangeQuestion('next');
      }
      if (key === 'ArrowLeft') {
        handlers.handleChangeQuestion('next');
      }
    });
  }

  runDomEvents({
    handleChangeTextarea,
    handleChangeQuestion,
    handleShowAnswer,
    handleAddQuestion,
  }) {
    return ({ target }) => {
      if (target.classList.contains('next_button')) {
        handleChangeQuestion('next');
      }
      if (target.classList.contains('prev_button')) {
        handleChangeQuestion('prev');
      }
      if (target.classList.contains('open_answer_button')) {
        handleShowAnswer(true);
      }
      if (target.classList.contains('answer_textarea')) {
        handleChangeTextarea(target.value);
      }
      if (target.classList.contains('add-one')) {
        handleAddQuestion({
          title: 'test',
          answer: 'test',
          submitcount: 0,
          category: 'test',
        });
      }
    };
  }

  submitDisabled(isApplySubmit) {
    const submit = this.$newEl.querySelector('.submit_button');
    submit.disabled = !isApplySubmit;
  }

  displayTitle(title) {
    if (this.title !== title) {
      super.addComponent(
        '.content_modal',
        new ContentModal({ title }).component,
      );
    }
    this.title = title;
  }
  displayAnswer(answer) {
    if (this.answer !== answer) {
      super.addComponent(
        '.answer_modal',
        new AnswerModal({ answer }).component,
      );
    }
    this.answer = answer;
  }

  toggleAnswerModal({ currentQuestion, isShowAnswer }) {
    if (isShowAnswer) {
      this.displayAnswer(currentQuestion.answer);
      const answerModal = this.$newEl.querySelector('.answer_modal');

      setTimeout(() => {
        answerModal.classList.add('is--show');
      });
    } else {
      const answerModal = this.$newEl.querySelector('.answer_modal');
      answerModal.classList.remove('is--show');

      setTimeout(() => {
        this.displayAnswer('');
      }, 500);
    }
  }

  getTemplate() {
    return questionViewTemplate();
  }
}
