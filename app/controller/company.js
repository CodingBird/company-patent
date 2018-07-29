'use strict';

const Controller = require('./base');

class CompanyController extends Controller {
  async list() {
    let param = this.getParams();
    let result = await this.service.company.queryPage(param);
    this.ok(result);
  }

  async queryYearPatent() {
    let { companyCode } = this.getParams();
    let result = await this.service.company.queryYearPatent(companyCode);
    this.ok(result);
  }

  async detail() {
    let { companyCode } = this.getParams();
    let detail = await this.service.company.queryDetail(companyCode);
    this.ok(detail);
  }

  async exportBaseInfo() {
    const list = await this.service.company.queryAllBaseInfo();
    const fields = [
      { label: '公司编号', value: 'code' },
      { label: '公司名称', value: 'name' },
      { label: '注册资本', value: 'registered_capital' },
      { label: '创办年份', value: 'create_year' },
      { label: '联系电话', value: 'phone_number' },
      { label: '资产总额', value: 'total_assets' },
      { label: '固定资产总额', value: 'total_capital_asserts' },
      { label: '负债总额', value: 'total_indebtedness' },
      { label: '控股子公司数量', value: 'subsidiary_company_count' },
      { label: '职工人数', value: 'total_staff_count' },
      { label: '硕士员工数量', value: 'master_staff_count' },
      { label: '博士员工数量', value: 'doctor_staff_count' },
      { label: '科研人员数量', value: 'researcher_count' },
      { label: '单位性质', value: 'type' },

      { label: '专利自行实施数量（件）', value: 'patent_execute_count' },
      { label: '专利许可数量（件）', value: 'patent_license_count' },
      { label: '专利转让数量（件）', value: 'patent_transfer_count' },
      { label: '版权自行实施数量（件）', value: 'copyright_execute_count' },
      { label: '版权许可数量（件）', value: 'copyright_license_count' },
      { label: '著作权登记(件)', value: 'copyright_registration_count' },
      { label: '计算机软件著作权登记（件）', value: 'software_copyright_registration_count' },
      { label: '集成电路布图设计登记（件）', value: 'ic_diagram_registration_count' },
      { label: '已明确界定为本单位商业（技术）秘密加以保护的项数', value: 'secret_registration_count' },
      { label: '发明专利维持年限5年以上', value: 'five_year_patent_count' },
      { label: '实用新型维持年限3年以上', value: 'practical_new_three_year_count' },
      { label: '维持年限为10年以上的发明专利', value: 'ten_year_patent_count' },
      { label: '形成国家或行业标准数量', value: 'standard_patent_count' },
      { label: '自主创造', value: 'from_independent_create' },
      { label: '被许可', value: 'from_licensed' },
      { label: '被转让', value: 'from_transfer' }
    ];
    this.exportCsv('吴中区公司信息', fields, list);
  }

  async exportProducts() {
    const list = await this.service.company.queryAllProducts();
    const fields = [
      { label: '公司编号', value: 'company_code' },
      { label: '公司名称', value: 'name' },
      { label: '产品名称', value: 'product_name' },
      { label: '相应发明专利数量', value: 'patent_count' },
      { label: '相应使用新型专利数量', value: 'practical_patent_count' }
    ];
    this.exportCsv('产品信息', fields, list);
  }

  async exportYearBus() {
    const list = await this.service.company.queryAllYearBus();
    const fields = [
      { label: '公司编号', value: 'company_code' },
      { label: '公司名称', value: 'name' },
      { label: '年份', value: 'year' },
      { label: '销售总收入（万元）', value: 'total_sale' },
      { label: '新产品销售收入（万元）', value: 'new_product_sale' },
      { label: '专利产品销售收入（万元）', value: 'patent_product_sale' },
      { label: '出口销售总额（万元）', value: 'export_sale' },
      { label: '利税总额（万元）', value: 'total_profit' },
      { label: '税后利润（万元）', value: 'after_tax_profit' },
      { label: '员工数（人）', value: 'staff_count' },
      { label: 'R&D经费投入（万元）', value: 'r_d_cost' }
    ];
    this.exportCsv('历年经营数据', fields, list);
  }

  async exportYearPatent() {
    const list = await this.service.company.queryAllYearPatent();
    const fields = [
      { label: '公司编号', value: 'company_code' },
      { label: '公司名称', value: 'name' },
      { label: '年份', value: 'year' },
      { label: '发明专利申请量', value: 'invention_patent_apply_count' },
      { label: '发明专利授权量', value: 'invention_patent_authorize_count' },
      { label: '发明专利拥有量', value: 'invention_patent_owning_count' },
      { label: '实用新型申请量', value: 'practical_new_apply_count' },
      { label: '实用新型授权量', value: 'practical_new_authorize_count' },
      { label: '实用新型拥有量', value: 'practical_new_owning_count' },
      { label: '外观设计申请量', value: 'appearance_design_apply_count' },
      { label: '外观设计授权量', value: 'appearance_design_authorize_count' },
      { label: '外观设计拥有量', value: 'appearance_design_owning_count' },

      { label: 'PCT专利申请数量', value: 'pct_patent_apply_count' },
      { label: '同族专利数量', value: 'cognation_patent_count' },
      { label: '商标申请量', value: 'trademark_apply_count' },
      { label: '已注册商标量', value: 'registed_trademark_count' },
      { label: '境外注册商标量', value: 'outside_trademark_count' },
      { label: '著名商标量', value: 'famous_trademark_count' },
      { label: '驰名商标量', value: 'resounding_trademark_count' }
    ];
    this.exportCsv('历年专利数据', fields, list);
  }
}

module.exports = CompanyController;
