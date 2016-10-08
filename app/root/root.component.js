(function() {
    'use strict';

    angular
        .module('app.root')
        .component('pfRoot', PfRoot());

    /**
     * This component should only be responsible for pulling the other components together    
     */
    /* @ngInject */
    function PfRoot() {
        var component = {
            templateUrl: 'app/root/root.html',
            controller: RootCtrl
        };

        return component;
    }

    RootCtrl.$inject = [];

    /* @ngInject */
    function RootCtrl() {

    }
})();
