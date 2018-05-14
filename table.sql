CREATE TABLE t_company_base_info (
  id                       INT AUTO_INCREMENT NOT NULL,
  code                     INT                NOT NULL COMMENT '企业代码',
  name                     VARCHAR(128)       NOT NULL COMMENT '单位名称',
  registered_capital       DECIMAL(15, 3) DEFAULT 0 COMMENT '注册资本',
  create_year              DATE           DEFAULT NULL COMMENT '创建年份',
  phone_number             VARCHAR(32)    DEFAULT NULL COMMENT '联系电话',
  total_assets             DECIMAL(15, 3) DEFAULT 0 COMMENT '现有资产总额',
  total_capital_asserts    DECIMAL(15, 3) DEFAULT 0 COMMENT '现有固定资产总额',
  total_indebtedness       DECIMAL(15, 3) DEFAULT 0 COMMENT '现有负债总额',
  subsidiary_company_count INT            DEFAULT 0 COMMENT '控股子公司数量',
  total_staff_count        INT            DEFAULT 0 COMMENT '员工数量',
  master_staff_count       INT            DEFAULT 0 COMMENT '硕士员工数量',
  doctor_staff_count       INT            DEFAULT 0 COMMENT '博士员工数量',
  researcher_count         INT            DEFAULT 0 COMMENT '科研人员数量',
  PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '企业基本信息表';

CREATE TABLE t_company_type_rel (
  id           INT AUTO_INCREMENT NOT NULL,
  company_code INT                NOT NULL COMMENT '企业代码',
  type         VARCHAR(32) DEFAULT NULL COMMENT '单位性质',
  PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '企业单位性质关系表';

-- 企业代码  单位名称  注册资本  创办年份  联系电话  现有资产总额  现有固定资产总额  现有负债总额  控股子公司数量  现有职工人数  硕士  博士  科研人员  单位性质


CREATE TABLE t_company_product (
  id                     INT AUTO_INCREMENT NOT NULL,
  company_code           INT                NOT NULL COMMENT '企业代码',
  product_name           VARCHAR(128) DEFAULT NULL COMMENT '产品名称',
  patent_count           INT          DEFAULT 0 COMMENT '发明专利数量',
  practical_patent_count INT          DEFAULT 0 COMMENT '实用新型专利数量',
  PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '企业产品表';
-- 企业产品表（产品序号、产品名称、发明专利数量、实用新型专利数量）

CREATE TABLE t_company_operation_state (
  id                  INT AUTO_INCREMENT NOT NULL,
  company_code        INT                NOT NULL COMMENT '企业代码',
  year                DATE           DEFAULT NULL COMMENT '年份',
  total_sale          DECIMAL(15, 3) DEFAULT 0 COMMENT '销售总收入（万元）',
  new_product_sale    DECIMAL(15, 3) DEFAULT 0 COMMENT '新产品销售收入（万元）',
  patent_product_sale DECIMAL(15, 3) DEFAULT 0 COMMENT '专利产品销售收入（万元）',
  export_sale         DECIMAL(15, 3) DEFAULT 0 COMMENT '出口销售总额（万元）',
  total_profit        DECIMAL(15, 3) DEFAULT 0 COMMENT '利税总额（万元）',
  after_tax_profit    DECIMAL(15, 3) DEFAULT 0 COMMENT '税后利润（万元）',
  staff_count         INT            DEFAULT 0 COMMENT '员工数（人）',
  r_d_cost            DECIMAL(15, 3) DEFAULT 0 COMMENT 'R&D经费投入（万元）',
  PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '企业历年经营情况表';

-- 公司历年经营表（年份 销售总收入（万元） #新产品销售收入（万元） #专利产品销售收入（万元） 出口销售总额（万元） 利税总额（万元）   其中，税后利润（万元） 员工数（人） R&D经费投入（万元

CREATE TABLE t_company_year_patent (
  id                                INT AUTO_INCREMENT NOT NULL,
  company_code                      INT                NOT NULL COMMENT '企业代码',
  year                              DATE DEFAULT NULL COMMENT '年份',
  invention_patent_apply_count      INT  DEFAULT 0 COMMENT '发明专利申请量',
  invention_patent_authorize_count  INT  DEFAULT 0 COMMENT '发明专利申请量',
  invention_patent_owning_count     INT  DEFAULT 0 COMMENT '发明专利拥有量',

  practical_new_apply_count         INT  DEFAULT 0 COMMENT '实用新型申请量',
  practical_new_authorize_count     INT  DEFAULT 0 COMMENT '实用新型授权量',
  practical_new_owning_count        INT  DEFAULT 0 COMMENT '实用新型拥有量',

  appearance_design_apply_count     INT  DEFAULT 0 COMMENT '外观设计申请量',
  appearance_design_authorize_count INT  DEFAULT 0 COMMENT '外观设计授权量',
  appearance_design_owning_count    INT  DEFAULT 0 COMMENT '外观设计拥有量',

  pct_patent_apply_count            INT  DEFAULT 0 COMMENT 'PCT专利申请数量',
  cognation_patent_count            INT  DEFAULT 0 COMMENT '同族专利数量',

  trademark_apply_count             INT  DEFAULT 0 COMMENT '商标申请量',
  registed_trademark_count          INT  DEFAULT 0 COMMENT '已注册商标量',
  outside_trademark_count           INT  DEFAULT 0 COMMENT '已注册商标量',
  famous_trademark_count            INT  DEFAULT 0 COMMENT '著名商标量',
  resounding_trademark_count        INT  DEFAULT 0 COMMENT '驰名商标量',
  PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '企业历年专利商标拥有情况表';

CREATE TABLE t_company_intellectual_property_state (
  id                                    INT AUTO_INCREMENT NOT NULL,
  company_code                          INT                NOT NULL COMMENT '企业代码',
  patent_execute_count                  INT DEFAULT 0 COMMENT '专利自行实施数量（件）',
  patent_license_count                  INT DEFAULT 0 COMMENT '专利许可数量（件）',
  patent_transfer_count                 INT DEFAULT 0 COMMENT '专利转让数量（件）',

  copyright_execute_count               INT DEFAULT 0 COMMENT '版权自行实施数量（件）',
  copyright_license_count               INT DEFAULT 0 COMMENT '版权许可数量（件）',

  copyright_registration_count          INT DEFAULT 0 COMMENT '著作权登记(件)',
  software_copyright_registration_count INT DEFAULT 0 COMMENT '计算机软件著作权登记（件）',
  ic_diagram_registration_count         INT DEFAULT 0 COMMENT '集成电路布图设计登记（件）',
  secret_registration_count             INT DEFAULT 0 COMMENT '已明确界定为本单位商业（技术）秘密加以保护的项数 ',
  five_year_patent_count                INT DEFAULT 0 COMMENT '发明专利维持年限5年以上',
  practical_new_three_year_count        INT DEFAULT 0 COMMENT '实用新型维持年限3年以上',
  ten_year_patent_count                 INT DEFAULT 0 COMMENT '维持年限为10年以上的发明专利',
  standard_patent_count                 INT DEFAULT 0 COMMENT '形成国家或行业标准数量',
  from_independent_create               INT DEFAULT 1 COMMENT '是否自主创造',
  from_licensed                         INT DEFAULT 1 COMMENT '是否被许可',
  from_transfer                         INT DEFAULT 1 COMMENT '是否被转让',
  PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '企业专利商标统计表';







