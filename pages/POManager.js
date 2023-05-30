const { LoginPage } = require('./restStaticSite/LoginPage')
const { MacQuarieLoginPage } = require ('./macquarieqa/MacQuarieLoginPage')
const { MacQuarieDashboardPage } = require ('./macquarieqa/MacQuarieDashboardPage')
const { EnquiriesBoard } = require('../pages/memberPortal/EnquiriesBoard')
const { ImportsBoard } = require('../pages/memberPortal/ImportsBoard')
const { ReconcileBoard } = require('../pages/memberPortal/ReconcileBoard')
const { ReportsBoard } = require('../pages/memberPortal/ReportsBoard')
const { StaticBoard } = require('../pages/memberPortal/StaticBoard')
const { TradesBoard } = require('../pages/memberPortal/TradesBoard')
// const { PersonalDetailsPage } = require('../pages/memberPortal/subMenu/member/PersonalDetailsPage') 

class POManager {
  constructor(page) {
    this.page = page
    this.loginPage = new LoginPage(this.page)
    this.macQuarieLoginPage = new MacQuarieLoginPage(this.page)
    this.macQuarieDashboardPage = new MacQuarieDashboardPage(this.page)

    this.enquiriesBoard = new EnquiriesBoard(this.page)
    this.importsBoard = new ImportsBoard(this.page)
    this.reconcileBoard = new ReconcileBoard(this.page)
    this.reportsBoard = new ReportsBoard(this.page)
    this.staticBoard = new StaticBoard(this.page)
    this.tradesBoard = new TradesBoard(this.page)
//  this.personalDetailsPage = new PersonalDetailsPage(this.page)
  }

  getLoginPage() {
    return this.loginPage
  }
  getMacquarieLoginPage() {
    return this.macQuarieLoginPage
  }
  getMacquarieDashboardPage() {
    return this.macQuarieDashboardPage
  }
  getEnquiryBoard() {
    return this.enquiriesBoard
  }
  getImportBoard() {
    return this.importsBoard
  }
  getReconcileBoard() {
    return this.reconcileBoard
  }
  getReportsBoard() {
    return this.reportsBoard
  }
  getStaticBoard() {
    return this.staticBoard
  }
  getTradesBoard() {
    return this.tradesBoard
  }
/* getPersonalDetailsPage() {
    return this.personalDetailsPage
  } */
}

exports.POManager = POManager
