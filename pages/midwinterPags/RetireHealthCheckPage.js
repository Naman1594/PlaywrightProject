const { expect } = require('@playwright/test')
require('dotenv').config()
const data = JSON.parse(JSON.stringify(require('../../data/data.json')))

class RetireHealthCheckPage {
  constructor(page) {
    this.page = page
    this.header = page.locator('.journeyHeading_title')
  }

  async validatePageHeader() {
    const headerText = await this.header.textContent()
    expect(headerText.trim()).toEqual(data.retireHealthCheckPage.header)
  }
}

exports.RetireHealthCheckPage = RetireHealthCheckPage
