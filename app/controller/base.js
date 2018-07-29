'use strict';
const { Controller } = require('egg');

class BaseController extends Controller {
  constructor(ctx) {
    super(ctx);
    Object.assign(this.ctx.request.body || {}, this.ctx.query || {});
  }

  ok(data) {
    if (data === undefined) {
      // data = 'SUCCESS';
    }
    this.ctx.body = { code: 0, data };
  }

  fail(msg) {
    if (msg === undefined) {
      msg = 'FAIL';
    }
    this.ctx.body = { code: -1, error: msg };
  }

  // 统一参数获取, 合并post和get参数,post优先
  getParams() {
    const params = this.ctx.request.body;
    return params;
  }

  getPageParams() {
    const pageNo = parseInt(this.ctx.query.pageNo || 1);
    const pageSize = parseInt(this.ctx.query.pageSize || 10);
    return {
      pageNo,
      pageSize
    };
  }

  /**
   * 抛出应用异常
   * @param {*} msg
   */
  throwError(msg) {
    throw new AppError(msg);
  }

  checkNull(...paras) {
    return paras.some((p) => !p || p === 'null' || p === 'undefined');
  }

  exportCsv(fileName, fields, list) {
    const json2csvParser = require('json2csv').Parser;

    const json2 = new json2csvParser({ fields });
    const data = json2.parse(list);
    this.ctx.response.attachment(`${fileName}.csv`);
    this.ctx.response.set('Content-Type', 'text/html;charset=utf-8');
    this.ctx.body = data;
  }
}
module.exports = BaseController;
