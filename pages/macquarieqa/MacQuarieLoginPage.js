const { expect } = require("@playwright/test");
const { Helper } = require("../../utils/Helper");
const { PageHelper } = require("../../utils/PageHelper");
// const { Photo } = require("../macquarieqa/MacQuarieDashboardPage");
require("dotenv").config();

class MacQuarieLoginPage {
  constructor(page) {
    this.page = page;
    this.helper = new Helper();
    // this.photo = new Photo(this.page)
    this.pageHeader = page.locator('h2')
    this.usernameInputField = page.locator('[formcontrolname="username"]')
    this.passwordInputField = page.locator('[formcontrolname="password"]')
    this.loginButton = page.locator('button.btn.btn-primary:text("Login")')
    this.loginPageMessage = page.locator('dynamic-text');
  }

  async goTo() {
    await this.page.goto(process.env.BASE_URL);
  }

  async validateLoginPageHeader() {
    await expect(this.pageHeader).toHaveText('Login')
  }

  async validateLoginPageMessage() {
    await expect(this.loginPageMessage).toHaveText('You are successfully logged in!' , { timeout: 10000 } );
  }

  async loginMacquariePortal() {
    await this.goTo();
    await this.validateLoginPageHeader();
    await this.usernameInputField.fill(process.env.USERNAME);
    await this.passwordInputField.fill(process.env.PASSWORD);
    await this.loginButton.click();
    // await this.validateLoginPageMessage();
  }
  async clickMemberAccessButton() {
    // await this.goToMmberAccessButton.click()
    // await this.page.waitForLoadState('networkidle')

    Promise.all([
      this.goToMmberAccessButton.click(),
      // this.page.(
      //   (resp) =>
      //     resp.url().includes(process.env.MEMBER_DASHBOARD_REQUEST_URL) &&
      //     resp.status() === 200,
      // ),
      this.page.waitForNavigation(),
    ]);
  }
}

exports.MacQuarieLoginPage = MacQuarieLoginPage;
