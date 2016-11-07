(function() {
    'use strict';

    angular
        .module('app.services')
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
                api.list.push(callback);
            };

            api.removeCallback = function(callback){
                var index = api.list.indexOf(callback);
                delete api.list[index];
            };

            var runAll = function() {

                for(var item in api.list){
                    var obj = new Obj(api.list[item]);
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
                        //TODO log
                    });
                };
            }

            angular.element($window).on('resize',(function(){
                var timer;
                return function(){
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        runAll();
                    }, 500);
                };

            })());

            return api;

        });
})();
