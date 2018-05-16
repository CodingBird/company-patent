'use strict';

const Controller = require('./base');

class CompanyController extends Controller {
  async list() {
    let list = await this.service.company.queryPage();
    this.ok(list);
  }

  async detail() {
    let { companyCode } = this.getParams();
    let detail = await this.service.company.queryDetail(companyCode);
    this.ok(detail);
  }
}

module.exports = CompanyController;
