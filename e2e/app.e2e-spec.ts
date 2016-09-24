import { GithubGraphqlAngular2Page } from './app.po';

describe('github-graphql-angular2 App', function() {
  let page: GithubGraphqlAngular2Page;

  beforeEach(() => {
    page = new GithubGraphqlAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
