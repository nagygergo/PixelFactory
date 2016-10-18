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
        };

        return component;
    }

    FeatureListCtrl.$inject = [];

    /* @ngInject */
    function FeatureListCtrl() {

    }
})();
