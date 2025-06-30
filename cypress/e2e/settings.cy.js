/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';

import ProfilePageObject from '../support/pages/profile.pageObject.js';
import SettingsPageObject from '../support/pages/settings.pageObject.js';

describe('Settings page', () => {
  let profilePage;
  const settingsPage = new SettingsPageObject();

  beforeEach(() => {
    cy.task('db:clear');

    cy.registerAndLogin()
      .as('user')
      .then(({ username }) => {
        profilePage = new ProfilePageObject(username);

        settingsPage.visit();
      });
  });

  it('should provide an ability to update username', () => {
    cy.task('generateUser').then(({ username }) => {
      settingsPage.typeUsername(username);
      settingsPage.clickOnUpdateButtonAndWait();

      settingsPage.checkUsernameValue(username);
    });
  });

  it('should provide an ability to update bio', () => {
    const bio = faker.lorem.paragraph();

    settingsPage.typeBio(bio);
    settingsPage.clickOnUpdateButtonAndWait();

    profilePage.visit();
    profilePage.checkBioValue(bio);
  });

  it.skip('should provide an ability to update an email', function () {
    cy.task('generateUser').then(({ email }) => {
      settingsPage.typeEmail(email);
      settingsPage.clickOnUpdateButtonAndWait();

      cy.login(email, this.user.password).should((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('should provide an ability to update password', function () {
    cy.task('generateUser').then(({ password }) => {
      settingsPage.typePassword(password);
      settingsPage.clickOnUpdateButtonAndWait();

      const email = this.user.email;

      cy.login(email, password).should((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
