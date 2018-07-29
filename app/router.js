'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/company/list', controller.company.list);
  router.get('/company/detail', controller.company.detail);
  router.get('/company/queryYearPatent', controller.company.queryYearPatent);

  router.get('/company/exportBaseInfo', controller.company.exportBaseInfo);
  router.get('/company/exportProducts', controller.company.exportProducts);
  router.get('/company/exportYearBus', controller.company.exportYearBus);
  router.get('/company/exportYearPatent', controller.company.exportYearPatent);

  router.get('/industry/list', controller.industry.list);
  router.get('/industry/detail', controller.industry.detail);
  router.get('/industry/export', controller.industry.export);
};
