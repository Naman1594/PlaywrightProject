const { expect } = require('@playwright/test')
const { Helper } = require("../../utils/Helper");
require('dotenv').config()
const data = JSON.parse(JSON.stringify(require('../../data/data.json')))

class ReportsBoard {
  constructor(page) {
    this.page = page
    this.helper = new Helper();
    this.tableHeader = page.locator('h4.card-title')
    this.dropdownMenu = page.locator('div.dropdown-menu.show')
    this.statusDropdown = page.locator('#inputGroupSelect01')
    // table elements
    this.tableView = page.locator('table.tablesorter')
    this.tableHeaders = this.tableView.locator('thead')
    this.tableRows = this.tableView.locator('tbody tr')
    this.pagination = page.locator('ul.pagination')
    this.tableLimit = page.locator('input[type=number]')
    this.tableLimitCheck = page.locator('input[type=checkbox]')
    //report page tabs elements
    this.reportLabel = page.locator('.sidebar li').nth(1)
    this.enrichmentTab = this.reportLabel.locator('a').nth(0)
    this.activityTab = this.reportLabel.locator('a').nth(1)
    this.othersTab = this.reportLabel.locator('a').nth(2)
  }

  async validateReportsLabel() {
    const labelText = await this.reportLabel.textContent()
    expect(labelText.trim()).toEqual(data.reportsBoard.label)
  }

  async validateDropdownStatusAll() {
    await this.statusDropdown.selectOption({value : 'All'})
    await this.statusAsAll()
  }

  async validateDropdownStatusD() {
    await this.statusDropdown.selectOption({ value : 'D' })
    await this.statusAsD();
  }

  async validateDropdownStatusE() {
    await this.statusDropdown.selectOption({ value : 'E' })
    await this.statusAsE();
  }

  async validateAllDropDowns() {
    await this.validateDropdownStatusAll()
    await this.validateDropdownStatusD()
    await this.validateDropdownStatusE()
  }

  async validateEnrichmentErrorsReportDashboard() {
    await this.reportLabel.click()
    expect(this.dropdownMenu).toBeVisible(true)
    await this.enrichmentTab.click()
    await this.validatetEnrichmentHeaderText()
    expect(this.statusDropdown).toBeVisible(true)
  }

  async validateActivityErrorsReportDashboard() {
    await this.reportLabel.click()
    expect(this.dropdownMenu).toBeVisible(true)
    await this.activityTab.click()
    await this.sleep(5000).then(() => {
      this.validatetActivityHeaderText()
  });
  }

  async validateOtherErrorsReportDashboard() {
    await this.reportLabel.click()
    expect(this.dropdownMenu).toBeVisible(true)
    await this.othersTab.click()
    await this.validatetOthersHeaderText()
  }

  async sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async validatetEnrichmentHeaderText() {
    const tableHeaderText = await this.tableHeader.textContent();
    expect(tableHeaderText.trim()).toEqual(data.enrichmentPageHeader.header , { timeout: 10000 });
  }

  async validatetActivityHeaderText() {
    const tableHeaderText = await this.tableHeader.textContent();
    expect(tableHeaderText.trim()).toEqual(data.activityPageHeader.header , { timeout: 10000 });
  }

  async validatetOthersHeaderText() {
    const tableHeaderText = await this.tableHeader.textContent();
    expect(tableHeaderText.trim()).toEqual(data.otherErrors.header , { timeout: 10000 });
  }

  async validateLimitApplied() {
    await this.tableLimit.fill('4')
    await this.tableLimitCheck.check();
    expect(this.tableRows).toHaveCount(4)
  }

  async statusAsAll() {
    const statusAll = this.tableRows.filter({
      has: this.page.locator('td'),
      hasText: / D | E /
    });
    await expect(statusAll).toHaveCount(10)
  }

  async statusAsD() {
    const statusD = this.tableRows.filter({
      has: this.page.locator('td'),
      hasText: / D /
    });
    await expect(statusD).toHaveCount(10)
  }

  async statusAsE() {
    const statusE = this.tableRows.filter({
      has: this.page.locator('td'),
      hasText: / E /
    });
    await expect(statusE).toHaveCount(10)
  }
}

exports.ReportsBoard = ReportsBoard
