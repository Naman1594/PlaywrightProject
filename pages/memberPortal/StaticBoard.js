const { expect } = require('@playwright/test')
require('dotenv').config()
const data = JSON.parse(JSON.stringify(require('../../data/data.json')))

class StaticBoard {
  constructor(page) {
    this.page = page
    this.tableHeader = page.locator('h4.card-title')
    this.dropdownMenu = page.locator('div.dropdown-menu.show')
    this.staticLabel = page.locator('button.btn btn-secondary.dropdown-toggle:text(" Static ")')
    this.enrichmentTab = page.locator('a.dropdown-item ng-star-inserted:text(" Enrichment Errors  ")')
    this.activityTab = page.locator('a.dropdown-item ng-star-inserted:text(" Activity Errors  ")')
    this.othersTab = page.locator('a.dropdown-item ng-star-inserted:text(" Other Errors  ")')
  }

  async validateStaticLabel() {
    const labelText = await this.labelDisplay.textContent()
    expect(labelText.trim()).toEqual(data.staticBoard.label)
  }

  async validateEnrichmentErrorsStaticDashboard() {
    await this.reportLabel.click()
    expect(this.dropdownMenu).toBeVisible(true)
    await this.enrichmentTab.click()
    await this.validatetEnrichmentHeaderText()
  }

  async validateActivityErrorsStaticDashboard() {
    await this.reportLabel.click()
    expect(this.dropdownMenu).toBeVisible(true)
    await this.activityTab.click()
    await this.validatetActivityHeaderText()
  }

  async validateOtherErrorsStaticDashboard() {
    await this.reportLabel.click()
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

exports.StaticBoard = StaticBoard
