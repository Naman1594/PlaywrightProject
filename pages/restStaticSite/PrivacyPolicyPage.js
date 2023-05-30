const { expect } = require('@playwright/test')
require('dotenv').config()
const data = JSON.parse(JSON.stringify(require('../../data/data.json')))

class PrivacyPolicyPage {
  constructor(page) {
    this.page = page
    this.header = page.locator('h1.hero__title')
  }

  async validatePageHeader() {
    const headerText = await this.header.textContent()
    expect(headerText.trim()).toEqual(data.privacyPolicyPage.header)
  }
}

exports.PrivacyPolicyPage = PrivacyPolicyPage
