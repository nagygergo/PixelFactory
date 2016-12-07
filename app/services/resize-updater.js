(function() {
    'use strict';

    angular
        .module('app.services')
        .factory('resizeUpdater', ['$window','$q','$timeout','$log',UpdaterService ]);

function UpdaterService($window, $q, $timeout, $log){

    var api = {};

    api.size = {
        width: undefined,
        height: undefined,
        orientation: undefined
    };


    api.getSize = function(){
        api.size.width = $window.innerWidth;
        api.size.height = $window.innerHeight;
        api.size.orientation = (function(){
            if (api.size.width >= api.size.height){
                return "landscape";
            } else {
                return "portrait";
            }
        })();
        return api.size;
    };

    api.list = [];

    api.addCallback = function(callback) {
        api.list.push(callback);
    };

    api.removeCallback = function(callback){
        var index = api.list.indexOf(callback);
        delete api.list[index];
    };

    /*private method*/
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
                    $log.error('Failed - '+ callback.name + ' - ' + (new Date).toString());
                } else {
                    defer.resolve(response);
                }
            });

            this.promise = defer.promise;
            this.promise.then(function(result){
                $log.log('Executed - '+ callback.name + ' - ' + (new Date).toString());
            });
        };
    }

    angular.element($window).on('resize orientationchange',(function(){
        var timer_promise;
        return function(){
            if (timer_promise) {
                $timeout.cancel(timer_promise);
            }
            timer_promise = $timeout(function(){
                runAll();
            }, 500);
        };

    })());

    return api;

}})();