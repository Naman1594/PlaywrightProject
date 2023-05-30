const { test, expect } = require('@playwright/test')
require('dotenv').config()
const { POManager } = require('../pages/POManager')
const { Helper } = require('../utils/Helper')
const { PageHelper } = require('../utils/PageHelper')
const { ContactRestPage } = require('../pages/restStaticSite/ContactRestPage')
const {
  RetireHealthCheckPage,
} = require('../pages/midwinterPags/RetireHealthCheckPage')
const {
  InvestmentChoicePage,
} = require('../pages/midwinterPags/InvestmentChoicePage')
const {
  InsuranceNeedsAnalyserPage,
} = require('../pages/midwinterPags/InsuranceNeedsAnalyserPage')
const {
  ContributionsOptimiserPage,
} = require('../pages/midwinterPags/ContributionsOptimiserPage')
const {
  SuperHealthCheckPage,
} = require('../pages/midwinterPags/SuperHealthCheckPage')
// test.describe.configure({ mode: 'parallel' })
test.describe.skip('Advice Page Tests', () => {
  const helper = new Helper()

  test('User can navigate successfully to Advice Page and validate the layout and UI', async ({
    browser,
  }) => {
    const webContext = await helper.setNewContext(browser)
    const page = await webContext.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    const commonFeatures = await poManager.getCommonFeaturesPage()
    const accountSummaryPage = await poManager.getAccountSummaryPage()
    const advicePage = await poManager.getAdvicePage()
    const pageHelper = new PageHelper(page)
    await loginPage.goTo()
    await loginPage.loginMemberPortal()
    await loginPage.clickMemberAccessButton()
    await accountSummaryPage.validatePageHeader()
    await commonFeatures.waitForLoadingIconDisappear()
    await advicePage.adviceTab.waitFor('visible')
    await helper.delay(2000)
    await advicePage.adviceTab.click()
    await commonFeatures.waitForLoadingIconDisappear()
    await advicePage.header.waitFor('visible')
    await advicePage.validatePageHeader()
    await expect(advicePage.widgetTitle).toBeVisible()
    await pageHelper.waitTillHTMLRendered(page)
    await helper.delay(1000)
    await page.evaluate(() => document.fonts.ready)
    //Validating the layout of tabs that display on top of member portal, for different features
    await expect(await advicePage.content.screenshot()).toMatchSnapshot(
      'advice-page-content.png',
    )
  })

  test('Verify the links displaying in the page', async ({ browser }) => {
    let webContext = await helper.setNewContext(browser)
    const page = await webContext.newPage()
    const poManager = new POManager(page)
    const loginPage = await poManager.getLoginPage()
    const commonFeatures = await poManager.getCommonFeaturesPage()
    const accountSummaryPage = await poManager.getAccountSummaryPage()
    const advicePage = await poManager.getAdvicePage()
    const pageHelper = new PageHelper(page)
    await loginPage.goTo()
    await loginPage.loginMemberPortal()
    // await page.pause()
    await loginPage.clickMemberAccessButton()
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
    if (process.env.ENV_NAME === 'uat') {
      //*******Validating widget links***********
      /*
      // validating "Super health check" link
      const [superHealthPage] = await Promise.all([
        webContext.waitForEvent('page'),
        advicePage.clickSuperHealthCheckWidgetButton(),

      //   browser.newContext({
      //     httpCredentials: {
      //       username: process.env.KPMG_DEV_USERNAME,
      //       password: process.env.KPMG_DEV_PASSWORD,
      //     },
      //   }),
      // ])
      await page.waitForLoadState('networkidle')
      const superHealthCheckPage = new SuperHealthCheckPage(superHealthPage)
      await superHealthCheckPage.validatePageHeader()
      */

      // validating "Book a call" link
      const [contactPage] = await Promise.all([
        webContext.waitForEvent('page'),
        advicePage.clickBookACallWidgetButton(),
      ])
      await page.waitForLoadState('networkidle')
      const contactRestPage = new ContactRestPage(contactPage)
      await contactRestPage.validatePageHeader()
      // Validate Retirement Health Check link
      const [retHealthCheckPage] = await Promise.all([
        webContext.waitForEvent('page'),
        advicePage.clickRetirementHealthCheckWidgetButton(),
      ])
      await retHealthCheckPage.waitForNavigation()
      const retireHealthCheckPage = new RetireHealthCheckPage(
        retHealthCheckPage,
      )
      await retireHealthCheckPage.validatePageHeader()
      // Validate Investment Solution link
      const [invChoicePage] = await Promise.all([
        webContext.waitForEvent('page'),
        advicePage.clickInvestmentSolWidgetButton(),
      ])
      await invChoicePage.waitForNavigation()
      const investmentChoicePage = new InvestmentChoicePage(invChoicePage)
      await investmentChoicePage.validatePageHeader()
      // Insurance Needs Analyser link
      const [insNeedsPage] = await Promise.all([
        webContext.waitForEvent('page'),
        advicePage.clickInsNeedsAnalyserWidgetButton(),
      ])
      await insNeedsPage.waitForNavigation()
      const insuranceNeedsAnalyserPage = new InsuranceNeedsAnalyserPage(
        insNeedsPage,
      )
      await insuranceNeedsAnalyserPage.validatePageHeader()
      // Contributions Optimiser link

      const [contOptimserPage] = await Promise.all([
        webContext.waitForEvent('page'),
        advicePage.clickContributionsOptimiserWidgetButton(),
      ])
      await contOptimserPage.waitForNavigation()
      const contributionsOptimiserPage = new ContributionsOptimiserPage(
        contOptimserPage,
      )
      await contributionsOptimiserPage.validatePageHeader()
    }
  })
})
