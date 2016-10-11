(function() {
    'use strict';

    angular
        .module('app.header')
        .component('pfHeader', PfHeader());

    /* @ngInject */
    function PfHeader() {
        var component = {
            templateUrl: 'app/header/header.html',
            controller: HeaderCtrl,
        };

        return component;
    }

    HeaderCtrl.$inject = ['$log'];

    /* @ngInject */
    function HeaderCtrl($log) {
      var vm = this;
      vm.onClickSave = onClickSave;
      vm.onClickOpen = onClickOpen;

      function onClickSave() {
        $log.debug('Save icon clicked');
      }
      function onClickOpen() {
        $log.debug('Open icon clicked');
      }
    }
})();
