'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class CompanyService extends Service {
  async queryPage() {
    let list = await this.app.knex('t_company_base_info').select();
    return list;
  }

  async queryDetail(companyCode) {
    let baseInfo = await this.app
      .knex('t_company_base_info')
      .where({ code: companyCode })
      .first();

    let productList = await this.app
      .knex('t_company_product')
      .where({ company_code: companyCode })
      .select();

    let yearOperateStateList = await this.app
      .knex('t_company_year_operation_state')
      .where({ company_code: companyCode })
      .select()
      .orderBy('year');

    let yearPatentList = await this.app
      .knex('t_company_year_patent')
      .where({ company_code: companyCode })
      .select()
      .orderBy('year');

    let patentSate = await this.app
      .knex('t_company_intellectual_property_state')
      .where({ company_code: companyCode })
      .first();

    return {
      baseInfo,
      productList,
      yearOperateStateList,
      yearPatentList,
      patentSate
    };
  }
}

module.exports = CompanyService;
