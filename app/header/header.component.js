(function () {
  'use strict';

  angular
        .module('app.header')
        .component('pfHeader', pfHeader());

    /* @ngInject */
  function pfHeader() {
    var component = {
      templateUrl: 'app/header/header.html',
      controller: HeaderCtrl,
      controllerAs: 'vm'
    };

    return component;
  }

  HeaderCtrl.$inject = ['$log', '$scope'];

    /* @ngInject */
  function HeaderCtrl($log, $scope) {
    var vm = this;
    vm.onClickSave = onClickSave;
    vm.onClickOpen = onClickOpen;

    function onClickSave() {
      $log.debug('Save icon clicked');
    }
    function onClickOpen() {
      $log.debug('Open icon clicked');
      $scope.$emit('up:image:open', vm.file);
    }
  }
})();
