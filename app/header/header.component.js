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
      controllerAs: 'vm',
      bindings: {
        onSave: '&',
        onOpen: '&'
      }
    };

    return component;
  }

  HeaderCtrl.$inject = ['$log', '$scope', '$element'];

    /* @ngInject */
  function HeaderCtrl($log, $scope, $element) {
    var vm = this;
    vm.onClickSave = onClickSave;
    vm.onClickOpen = onClickOpen;

    function onClickSave() {
          vm.onSave();
    }
    function onClickOpen(element) {
        vm.file = angular.element(element).prop('files').item(0);
        vm.onOpen({file: vm.file});
    }
  }
})();
