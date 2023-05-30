const { expect } = require('@playwright/test')
const { Helper } = require('../../utils/Helper')
const { PageHelper } = require('../../utils/PageHelper')
require('dotenv').config()

class LoginPage {
  constructor(page) {
    this.page = page
    this.helper = new Helper()
    this.loginButton = page.locator('button[data-open="#navbar-login-menu"]')
    this.memberLogin = page.locator('text=Member login')
    this.usernameInputField = page.locator('input[type="text"]')
    this.nextButton = page.locator('text=Next')
    this.passwordInputField = page.locator('input[type="password"]')
    this.submitButton = page.locator('button[type="submit"]').first()
    this.goToMmberAccessButton = page.locator(
      'button:has-text("Go to Member Access")',
    )
    this.loggedInMemberName = page.locator(
      'div a[data-open="#navbar-usermenu"]',
    )
    this.yourAccountLink = page.locator(
      `li a[href*="${process.env.MEMBER_PORTAL_BASE_URL}"]`,
    )
    this.chatModalPopUp = page.locator('div#proactivechatmodal-content')
    this.chatCloseIcon = page.locator('a#proactivechatClose')
  }

  async goTo() {
    await this.page.goto(process.env.BASE_URL)
  }

  async loginMemberPortal() {
    await this.clickMemberLoginButton()
    await this.page.waitForLoadState('domcontentloaded')
    await this.usernameInputField.fill(process.env.MEMBER_NUMBER)
    await this.nextButton.click()
    await this.page.waitForLoadState('networkidle')
    // if (process.env.ENV_NAME === 'uat') {
    //   await expect(this.chatModalPopUp).toBeVisible({
    //     timeout: 30000,
    //   })
    //   await this.chatCloseIcon.click()
    // }
    await this.passwordInputField.fill(process.env.MEMBER_PASSWORD)
    await Promise.all([
      this.submitButton.click(),
      this.page.waitForResponse(
        (resp) =>
          resp.url().includes('/rauth/1.0.0/web/hybrid-set-cookie') &&
          resp.status() === 200,
      ),
    ])
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
    ])
  }

  async clickMemberLoginButton() {
    const pageHelper = new PageHelper(this.page)
    await this.loginButton.click()
    await this.memberLogin.click()
  }

  async accessMemberPortal() {
    await this.loggedInMemberName.click()
    await this.yourAccountLink.click()
    await this.page.waitForLoadState('networkidle')
  }

  // async loginMemberPortal(page){
  //   const poManager = new POManager(page)
  //   const loginPage = await poManager.getLoginPage()
  //   const commonFeatures = await poManager.getCommonFeaturesPage()
  //   await this.goTo()
  //   await loginPage.loginMemberPortal()
  //   await loginPage.clickMemberAccessButton()
  //   await commonFeatures.validateLoginSuccess()
  // }
}

exports.LoginPage = LoginPage
