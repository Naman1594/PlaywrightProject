import { test, expect } from '@playwright/test'

test.skip('test', async ({ browser }) => {
  const context = await browser.newContext({
    httpCredentials: {
      username: 'kpmg',
      password: 'Rest2Mar2021#',
    },
  })
  const page = await context.newPage()

  await page.goto('https://stg.web.rest.com.au/')

  await expect(
    page.locator('button[data-open="#navbar-login-menu"]'),
  ).toBeVisible()
  await page.locator('button[data-open="#navbar-login-menu"]').click()
  await page.locator('.gauth-login').click()

  /*
  await page.waitForLoadState('networkidle');

  await expect (page.locator('div#proactivechatmodal-content')).toBeVisible({timeout:30000});
  
   await page.locator('a#proactivechatClose').click();
  */

  await expect(page.locator('input[type="text"]').first()).toBeVisible()
  await page.locator('input[type="text"]').first().click()

  await page.locator('input[type="text"]').first().fill('712893303')

  await page.locator('text=Next').click()
  await page.waitForLoadState('networkidle')

  await expect(page.locator('div#proactivechatmodal-content')).toBeVisible({
    timeout: 30000,
  })

  await page.locator('a#proactivechatClose').click()

  await page.locator('input[type="password"]').fill('Test1234')

  await page.locator('div button:has-text("Log in")').first().click()

  //   await page
  //     .locator(
  //       'text=Hi there! We have agents available if you need any assistance Start Live Chat No >> img',
  //     )
  //     .click()
  //   await expect(page).toHaveURL('https://stg.web.rest.com.au/super/login')

  // Click button:has-text("Go to Member Access")
  await page.locator('button:has-text("Go to Member Access")').click()
  //   await expect(page).toHaveURL(
  //     'https://membercentre-uat-rest.orientsys.com.au/signin?redirectUri=https%3a%2f%2fmembercentre-uat-rest.orientsys.com.au%2f%3fPlanCode%3dRS',
  //   )
  //   await page.goto(
  //     'https://membercentre-uat-rest.orientsys.com.au/?PlanCode=RS&actionUrl=%2F%3FPlanCode%3DRS',
  //   )
  const headerText = await page.locator('#dashboard h1').first().textContent()
  expect(headerText.trim()).toEqual('Account summary')
  await page.waitForLoadState('domcontentloaded')
  await page.locator('span:has-text("Advice")').click()
  await expect(page).toHaveURL(
    'https://membercentre-uat-rest.orientsys.com.au/?PlanCode=RS&actionUrl=%2F%3FPlanCode%3DRS#/Advice/Advice/Index',
  )

  // Click text=Retirement Health Check Check how much income you could have each year in retire >> span
  const [page1] = await Promise.all([
    // page.waitForEvent('popup'),
    context.waitForEvent('page'),
    page.locator('.oc-button.widgetbutton> span:nth-child(1)').nth(1).click(),
    // page.locator('text=Retirement Health Check Check how much income you could have each year in retire >> span').click()
  ])
  // const [page1] = await page
  //   .locator('.oc-button.widgetbutton> span:nth-child(1)')
  //   .nth(1)
  //   .click()
  // page1.pause()
  await page1.waitForNavigation()
  const retirementHealthCheckPageHeaderText = await page1
    .locator('.journeyHeading_title')
    .textContent()
  expect(retirementHealthCheckPageHeaderText.trim()).toEqual(
    'Welcome to Retirement Health Check',
  )
})
