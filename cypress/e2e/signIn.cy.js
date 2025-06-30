/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';

describe('Sign In page', () => {
  const signInPage = new SignInPageObject();

  beforeEach(() => {
    cy.task('db:clear');
    cy.registerAndLogin().as('user');
  });

  it('should allow to log in with existing credentials', function () {
    signInPage.visit();

    signInPage.typeEmail(this.user.email);
    signInPage.typePassword(this.user.password);
    signInPage.clickOnSignInBtn();

    signInPage.checkUsernameValue(this.user.username);
  });

  it('should not allow to log in with wrong credentials', function () {
    signInPage.visit();

    signInPage.typeEmail(this.user.email);
    signInPage.typePassword(this.user.password + '1');
    signInPage.clickOnSignInBtn();

    signInPage.checkModalTitle('Login failed!');
  });
});
