const { expect } = require("@playwright/test");
const { Helper } = require("../../utils/Helper");
const { PageHelper } = require("../../utils/PageHelper");
require("dotenv").config();

class MacQuarieDashboardPage {
  constructor(page) {
    this.page = page;
    this.helper = new Helper();
    this.pageHeader = page.locator("a.navbar-brand");
    this.loggedInUserNamePhoto = page.locator('img[src="assets/img/anime3.png"]');
    this.tableHeader = page.locator('h4.card-title')
    this.logoutButton = page.locator('a.dropdown-item.nav-item:text("Log out")');
  }

  async validateHeaderText() {
    const headerText = await this.pageHeader.textContent();
    expect(headerText.trim()).toEqual("Reports", { timeout: 10000 });
  }

  async validateLoggedInUsernamePhoto() {
    await expect(this.loggedInUserNamePhoto).toBeVisible(true);
  }

  async validateTableHeaderText() {
    const tableHeaderText = await this.tableHeader.textContent();
    expect(tableHeaderText.trim()).toEqual("Enrichment Errors", { timeout: 10000 });
  }

  async validateProfilePageDisplayed() {
    await this.validateLoggedInUsernamePhoto();
    await this.validateHeaderText();
    await this.validateTableHeaderText();
  }

  async clickLogoutButton() {
    await this.loggedInUserNamePhoto.dblclick();
    await this.logoutButton.click();
  }

  async logoutUser() {
    await this.clickLogoutButton();
  }
}

exports.MacQuarieDashboardPage = MacQuarieDashboardPage;
