(function () {
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
        vm.onOpen = onOpen;
        vm.onSave = onSave;
        vm.onTransform = onTransform;
        vm.onAccept = onAccept;
        vm.onDeny = onDeny;
        vm.image = new Image();
        vm.oldImage = new Image();
        vm.fileName = "";
        vm.unapproved = false;
        vm.featuresEnabled = false;
        vm.fileFeaturesEnabled = true;


        function onOpen(file) {
            if (vm.fileFeaturesEnabled) {
                vm.fileFeaturesEnabled = false;
                vm.fileName = file.name;
                ImageHandler.loadImage(file).then(function (imageData) {
                    vm.fileFeaturesEnabled = true;
                    vm.featuresEnabled = true;
                    vm.image = imageData;
                });
            }
        }

        function onSave() {
            if (vm.fileFeaturesEnabled) {
                download(vm.image, vm.fileName, "image/png");
            }
        }

        function onTransform(type) {
            var promise;
            if (vm.featuresEnabled) {
                vm.featuresEnabled = false;
                vm.fileFeaturesEnabled = false;
                vm.oldImage = vm.image;

                if (type === 'rotate-left') {
                    promise = ImageHandler.rotateImageLeft(vm.image)
                } else if (type === 'rotate-right') {
                    promise = ImageHandler.rotateImageRight(vm.image);
                } else if (type === 'rotate-180') {
                    promise = ImageHandler.rotateImage180(vm.image);
                } else if (type === 'flip-horizontal') {
                    promise = ImageHandler.flipHorizontally(vm.image);
                } else if (type === 'flip-vertical') {
                    promise = ImageHandler.flipVertically(vm.image);
                } else if (type === 'grayscale') {
                    promise = ImageHandler.greyscaleImage(vm.image);
                }
                promise.then(function (imageData) {
                    vm.image = imageData;
                    vm.unapproved = true;
                    vm.featuresEnabled = true;
                    vm.fileFeaturesEnabled = true;
                });
            }
        }

        function onAccept() {
            vm.oldImage = vm.image;
            vm.unapproved = false;

        }

        function onDeny() {
            vm.image = vm.oldImage;
            vm.unapproved = false;
        }
    }
})();
