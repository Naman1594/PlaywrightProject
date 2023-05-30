require('dotenv').config()
class Helper {
  //   constructor(page) {
  //     this.page = page
  //     this.header = page.locator('.clsAdviceLinksTitle h1')
  //     this.adviceTab = page.locator('li#Advice a span')
  //     this.content = page.locator('div#tabsMainContent')
  //   }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async setContext(browser) {
    await this.delay(20000)
    return await browser.newContext({
      storageState: 'state.json',
    })
  }

  async setNewContext(browser) {
    if (process.env.ENV_NAME === 'uat') {
      console.log('<<<<<<<STG>>>>>>>>>>>>>>>>')
      return browser.newContext({
        httpCredentials: {
          username: process.env.KPMG_STG_USERNAME,
          password: process.env.KPMG_STG_PASSWORD,
        },
      })
    } else {
      console.log('<<<<<<<PROD>>>>>>>>>>>>>>>>')
      await this.delay(5000)
      return browser.newContext({ storageState: 'state.json' })
    }
  }

  //In UAT, on Advice page, clicking "Super Health Check" widget require below HTTP Credentials to be set
  async setNewDevContext(browser) {
    console.log('<<<<<<<STG>>>>>>>>>>>>>>>>')
    return browser.newContext({
      httpCredentials: {
        username: process.env.KPMG_DEV_USERNAME,
        password: process.env.KPMG_DEV_PASSWORD,
      },
    })
  }
}

exports.Helper = Helper
