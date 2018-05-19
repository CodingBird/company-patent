'use strict';

const Controller = require('./base');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
    console.log('1111');
    await this.ctx.redirect('/public/index.html');
  }
}

module.exports = HomeController;
