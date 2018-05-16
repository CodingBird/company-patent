'use strict';

const Controller = require('./base');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
    let list = await this.service.company.queryPage();
    this.ok(list);
  }
}

module.exports = HomeController;
