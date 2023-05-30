const { test, expect } = require('@playwright/test')
require('dotenv').config()
const { POManager } = require('../pages/POManager')
const { Helper } = require('../utils/Helper')
const { PageHelper } = require('../utils/PageHelper')
const {
  PrivacyPolicyPage,
} = require('../pages/restStaticSite/PrivacyPolicyPage')
let webContext

test.describe.configure({ mode: 'parallel' })
test.describe.skip('Advice Page Tests', () => {
  const helper = new Helper()
  test.beforeAll(async ({ browser }) => {
    // const context = await browser.newContext()
    const context = await browser.newContext({
      httpCredentials: {
        username: 'kpmg',
        password: 'Rest2Mar2021#',
      },
    })
    const page = await context.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.loginMemberPortal()
    await loginPage.clickMemberAccessButton()
    await context.storageState({ path: 'state.json' })
  })

  test('Validate the data in memberInfoBox', async ({ browser }) => {
    webContext = await helper.setContext(browser)
    await webContext.setHTTPCredentials({
      username: 'kpmg',
      password: 'Rest2Mar2021#',
    })

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
    await loginPage.accessMemberPortal()
    await accountSummaryPage.validatePageHeader()
    await commonFeatures.validateMemberDetails()
  })

  test('Verify the footer links', async ({ browser }) => {
    webContext = await helper.setContext(browser)
    await webContext.setHTTPCredentials({
      username: 'kpmg',
      password: 'Rest2Mar2021#',
    })
    const page = await webContext.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    const accountSummaryPage = await poManager.getAccountSummaryPage()
    const advicePage = await poManager.getAdvicePage()
    const termsOfUsePage = await poManager.getTermsOfUsePage()
    const glossaryOfTermsPage = await poManager.getGlossaryOfTermsPage()
    const commonFeatures = await poManager.getCommonFeaturesPage()
    const pageHelper = new PageHelper(page)
    await loginPage.goTo()
    await loginPage.accessMemberPortal()
    await pageHelper.waitTillHTMLRendered(page)
    await accountSummaryPage.validatePageHeader()
    await advicePage.adviceTab.click()
    await advicePage.header.waitFor()
    await advicePage.validatePageHeader()
    await expect(advicePage.widgetTitle).toBeVisible()
    await pageHelper.waitTillHTMLRendered(page)
    //Validating the common page footer links
    await commonFeatures.validateFooterLinks()
    await commonFeatures.clickTermsOfUseLink()
    await termsOfUsePage.validatePageHeader()
    await commonFeatures.clickGlossaryOfTermsLink()
    await glossaryOfTermsPage.validatePageHeader()
    await commonFeatures.clickHomeLink()
    await accountSummaryPage.validatePageHeader()
    const [privacyPage] = await Promise.all([
      webContext.waitForEvent('page'),
      commonFeatures.clickPrivacyPolicyLink(),
    ])
    await privacyPage.waitForLoadState()
    const privacyPolicyPage = new PrivacyPolicyPage(privacyPage)
    await privacyPolicyPage.validatePageHeader()
    await pageHelper.waitTillHTMLRendered(page)
  })

  //Add another test to cover alerts
})
