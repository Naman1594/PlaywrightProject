const { test } = require("@playwright/test");
require("dotenv").config();
const { POManager } = require("../pages/POManager");

test("User can login to Macquarie Portal successfully", async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginPage = await poManager.getMacquarieLoginPage();
  const profilePage = await poManager.getMacquarieDashboardPage();
  await loginPage.loginMacquariePortal();
  await profilePage.validateProfilePageDisplayed();
  // await profilePage.clickLogoutButton();
  // await loginPage.validateLoginPageMessage();
});
test("User can Logout from Macquarie portal successfully", async ({
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
