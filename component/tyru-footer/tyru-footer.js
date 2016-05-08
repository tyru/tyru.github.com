(function() {
  'use strict';

  angular.module('tyru')
    .component('tyruFooter', {
      templateUrl: '/component/tyru-footer/tyru-footer.html',
      bindings: {lastchange: '@'}
    });
})();
