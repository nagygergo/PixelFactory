describe('Testing Resize-updater service',function(){

    var resizeUpdater;
    var $window;
    beforeEach(module('app.services'));
    beforeEach(inject(function(_resizeUpdater_,_$window_){ //parameter name = service name
        resizeUpdater = _resizeUpdater_;
        $window = _$window_;
    }));

    describe('Size object', function(){
        it('Size object created', function(){
            expect(resizeUpdater.getSize()).not.toBeUndefined();
        });
        it('width', function(){
            expect(resizeUpdater.getSize().width).toEqual($window.innerWidth);
        });
        it('height', function(){
            expect(resizeUpdater.getSize().height).toEqual($window.innerHeight);
        });
        it('orientation-landscape', function(){
            $window.innerWidth = 1366;
            $window.innerHeight = 768;
            expect(resizeUpdater.getSize().orientation).toEqual("landscape");
        });
        it('orientation-portrait', function(){
            $window.innerWidth = 768;
            $window.innerHeight = 1366;
            expect(resizeUpdater.getSize().orientation).toEqual("portrait");
        });
    });

    describe('Add a Callback and resize event',function(){

        var $timeout
        var $scope;
        beforeEach(inject(function(_$timeout_,_$rootScope_){
            $timeout = _$timeout_;
            $scope = _$rootScope_.$new();
        }));

        it('Test with trigger resize event',inject(function(){

            $window.innerWidth = 1368;
            $window.innerHeight = 768;
            var spy_func = jasmine.createSpy('spy_func');

            resizeUpdater.addCallback(spy_func);

            $window.innerWidth = 1000;
            angular.element($window).triggerHandler('resize');
            $scope.$digest();
            $timeout.flush();
            expect(spy_func).toHaveBeenCalled();
        }));

        it('Test without trigger event',inject(function(){

            $window.innerWidth = 1368;
            $window.innerHeight = 768;
            var spy_func = jasmine.createSpy('spy_func');

            resizeUpdater.addCallback(spy_func);

            expect(spy_func).not.toHaveBeenCalled();
        }));


    });


});
