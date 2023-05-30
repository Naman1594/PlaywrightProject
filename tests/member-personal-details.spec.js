const { test, expect } = require('@playwright/test')
require('dotenv').config()
const { POManager } = require('../pages/POManager')
const { Helper } = require('../utils/Helper')
const { PageHelper } = require('../utils/PageHelper')

test.describe('Member Personal Details Page Tests', async () => {
  const helper = new Helper()

  test.skip('User can navigate to Personal Details page and validate the layout and UI', async ({
    browser,
  }) => {
    const webContext = await helper.setNewContext(browser)
    const page = await webContext.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    const commonFeatures = await poManager.getCommonFeaturesPage()
    const accountSummaryPage = await poManager.getAccountSummaryPage()
    const personalDetailsPage = await poManager.getPersonalDetailsPage()
    await loginPage.goTo()
    await loginPage.loginMemberPortal()
    await loginPage.clickMemberAccessButton()
    await accountSummaryPage.validatePageHeader()
    await commonFeatures.waitForLoadingIconDisappear()
    await personalDetailsPage.subMenuItemLink.waitFor('visible')
    await page.waitForLoadState('networkidle')
    await helper.delay(2000)
    await personalDetailsPage.subMenuItemLink.click()
    await commonFeatures.waitForLoadingIconDisappear(50000)
    await personalDetailsPage.header.waitFor('visible')
    await personalDetailsPage.validatePageHeader()
    await commonFeatures.validateMemberDetails()
    await commonFeatures.validateFooterLinks()
    await personalDetailsPage.verifySectionHeadersAndEditLink()
    await personalDetailsPage.validatePersonalDetailsSection()
    await personalDetailsPage.validateContactDetailsSection()
    await personalDetailsPage.validateMembershipDetailsSection()
    await personalDetailsPage.validatePostalAddressDetailsSection()
    await personalDetailsPage.validateResidentialAddressDetails()
    await personalDetailsPage.validateEmailSection()
    await personalDetailsPage.validateEmployerTable()
    await page.evaluate(() => document.fonts.ready)
    // //Validating the layout of tabs that display on top of member portal, for different features
    await helper.delay(2000)
    await expect(
      await personalDetailsPage.insuranceDetailsContent.screenshot(),
    ).toMatchSnapshot('insurance-detail-content.png')
    await expect(
      await personalDetailsPage.bottomTextContent.screenshot(),
    ).toMatchSnapshot('bottom-text-content.png')
  })
})
