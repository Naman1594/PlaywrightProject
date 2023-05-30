const { test, expect } = require('@playwright/test')
require('dotenv').config()
const { POManager } = require('../pages/POManager')
const { Helper } = require('../utils/Helper')
const { PageHelper } = require('../utils/PageHelper')
const {
  PrivacyPolicyPage,
} = require('../pages/restStaticSite/PrivacyPolicyPage')
const { ContactRestPage } = require('../pages/restStaticSite/ContactRestPage')
let webContext

// test.describe.configure({ mode: 'parallel' })
test.describe.skip('Advice Page Tests', () => {
  const helper = new Helper()
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.loginMemberPortal()
    await loginPage.clickMemberAccessButton()
    await context.storageState({ path: 'state.json' })
  })

  test('Validate that you are able to navigate to Advice Page', async ({
    browser,
  }) => {
    webContext = await helper.setContext(browser)
    const page = await webContext.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    const accountSummaryPage = await poManager.getAccountSummaryPage()
    const advicePage = await poManager.getAdvicePage()
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
    await advicePage.adviceTab.click()
    await advicePage.header.waitFor()
    await advicePage.validatePageHeader()
    await expect(advicePage.widgetTitle).toBeVisible()
  })

  test('Visual test - Validate the layout and UI', async ({ browser }) => {
    webContext = await helper.setContext(browser)
    const page = await webContext.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    const accountSummaryPage = await poManager.getAccountSummaryPage()
    const advicePage = await poManager.getAdvicePage()
    const pageHelper = new PageHelper(page)
    await loginPage.goTo()
    await loginPage.accessMemberPortal()
    await accountSummaryPage.validatePageHeader()
    await advicePage.adviceTab.click()
    await advicePage.header.waitFor()
    await advicePage.validatePageHeader()
    await expect(advicePage.widgetTitle).toBeVisible()
    await pageHelper.waitTillHTMLRendered(page)

    //Validating the layout of tabs that display on top of member portal, for different features
    await expect(await advicePage.content.screenshot()).toMatchSnapshot(
      'advice-page-content.png',
    )

    //Validating the layout of tabs that display on top of the application, for different features
    await expect(await loginPage.content.screenshot()).toMatchSnapshot(
      'advice-page-content.png',
    )
  })

  test('Verify the links displaying in the page', async ({ browser }) => {
    webContext = await helper.setContext(browser)
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
    await advicePage.adviceTab.click()
    //*******Validating widget links***********
    // validating "Book a call" link
    const [contactPage] = await Promise.all([
      webContext.waitForEvent('page'),
      advicePage.clickBookACallWidgetButton(),
    ])
    await privacyPage.waitForLoadState()
    const contactRestPage = new ContactRestPage(contactPage)
    await contactRestPage.validatePageHeader()
  })
})
