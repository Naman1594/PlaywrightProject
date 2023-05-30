const { test } = require("@playwright/test");
require("dotenv").config();
const { POManager } = require("../pages/POManager");

test.only("User can launch Reports board successfully", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginPage = await poManager.getMacquarieLoginPage();
  const profilePage = await poManager.getMacquarieDashboardPage();
  const reportPage = await poManager.getReportsBoard();
  await loginPage.loginMacquariePortal();
  await profilePage.validateProfilePageDisplayed();
  await reportPage.validateEnrichmentErrorsReportDashboard();
  await reportPage.validateAllDropDowns();
  await reportPage.validateActivityErrorsReportDashboard();
  await reportPage.validateLimitApplied();
  // await profilePage.clickLogoutButton();
  // await loginPage.validateLoginPageMessage();
});
test.skip("User can Logout from Macquarie portal successfully", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginPage = await poManager.getMacquarieLoginPage();
  const profilePage = await poManager.getMacquarieDashboardPage();
  await loginPage.loginMacquariePortal();
  await profilePage.validateProfilePageDisplayed();
  await profilePage.clickLogoutButton();
  await loginPage.validateLoginPageHeader();
});
