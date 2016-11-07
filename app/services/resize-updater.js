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

                console.log(callback);
                api.list[ callback ] = callback;

            };

            api.removeCallback = function(callback){

                delete api.list[ callback ];
                console.log('('+callback+')' + 'removed');

            };

            var runAll = function() {

                for(var item in api.list){
                    //console.log('('+item+') starting');
                    var obj = new Obj(api.list[item]);
                    obj.execute();
                }

                console.log(api.list);

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
