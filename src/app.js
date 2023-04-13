import QuestionController from './question/QuestionController';
import QuestionModel from './question/QuestionModel';
import QuestionView from './question/questionView';
import IndexedDB from './common/IndexedDB';
import Router from './router';
import ManageController from './manage/ManageController';
import ManageModel from './manage/ManageModel';
import ManageView from './manage/ManageView';
import LayoutView from './layouts/LayoutView';
import NotFoundView from './layouts/NotFoundView';

export default async () => {
  const db = new IndexedDB();
  await db.init();

  const renderList = {
    question() {
      new QuestionController(new QuestionModel(db), new QuestionView());
    },
    manage() {
      // TODO: Add Model
      new ManageController(new ManageModel(db), new ManageView());
    },
    notFound() {
      new NotFoundView();
    },
  };

  new Router({
    renderList,
    Layout: LayoutView,
    redirect: { path: '/', replace: '/question' },
  });
};
