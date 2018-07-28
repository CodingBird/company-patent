'use strict';

const Controller = require('./base');

class IndustryController extends Controller {
  async list() {
    let params = this.getParams();
    let result = await this.service.industry.queryPage(params);
    this.ok(result);
  }

  async detail() {
    let { id } = this.getParams();
    let result = await this.service.industry.queryDetail(id);
    this.ok(result);
  }
}

module.exports = IndustryController;
