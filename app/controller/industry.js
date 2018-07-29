'use strict';

const json2csvParser = require('json2csv').Parser;
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

  async export() {
    let list = await this.service.industry.queryList();

    const fields = [
      { label: '行业名称', value: 'name' },
      { label: '单位数', value: 'company_count' },
      { label: '从业人员期末人数', value: 'employee_count' },
      { label: '工业总产值', value: 'industry_output_value' },
      { label: '出口交货值', value: 'export_value' },
      { label: '主营业务收入', value: 'main_input' },
      { label: '利润总额', value: 'total_profit' },
      { label: '主营业务税金及附加本期(千元)', value: 'main_input_tax' },
      { label: '应交增值税本期(千元)', value: 'added_tax' },
      { label: '从业人员工资总额', value: 'total_wage' },
      { label: '资产总计', value: 'total_asset' },
      { label: 'R&D人员合计', value: 'total_person_rd' },
      { label: 'R&D经费内部支出合计', value: 'total_funds_rd' },
      { label: '专利申请数', value: 'patent_count' },
      { label: '发明专利', value: 'invent_patent_count' },
      { label: '有效发明专利', value: 'valid_invent_patent_count' },
      { label: '新产品产值', value: 'new_product_value' },
      { label: '新产品销售收入', value: 'new_product_amount' },
      { label: '拥有注册商标', value: 'trademark_count' },
      { label: '平均工资', value: 'avg_wage' },
      { label: '平均R&D人员数', value: 'avg_rd_person_count' },
      { label: '平均R&D经费内部支出', value: 'avg_rd_in_funds' },
      { label: '有效发明专利/从业人员数', value: 'patent_person_rate' }
    ];
    // const json2 = new json2csvParser({ fields });
    // // excelStrings: true
    // const data = json2.parse(list);
    // console.log(data);
    // this.ctx.response.attachment('吴中区密集型产业数据.csv');
    // this.ctx.response.set('Content-Type', 'text/html;charset=utf-8');
    // this.ctx.body = data;
    this.exportCsv('吴中区密集型产业数据', fields, list);
  }
}

module.exports = IndustryController;
