'use strict';

const Service = require('egg').Service;
const moment = require('moment');

class CompanyService extends Service {
  /**
   * 查询列表
   * @param {*} params
   */
  async queryPage(params) {
    let {
      pageNo,
      pageSize,
      name,
      productName,
      copyright_registration_count_max,
      copyright_registration_count_min,

      invention_patent_apply_count_max,
      invention_patent_apply_count_min,

      invention_patent_authorize_count_max,
      invention_patent_authorize_count_min,

      invention_patent_owning_count_max,
      invention_patent_owning_count_min,

      practical_new_apply_count_max,
      practical_new_apply_count_min,

      practical_new_authorize_count_max,
      practical_new_authorize_count_min,

      practical_new_owning_count_max,
      practical_new_owning_count_min,

      appearance_design_apply_count_max,
      appearance_design_apply_count_min,

      appearance_design_authorize_count_max,
      appearance_design_authorize_count_min,

      appearance_design_owning_count_max,
      appearance_design_owning_count_min,

      pct_patent_apply_count_max,
      pct_patent_apply_count_min,

      registed_trademark_count_max,
      registed_trademark_count_min
    } = params;
    let codeArr1;
    if (productName) {
      codeArr1 = await this.findCodeByProductName(productName);
    }

    let codeArr2;
    if (copyright_registration_count_max || copyright_registration_count_min) {
      codeArr2 = await this.findCodeByCopyrightRegistrationCount(
        copyright_registration_count_min,
        copyright_registration_count_max
      );
    }

    let codeArr3;
    if (invention_patent_apply_count_max || invention_patent_apply_count_min) {
      codeArr3 = await this.findCodeByPatentInventionPatentApplyCount(params);
    }

    let codeArr4;
    if (invention_patent_authorize_count_max || invention_patent_authorize_count_min) {
      codeArr4 = await this.findCodeByInventionPatentAuthorizeCount(params);
    }

    let codeArr5;
    if (invention_patent_owning_count_max || invention_patent_owning_count_min) {
      codeArr5 = await this.findCodeByInventionPatentOwningCount(params);
    }

    let codeArr6;
    if (practical_new_apply_count_max || practical_new_apply_count_min) {
      codeArr6 = await this.findCodeByPracticalNewApplyCount(params);
    }

    let codeArr7;
    if (practical_new_authorize_count_max || practical_new_apply_count_min) {
      codeArr7 = await this.findCodeByPracticalNewAuthorizeCount(params);
    }

    let codeArr13;
    if (practical_new_owning_count_max || practical_new_owning_count_min) {
      codeArr13 = await this.findCodeByPracticalNewOwningCount(params);
    }

    let codeArr8;
    if (appearance_design_apply_count_max || appearance_design_apply_count_min) {
      codeArr8 = await this.findCodeByAppearanceDesignApplyCount(params);
    }

    let codeArr9;
    if (appearance_design_authorize_count_max || appearance_design_authorize_count_min) {
      codeArr9 = await this.findCodeByAppearanceDesignAuthorizeCount(params);
    }

    let codeArr10;
    if (appearance_design_owning_count_max || appearance_design_owning_count_min) {
      codeArr10 = await this.findCodeByAppearanceDesignOwningCount(params);
    }

    let codeArr11;
    if (pct_patent_apply_count_max || pct_patent_apply_count_min) {
      codeArr11 = await this.findCodeByPctPatentApplyCount(params);
    }

    let codeArr12;
    if (registed_trademark_count_max || registed_trademark_count_min) {
      codeArr12 = await this.findCodeByRegistedTrademarkCount(params);
    }

    let where = (qb) => {
      if (name) {
        qb.where('name', 'like', `%${name}%`);
      }
      if (codeArr1) {
        qb.whereIn('code', codeArr1);
      }
      if (codeArr2) {
        qb.whereIn('code', codeArr2);
      }
      if (codeArr3) {
        qb.whereIn('code', codeArr3);
      }
      if (codeArr4) {
        qb.whereIn('code', codeArr4);
      }
      if (codeArr5) {
        qb.whereIn('code', codeArr5);
      }
      if (codeArr6) {
        qb.whereIn('code', codeArr6);
      }
      if (codeArr7) {
        qb.whereIn('code', codeArr7);
      }
      if (codeArr8) {
        qb.whereIn('code', codeArr8);
      }
      if (codeArr9) {
        qb.whereIn('code', codeArr9);
      }
      if (codeArr10) {
        qb.whereIn('code', codeArr10);
      }
      if (codeArr11) {
        qb.whereIn('code', codeArr11);
      }
      if (codeArr12) {
        qb.whereIn('code', codeArr12);
      }
      if (codeArr13) {
        qb.whereIn('code', codeArr13);
      }
    };
    let list = await this.app
      .knex({ cb: 't_company_base_info' })
      .leftJoin({ cp: 't_company_year_patent' }, function() {
        this.on('cb.code', '=', 'cp.company_code').andOn('cp.year', '=', 2016);
      })
      .leftJoin({ ps: 't_company_intellectual_property_state' }, 'cb.code', 'ps.company_code')
      .where(where)
      .select(
        'cb.*',
        'cp.invention_patent_owning_count',
        'cp.registed_trademark_count',
        'ps.copyright_registration_count'
      );

    let total = await this.app
      .knex('t_company_base_info')
      .count('id as total')
      .where(where)
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

  async findCodeByProductName(productName) {
    return this.app
      .knex('t_company_product')
      .where('product_name', 'like', `%${productName}%`)
      .select('company_code')
      .then((result) => {
        return result.map((item) => item.company_code);
      });
  }

  async findCodeByPatentInventionPatentApplyCount(params) {
    let {
      invention_patent_apply_count_max,
      invention_patent_apply_count_min,
      invention_patent_apply_count_year
    } = params;
    let where = (qb) => {
      if (invention_patent_apply_count_max) {
        qb.where('invention_patent_apply_count', '<=', invention_patent_apply_count_max);
      }
      if (invention_patent_apply_count_min) {
        qb.where('invention_patent_apply_count', '>=', invention_patent_apply_count_min);
      }
      if (invention_patent_apply_count_year) {
        qb.where('year', '=', invention_patent_apply_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async findCodeByInventionPatentAuthorizeCount(params) {
    let {
      invention_patent_authorize_count_max,
      invention_patent_authorize_count_min,
      invention_patent_authorize_count_year
    } = params;
    let where = (qb) => {
      if (invention_patent_authorize_count_max) {
        qb.where('invention_patent_apply_count', '<=', invention_patent_authorize_count_max);
      }
      if (invention_patent_authorize_count_min) {
        qb.where('invention_patent_apply_count', '>=', invention_patent_authorize_count_min);
      }
      if (invention_patent_authorize_count_year) {
        qb.where('year', '=', invention_patent_authorize_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async findCodeByInventionPatentOwningCount(params) {
    let {
      invention_patent_owning_count_max,
      invention_patent_owning_count_min,
      invention_patent_owning_count_year
    } = params;
    let where = (qb) => {
      if (invention_patent_owning_count_max) {
        qb.where('invention_patent_owning_count', '<=', invention_patent_owning_count_max);
      }
      if (invention_patent_owning_count_min) {
        qb.where('invention_patent_owning_count', '>=', invention_patent_owning_count_min);
      }
      if (invention_patent_owning_count_year) {
        qb.where('year', '=', invention_patent_owning_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async findCodeByPracticalNewApplyCount(params) {
    let { practical_new_apply_count_max, practical_new_apply_count_min, practical_new_apply_count_year } = params;
    let where = (qb) => {
      if (practical_new_apply_count_max) {
        qb.where('practical_new_apply_count', '<=', practical_new_apply_count_max);
      }
      if (practical_new_apply_count_min) {
        qb.where('practical_new_apply_count', '>=', practical_new_apply_count_min);
      }
      if (practical_new_apply_count_year) {
        qb.where('year', '=', practical_new_apply_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async findCodeByPracticalNewAuthorizeCount(params) {
    let {
      practical_new_authorize_count_max,
      practical_new_authorize_count_min,
      practical_new_authorize_count_year
    } = params;
    let where = (qb) => {
      if (practical_new_authorize_count_max) {
        qb.where('practical_new_authorize_count', '<=', practical_new_authorize_count_max);
      }
      if (practical_new_authorize_count_min) {
        qb.where('practical_new_authorize_count', '>=', practical_new_authorize_count_min);
      }
      if (practical_new_authorize_count_year) {
        qb.where('year', '=', practical_new_authorize_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async findCodeByPracticalNewOwningCount(params) {
    let { practical_new_owning_count_max, practical_new_owning_count_min, practical_new_owning_count_year } = params;
    let where = (qb) => {
      if (practical_new_owning_count_max) {
        qb.where('practical_new_owning_count', '<=', practical_new_owning_count_max);
      }
      if (practical_new_owning_count_min) {
        qb.where('practical_new_owning_count', '>=', practical_new_owning_count_min);
      }
      if (practical_new_owning_count_year) {
        qb.where('year', '=', practical_new_owning_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async findCodeByAppearanceDesignApplyCount(params) {
    let {
      appearance_design_apply_count_max,
      appearance_design_apply_count_min,
      appearance_design_apply_count_year
    } = params;
    let where = (qb) => {
      if (appearance_design_apply_count_max) {
        qb.where('appearance_design_apply_count', '<=', appearance_design_apply_count_max);
      }
      if (appearance_design_apply_count_min) {
        qb.where('appearance_design_apply_count', '>=', appearance_design_apply_count_min);
      }
      if (appearance_design_apply_count_year) {
        qb.where('year', '=', appearance_design_apply_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async findCodeByAppearanceDesignAuthorizeCount(params) {
    let {
      appearance_design_authorize_count_max,
      appearance_design_authorize_count_min,
      appearance_design_authorize_count_year
    } = params;
    let where = (qb) => {
      if (appearance_design_authorize_count_max) {
        qb.where('appearance_design_authorize_count', '<=', appearance_design_authorize_count_max);
      }
      if (appearance_design_authorize_count_min) {
        qb.where('appearance_design_authorize_count', '>=', appearance_design_authorize_count_min);
      }
      if (appearance_design_authorize_count_year) {
        qb.where('year', '=', appearance_design_authorize_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async findCodeByAppearanceDesignOwningCount(params) {
    let {
      appearance_design_owning_count_max,
      appearance_design_owning_count_min,
      appearance_design_owning_count_year
    } = params;
    let where = (qb) => {
      if (appearance_design_owning_count_max) {
        qb.where('appearance_design_owning_count', '<=', appearance_design_owning_count_max);
      }
      if (appearance_design_owning_count_min) {
        qb.where('appearance_design_owning_count', '>=', appearance_design_owning_count_min);
      }
      if (appearance_design_owning_count_year) {
        qb.where('year', '=', appearance_design_owning_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async findCodeByPctPatentApplyCount(params) {
    let { pct_patent_apply_count_max, pct_patent_apply_count_min, pct_patent_apply_count_year } = params;
    let where = (qb) => {
      if (pct_patent_apply_count_max) {
        qb.where('pct_patent_apply_count', '<=', pct_patent_apply_count_max);
      }
      if (pct_patent_apply_count_min) {
        qb.where('pct_patent_apply_count', '>=', pct_patent_apply_count_min);
      }
      if (pct_patent_apply_count_year) {
        qb.where('year', '=', pct_patent_apply_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async findCodeByRegistedTrademarkCount(params) {
    let { registed_trademark_count_max, registed_trademark_count_min, registed_trademark_count_year } = params;
    let where = (qb) => {
      if (registed_trademark_count_max) {
        qb.where('registed_trademark_count', '<=', registed_trademark_count_max);
      }
      if (registed_trademark_count_min) {
        qb.where('registed_trademark_count', '>=', registed_trademark_count_min);
      }
      if (registed_trademark_count_year) {
        qb.where('year', '=', registed_trademark_count_year);
      }
    };

    return this.queryCodeFromCompanyYearPatent(where);
  }

  async queryCodeFromCompanyYearPatent(where) {
    return this.app
      .knex('t_company_year_patent')
      .where(where)
      .select('company_code')
      .then((result) => {
        return result.map((item) => item.company_code);
      });
  }

  async findCodeByCopyrightRegistrationCount(min, max) {
    let where = (qb) => {
      if (min) {
        qb.where('copyright_registration_count', '>=', min);
      }
      if (max) {
        qb.where('copyright_registration_count', '<=', max);
      }
    };
    return this.app
      .knex('t_company_intellectual_property_state')
      .where(where)
      .select('company_code')
      .then((result) => {
        return result.map((item) => item.company_code);
      });
  }

  /**
   * 查询详情
   * @param {*} companyCode
   */
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
