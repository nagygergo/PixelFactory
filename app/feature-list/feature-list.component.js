(function() {
    'use strict';

    angular
        .module('app.feature-list')
        .component('pfFeatureList', FeatureList());

    /* @ngInject */
    function FeatureList() {
        var component = {
            templateUrl: 'app/feature-list/feature-list.html',
            controller: FeatureListCtrl,
            controllerAs: 'vm',
            bindings: {
                transform: '&'
            }
        };

        return component;
    }

    FeatureListCtrl.$inject = [];

    /* @ngInject */
    function FeatureListCtrl() {
        var vm = this;

        vm.transformClicked = transformClicked;

        function transformClicked(type) {
                vm.transform({type: type});
        }
    }
})();
