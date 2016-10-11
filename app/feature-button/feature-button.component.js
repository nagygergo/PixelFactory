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
        };

        return component;
    }

    FeatureButtonCtrl.$inject = ['$log'];

    /* @ngInject */
    function FeatureButtonCtrl($log) {
      var vm = this;
      vm.onClick = onClick;

      function onClick() {
        $log.debug('Button clicked');
      }
    }
})();
