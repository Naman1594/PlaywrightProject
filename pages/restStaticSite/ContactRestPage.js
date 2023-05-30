const { expect } = require('@playwright/test')
require('dotenv').config()
const data = JSON.parse(JSON.stringify(require('../../data/data.json')))

class ContactRestPage {
  constructor(page) {
    this.page = page
    this.header = page.locator('.content h1')
  }

  async validatePageHeader() {
    const headerText = await this.header.textContent()
    expect(headerText.trim()).toEqual(data.contactRestPage.header)
  }
}

exports.ContactRestPage = ContactRestPage
