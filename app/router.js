'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/company/list', controller.company.list);
  router.get('/company/detail', controller.company.detail);
};
