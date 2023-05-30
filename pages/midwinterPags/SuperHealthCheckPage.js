const { expect } = require('@playwright/test')
require('dotenv').config()
const data = JSON.parse(JSON.stringify(require('../../data/data.json')))

class SuperHealthCheckPage {
  constructor(page) {
    this.page = page
    this.welcomeLabel = page.locator('.welcome-page div h2')
  }

  async validatePageHeader() {
    const welcomeLabelText = await this.welcomeLabel.textContent()
    expect(welcomeLabelText.trim()).toEqual(
      data.superHealthCheckPage.welcomeText,
    )
  }
}

exports.SuperHealthCheckPage = SuperHealthCheckPage
