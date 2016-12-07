(function() {
    'use strict';

    angular
        .module('app.feature-button')
        .component('featureButton', featureButton());

    /* @ngInject */
    function featureButton() {
        var component = {
            templateUrl: 'app/feature-button/feature-button.html',
            controller: FeatureButtonCtrl,
            controllerAs: 'vm',
            bindings: {
              type: '@',
              onClick: '&'
            }
        };

        return component;
    }

    FeatureButtonCtrl.$inject = ['$log', 'BUTTONCONFIG'];

    /* @ngInject */
    function FeatureButtonCtrl($log, BUTTONCONFIG) {
      var vm = this;
      vm.imageURL = null;
      vm.click = click;
      activate();


      function click() {
          vm.onClick({type: vm.type});
      }


      function activate() {
        if(vm.type && BUTTONCONFIG[vm.type]) {
          vm.imageURL = BUTTONCONFIG[vm.type].imgURL;
        }
      }
    }
})();
