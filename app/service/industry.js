'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class IndustryService extends Service {
  async queryPage(params) {
    const { pageNo = 1, pageSize = 10, industryName, idStr } = params;
    const offset = (pageNo - 1) * pageSize;
    const where = (qb) => {
      if (industryName) {
        qb.where('name', 'like', `%${industryName}%`);
      }
      if (idStr) {
        const idArr = idStr.split('#');
        qb.whereIn('id', idArr);
      }
    };

    const list = await this.app
      .knex('t_industry')
      .where(where)
      .offset(offset)
      .limit(pageSize)
      .select();
    const total = await this.app
      .knex('t_industry')
      .where(where)
      .count('id as total')
      .first();
    return {
      list,
      pagination: {
        current: parseInt(pageNo || 0),
        pageSize: parseInt(pageSize || 10),
        ...total
      }
    };
  }

  async queryList() {
    return this.app.knex('t_industry').select();
  }

  async queryDetail(id) {
    return this.app
      .knex('t_industry')
      .where({ id })
      .first();
  }
}

module.exports = IndustryService;
