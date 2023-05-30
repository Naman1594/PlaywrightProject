const { expect } = require('@playwright/test')
require('dotenv').config()
const data = JSON.parse(JSON.stringify(require('../../data/data.json')))
const accountSummaryPage = data.memberPages.accountSummaryPage
class TradesBoard {
  constructor(page) {
    this.page = page
    this.tableHeader = page.locator('h4.card-title')
    this.dropdownMenu = page.locator('div.dropdown-menu.show')
    this.tradesLabel = page.locator('button.btn btn-secondary.dropdown-toggle:text(" Trades ")')
    this.enrichmentTab = page.locator('a.dropdown-item ng-star-inserted:text(" Enrichment Errors  ")')
    this.activityTab = page.locator('a.dropdown-item ng-star-inserted:text(" Activity Errors  ")')
    this.othersTab = page.locator('a.dropdown-item ng-star-inserted:text(" Other Errors  ")')
  }

  async validateTradesLabel() {
    const labelText = await this.tradesLabel.textContent()
    expect(labelText.trim()).toEqual(data.tradesBoard.label)
  }

  async validateEnrichmentErrorsTradeDashoard() {
    await this.tradesLabel.click()
    expect(this.dropdownMenu).toBeVisible(true)
    await this.enrichmentTab.click()
    await this.validatetEnrichmentHeaderText()
  }

  async validateActivityErrorsTradeDashboard() {
    await this.tradesLabel.click()
    expect(this.dropdownMenu).toBeVisible(true)
    await this.activityTab.click()
    await this.validatetActivityHeaderText()
  }

  async validateOtherErrorsTradeDashboard() {
    await this.tradesLabel.click()
    expect(this.dropdownMenu).toBeVisible(true)
    await this.othersTab.click()
    await this.validatetOthersHeaderText()
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
}

exports.TradesBoard = TradesBoard
