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
            controller: RootCtrl,
            controllerAs: 'vm'
        };

        return component;
    }

    RootCtrl.$inject = ['ImageHandler', '$scope'];

    /* @ngInject */
    function RootCtrl(ImageHandler, $scope) {
        var vm = this;
        vm.onFileSelect = onFileSelect;
        vm.canvasApi = {};

        $scope.$on('up:image:open', onFileSelect);
        
        function onFileSelect(event, file){
            $scope.$broadcast('down:image:open', file);
        }
    }
})();
