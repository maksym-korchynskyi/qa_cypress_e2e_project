import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('sign-up-username-field');
  }

  get emailField() {
    return cy.getByDataCy('sign-up-email-field');
  }

  get passwordField() {
    return cy.getByDataCy('sign-up-password-field');
  }

  get submitButton() {
    return cy.getByDataCy('sign-up-submit-button');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  fillForm({ username, email, password }) {
    this.typeUsername(username);
    this.typeEmail(email);
    this.typePassword(password);
  }

  clickOnSubmitButton() {
    this.submitButton.click();
  }
}

export default SignUpPageObject;
