(function() {
    'use strict';

    angular
        .module('app.acceptdeny')
        .component('pfAcceptdeny', PfAcceptdeny());

    /* @ngInject */
    function PfAcceptdeny() {
        var component = {
            templateUrl: 'app/acceptdeny/acceptdeny.html',
            controller: AcceptdenyCtrl,
            controllerAs: 'vm'
        };

        return component;
    }

    AcceptdenyCtrl.$inject = ['$log'];

    /* @ngInject */
    function AcceptdenyCtrl($log) {
      var vm = this;

      vm.onClickAccept = onClickAccept;
      vm.onClickDeny = onClickDeny;

      function onClickAccept() {
        $log.debug('Accept icon clicked');
      }
      function onClickDeny() {
        $log.debug('Deny icon clicked');
      }
    }
})();
