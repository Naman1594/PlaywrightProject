const { expect } = require('@playwright/test')
require('dotenv').config()
const data = JSON.parse(JSON.stringify(require('../../../../data/data.json')))
const sectionHeaders = data.memberPages.personalDetailsPage.sectionHeaders
class PersonalDetailsPage {
  constructor(page) {
    this.page = page
    this.subMenuItemLink = page.locator(
      'li#Member li.tabSubLink a[tabid="Member"] >> text=Personal details',
    )
    this.header = page.locator('#memberProfile h1')
    this.insuranceDetailsContent = page.locator('#insurancedetails')
    this.bottomTextContent = page.locator('#bottomContent')
    this.employerTable = page.locator('#employerdetails table tbody')
  }

  async validatePageHeader() {
    const headerText = await this.header.textContent()
    expect(headerText.trim()).toEqual(
      data.memberPages.personalDetailsPage.header,
    )
  }

  validateSectionLabels(labels, sectionHeaderText) {
    Object.keys(labels).forEach((key) => {
      let newKey = key
      this.page
        .locator(
          `legend:text("${sectionHeaderText}") + div.accountsummarydetailcontainer >> label.display-label[for="${newKey}"]`,
        )
        .textContent()
        .then((label) => {
          console.log('Extracted label: ', label.trim())
          expect(label.trim()).toEqual(labels[newKey])
        })
    })
  }

  verifySectionHeadersAndEditLink() {
    const headers = data.memberPages.personalDetailsPage.sectionHeaders
    const pageData = data.memberPages.personalDetailsPage
    Object.keys(headers).forEach((key, index) => {
      this.page
        .locator(`fieldset legend`)
        .nth(index)
        .textContent()
        .then((sectionHeaderText) => {
          expect(sectionHeaderText).toContain(headers[key])
        })
      if (headers[key] !== headers.employers) {
        this.page
          .locator(`fieldset legend a`)
          .nth(index)
          .getAttribute('href')
          .then((linkUrl) => {
            if (headers[key] === headers.email)
              expect(linkUrl).toEqual(pageData.EditEmailLinkUrl)
            else {
              expect(linkUrl).toEqual(pageData.EditDetailsLinkUrl)
            }
            // console.log('linkUrl for ', headers[key], ':', linkUrl)
          })
      }
      console.log('headerText: ', headers[key], 'HeaderSection: ', key)
    })
  }

  validateSectionData(values, sectionHeaderText) {
    console.log('Section: ', sectionHeaderText)
    Object.keys(values).forEach((key, index) => {
      let newKey = key
      this.page
        .locator(
          `legend:text("${sectionHeaderText}") + div.accountsummarydetailcontainer >> div.fiElem`,
        )
        .nth(index)
        .textContent()
        .then((value) => {
          console.log('Label:', key, ', Extracted Value: ', value?.trim())
          expect(value.trim()).toEqual(values[newKey])
        })
    })
  }

  async validatePersonalDetailsSection() {
    const sectionDetails =
      data.memberPages.personalDetailsPage.sections.personalDetails
    const sectionHeader =
      data.memberPages.personalDetailsPage.sectionHeaders.personalDetails
    await this.validateSectionLabels(sectionDetails.labels, sectionHeader)
    await this.validateSectionData(sectionDetails.data, sectionHeader)
  }

  async smallTest() {
    const homePhoneLabel = await this.page
      .locator(
        'legend:text("Contact details") + div.accountsummarydetailcontainer',
      )
      .locator('label.display-label')
      .nth(0)
      .textContent()
    console.log('SMALL TEST HOMEPHONE LABEL: ', homePhoneLabel)
  }

  async validateContactDetailsSection() {
    const sectionDetails =
      data.memberPages.personalDetailsPage.sections.contactDetails
    const sectionHeader =
      data.memberPages.personalDetailsPage.sectionHeaders.contactDetails
    await this.validateSectionLabels(sectionDetails.labels, sectionHeader)
    await this.validateSectionData(sectionDetails.data, sectionHeader)
  }

  async validateMembershipDetailsSection() {
    const sectionDetails =
      data.memberPages.personalDetailsPage.sections.membershipDetails
    const sectionHeader =
      data.memberPages.personalDetailsPage.sectionHeaders.membershipDetails
    await this.validateSectionLabels(sectionDetails.labels, sectionHeader)
    await this.validateSectionData(sectionDetails.data, sectionHeader)
  }

  async validatePostalAddressDetailsSection() {
    const sectionDetails =
      data.memberPages.personalDetailsPage.sections.postalAddressDetails
    const sectionHeader =
      data.memberPages.personalDetailsPage.sectionHeaders.postalAddressDetails
    await this.validateSectionLabels(sectionDetails.labels, sectionHeader)
    await this.validateSectionData(sectionDetails.data, sectionHeader)
  }

  async validateResidentialAddressDetails() {
    const sectionDetails =
      data.memberPages.personalDetailsPage.sections.residentialAddressDetails
    const sectionHeader =
      data.memberPages.personalDetailsPage.sectionHeaders
        .residentialAddressDetails
    await this.validateSectionLabels(sectionDetails.labels, sectionHeader)
    await this.validateSectionData(sectionDetails.data, sectionHeader)
  }

  async validateEmailSection() {
    const sectionDetails = data.memberPages.personalDetailsPage.sections.email
    const sectionHeader =
      data.memberPages.personalDetailsPage.sectionHeaders.email
    await this.validateSectionLabels(sectionDetails.labels, sectionHeader)
    await this.validateSectionData(sectionDetails.data, sectionHeader)
  }

  async validateEmployerTable() {
    const employersTableData =
      data.memberPages.personalDetailsPage.sections.employers.table
    //Validate table headings
    expect(
      (
        await this.employerTable.locator('tr th.employerName').textContent()
      ).trim(),
    ).toEqual(employersTableData.firstColumnHeader)
    expect(
      (
        await this.employerTable.locator('tr th.employmentDate').textContent()
      ).trim(),
    ).toEqual(employersTableData.secondColumnHeader)
    //Validate table data
    const tableRowCount = await this.employerTable.locator('tr').count()
    for (let i = 1; i < tableRowCount - 1; i++) {
      expect(
        (
          await this.employerTable.locator(tr).nth(i).locator('td.employerName')
        ).trim(),
      ).toEqual(employersTableData.employerRecords[i - 1].companyName)
      expect(
        (
          await this.employerTable
            .locator(tr)
            .nth(i)
            .locator('td.employmentDate')
        ).trim(),
      ).toEqual(employersTableData.employerRecords[i - 1].dateCommenced)
    }
  }
}

exports.PersonalDetailsPage = PersonalDetailsPage
