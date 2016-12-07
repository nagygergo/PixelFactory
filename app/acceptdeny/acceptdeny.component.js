(function () {
    'use strict';

    angular
        .module('app.acceptdeny')
        .component('pfAcceptdeny', PfAcceptdeny());

    /* @ngInject */
    function PfAcceptdeny() {
        var component = {
            templateUrl: 'app/acceptdeny/acceptdeny.html',
            controller: AcceptdenyCtrl,
            controllerAs: 'vm',
            bindings: {
                onAccept: '&',
                onDeny: '&',
                enabled: '<'
            }
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
                vm.onAccept();

        }

        function onClickDeny() {
                vm.onDeny();

        }
    }
})();
