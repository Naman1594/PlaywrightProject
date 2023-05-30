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
test.describe('Common component tests', () => {
  const helper = new Helper()

  test('Validate the data in memberInfoBox', async ({ browser }) => {
    const webContext = await helper.setNewContext(browser)
    const page = await webContext.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    const commonFeatures = await poManager.getCommonFeaturesPage()
    const accountSummaryPage = await poManager.getAccountSummaryPage()
    const pageHelper = new PageHelper(page)
    page.on('response', async (response) => {
      if (response.status() < 200 || response.status() >= 400) {
        console.log(
          'Failed Request URL>>>>',
          response.url(),
          ',response Code::>>>>',
          response.status(),
        )
      }
    })
    await loginPage.goTo()
    await pageHelper.waitTillHTMLRendered(page)
    await loginPage.loginMemberPortal()
    await loginPage.clickMemberAccessButton()
    await commonFeatures.waitForLoadingIconDisappear()
    await helper.delay(1000)
    await accountSummaryPage.validatePageHeader()
    await commonFeatures.validateMemberDetails()
    // await browser.close()
  })

  test('Verify the footer links', async ({ browser }) => {
    const webContext = await helper.setNewContext(browser)
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
    await loginPage.loginMemberPortal()
    await loginPage.clickMemberAccessButton()
    await commonFeatures.waitForLoadingIconDisappear()
    await accountSummaryPage.validatePageHeader()
    await commonFeatures.waitForLoadingIconDisappear()
    await pageHelper.waitTillHTMLRendered(page)
    await helper.delay(1000)
    await advicePage.adviceTab.click()
    await commonFeatures.waitForLoadingIconDisappear()
    await advicePage.header.waitFor('visible')
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
})
//Add another test to cover alerts
