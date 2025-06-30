/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';

describe('Sign Up page', () => {
  const signUpPage = new SignUpPageObject();

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').as('user');

    signUpPage.visit();
  });

  it('should create a user with valid credentials', function () {
    signUpPage.fillForm(this.user);
    signUpPage.clickOnSubmitButton();

    signUpPage.checkUsernameValue(this.user.username);
  });

  it(`should not allow to create a user with invalid email`, function () {
    signUpPage.fillForm({ ...this.user, email: '123456' });
    signUpPage.clickOnSubmitButton();

    signUpPage.checkModalTitle('Registration failed!');
  });

  it(`should not allow to create a user with invalid password`, function () {
    signUpPage.fillForm({ ...this.user, password: '123456' });
    signUpPage.clickOnSubmitButton();

    signUpPage.checkModalTitle('Registration failed!');
  });
});
