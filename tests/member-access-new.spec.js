const { test, expect } = require('@playwright/test')
require('dotenv').config()
const { POManager } = require('../pages/POManager')
const { Helper } = require('../utils/Helper')
const { PageHelper } = require('../utils/PageHelper')

let webContext

test.describe.configure({ mode: 'parallel' })
test.describe.skip(' NEW Member Portal Tests', async () => {
  const helper = new Helper()

  test.beforeAll(async () => {
    process.on('uncaughtException', function (err) {
      console.error(
        new Date().toUTCString() + ' uncaughtException:',
        err.message,
      )
      console.error(err.stack)
      process.exit(1)
    })
  })

  test('Validate member details after login', async ({ browser }) => {
    webContext = await browser.newContext()
    const page = await webContext.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    const commonFeatures = await poManager.getCommonFeaturesPage()
    const accountSummaryPage = await poManager.getAccountSummaryPage()
    page.on('response', async (response) => {
      if (response.status() === 404) {
        console.log(
          'Failed Request URL>>>>',
          response.url(),
          ',response Code::>>>>',
          response.status(),
        )
      }
    })
    await loginPage.goTo()
    await loginPage.loginMemberPortal()
    await loginPage.clickMemberAccessButton()
    await commonFeatures.validateLoginSuccess()
    await accountSummaryPage.validatePageHeader()
    await commonFeatures.validateMemberDetails()
  })

  test('Visual test - Member > Account Summary Page', async ({ browser }) => {
    webContext = await browser.newContext()
    const page = await webContext.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    const commonFeatures = await poManager.getCommonFeaturesPage()
    const accountSummaryPage = await poManager.getAccountSummaryPage()
    await loginPage.goTo()
    await loginPage.loginMemberPortal()
    await loginPage.clickMemberAccessButton()
    await commonFeatures.validateLoginSuccess()
    await page.waitForLoadState('networkidle')
    await helper.delay(2000)
    // expect(await page.screenshot()).toMatchSnapshot('account-summary-page.png')
    //Validating the layout of tabs that display on top of member portal, for different features
    expect(
      await accountSummaryPage.parentTabContainer.screenshot(),
    ).toMatchSnapshot('top-navigation-tab-container.png')

    //Validating Member>Account Summary>Bottom Content
    expect(
      await accountSummaryPage.bottomTextContent.screenshot(),
    ).toMatchSnapshot('account-summary-page-bottom-text.png')

    //Validating the look and feel of Advice Marketing image

    expect(
      await commonFeatures.adviceMarketingImage.screenshot(),
    ).toMatchSnapshot('account-summary-page-advice-marketing-image.png')

    //Validating the sub links displaying on selecting Member tab
    expect(await accountSummaryPage.tabSubLinks.screenshot()).toMatchSnapshot(
      'member-tab-sub-links.png',
    )
  })

  test('Visual test - Advice page', async ({ browser }) => {
    webContext = await browser.newContext()
    const page = await webContext.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    const commonFeatures = await poManager.getCommonFeaturesPage()
    const advicePage = await poManager.getAdvicePage()
    const pageHelper = new PageHelper(page)
    await loginPage.goTo()
    await loginPage.loginMemberPortal()
    await loginPage.clickMemberAccessButton()
    await commonFeatures.validateLoginSuccess()
    await advicePage.adviceTab.click()
    await pageHelper.waitTillHTMLRendered(page)
    await advicePage.header.waitFor()
    await advicePage.validatePageHeader()
    await expect(advicePage.widgetTitle).toBeVisible()
    await pageHelper.waitTillHTMLRendered(page)

    //Validating the layout of tabs that display on top of member portal, for different features
    await expect(await advicePage.content.screenshot()).toMatchSnapshot(
      'advice-page-content.png',
    )
  })
})
