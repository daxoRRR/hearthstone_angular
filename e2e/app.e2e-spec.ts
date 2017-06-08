import { NgHearthstonePage } from './app.po';

describe('ng-hearthstone App', () => {
  let page: NgHearthstonePage;

  beforeEach(() => {
    page = new NgHearthstonePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
