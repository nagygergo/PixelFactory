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
        onFileSelect: '&'
      }
    };

    return component;
  }

  HeaderCtrl.$inject = ['$log', 'ImageHandler'];

    /* @ngInject */
  function HeaderCtrl($log, ImageHandler) {
    var vm = this;
    vm.onClickSave = onClickSave;
    vm.onClickOpen = onClickOpen;

    function onClickSave() {
      $log.debug('Save icon clicked');
    }
    function onClickOpen() {
      $log.debug('Open icon clicked');
      $log.debug(vm.file);
      ImageHandler.loadImage(vm.file);
    }
  }
})();
