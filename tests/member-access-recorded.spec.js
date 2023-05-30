import { test, expect } from '@playwright/test'
const { Helper } = require('../utils/Helper')
const { POManager } = require('../pages/POManager')

test.skip('test', async ({ page }) => {
  const helper = new Helper()
  const poManager = new POManager(page)
  const accountSummaryPage = poManager.getAccountSummaryPage()
  // Go to https://rest.com.au/
  await page.goto('https://rest.com.au/')
  // Click button:has-text("Login")
  await page.locator('button:has-text("Login")').click()
  // Click text=Member login
  await page.locator('text=Member login').click()
  await expect(page).toHaveURL('https://rest.com.au/super/login?modal=login')
  // Click input[type="text"]
  await page.locator('input[type="text"]').click()
  // Fill input[type="text"]
  await page.locator('input[type="text"]').fill('er.aloksharma1@gmail.com')
  // Click text=Next
  await page.locator('text=Next').click()
  // Fill input[type="password"]
  await page.locator('input[type="password"]').fill('Testing@12345')
  // Click text=Password Log in >> button
  await page.locator('text=Password Log in >> button').click()
  await expect(page).toHaveURL('https://rest.com.au/super/login')
  // Click button:has-text("Go to Member Access")
  await page.locator('button:has-text("Go to Member Access")').click()
  await expect(page).toHaveURL(
    'https://member.aas.com.au/signin?redirectUri=https%3a%2f%2fmember.aas.com.au%2f%3fPlanCode%3dRS',
  )
  //   await page.goto(
  //     'https://member.aas.com.au/?PlanCode=RS&actionUrl=%2F%3FPlanCode%3DRS',
  //   )
  // Click span:has-text("Advice")
  await accountSummaryPage.validatePageHeader()
  const benefitQuoteItem = page.locator(
    'div#bottomContent p .btnLinkToSubmenuPage[container="tabsMainContent"]',
  )
  //https://member.aas.com.au/#/YourAccount/BenefitQuote/Index?PlanCode=RS
  //https://member.aas.com.au/#/YourAccount/BenefitQuote/Index?PlanCode=RS
  const benefitQuoteLink = await benefitQuoteItem.getAttribute('href')
  console.log('benefitQuote Link: ', benefitQuoteLink)
  //div#bottomContent p .btnLinkToSubmenuPage[container="tabsMainContent"]
  await page.locator('span:has-text("Advice")').click()
  const advicePageHeaderText = (
    await page.locator('div.clsAdviceLinksTitle h1').textContent()
  ).trim()
  expect(advicePageHeaderText).toEqual('Getting started with Digital Advice')
  await helper.delay(3000)
  await expect(
    await page.locator('div.container.AdviceLinks').screenshot(),
  ).toMatchSnapshot('advice-page-full-content.png')
  const commonFeaturesPage = await poManager.getCommonFeaturesPage()
  await commonFeaturesPage.validateMemberDetails()
  await helper.delay(3000)
  await expect(
    await page.locator('#alertAccordion').screenshot(),
  ).toMatchSnapshot('no-beneficiary-alert.png')

  const firstLinkItem = page.locator('a.oc-button.widgetbutton').first()
  const firstLink = await firstLinkItem.getAttribute('href')
  // const hasText = page.locator('has-text("Start Now")').first()
  // console.log('Using has-text:', await hasText.getAttribute('href'))
  console.log('First Link: ', firstLink)
  console.log('Target: ', await firstLinkItem.getAttribute('target'))
  console.log('GEtting inner text: ', await firstLinkItem.allInnerTexts())
  console.log(
    'GEtting all text content: ',
    await firstLinkItem.allTextContents(),
  )
  console.log('GEtting inner html: ', await firstLinkItem.innerHTML())
  // a.oc-button.widgetbutton
})
