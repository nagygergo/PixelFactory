(function() {
    'use strict';

    angular
        .module('app.services', [
            'app.core'
        ])
        .factory('resizeUpdater', function($window, $q){

            var api = {};

            var size = {
                width: undefined,
                height: undefined
            };

            api.getSize = function(){
                size.width = $window.innerWidth;
                size.height = $window.innerHeight;
                return size;
            };

            api.list = [];

            api.addCallback = function(callback) {

                api.list[ api.list.length ] = callback;

            };

            var runAll = function() {

                for (var i=0; i<api.list.length; i++){
                    console.log('('+i+') starting');
                    var obj = new Obj(api.list[i]);
                    obj.execute();
                }

            };

            function Obj(callback) {
                this.promise = undefined;
                this.callback = callback;
                this.execute = function () {
                    var defer = $q.defer();
                    this.callback(function (response) {
                        if (response === 'error') {
                            defer.reject('Error occured.');
                        } else {
                            defer.resolve(response);
                        }
                    });

                    this.promise = defer.promise;
                    this.promise.then(function(result){
                        console.log('Promise result: _ '+result);
                    });
                };
            }

            angular.element($window).on('resize',runAll);

            return api;

        });
})();
