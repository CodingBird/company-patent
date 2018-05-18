'use strict';

const Controller = require('./base');

class CompanyController extends Controller {
  async list() {
    let param = this.getParams();
    let result = await this.service.company.queryPage(param);
    this.ok(result);
  }

  async detail() {
    let { companyCode } = this.getParams();
    let detail = await this.service.company.queryDetail(companyCode);
    this.ok(detail);
  }
}

module.exports = CompanyController;
