(function() {
    'use strict';

    angular
        .module('app.canvas')
        .component('pfCanvas', PfCanvas());

    /* @ngInject */
    function PfCanvas() {
        var component = {
            templateUrl: 'app/canvas/canvas.html',
            controller: CanvasCtrl,
            controllerAs: 'vm',
            bindings: {
                'image' : '<'
            }
        };

        return component;
    }

    CanvasCtrl.$inject = ['$log', '$window', '$scope', '$element'];

    /* @ngInject */
    function CanvasCtrl($log, $window, $scope, $element) {
      var vm = this;

      var canvas = $window.document.getElementById('pfCanvas');

      var ctx = canvas.getContext('2d');

      var parent = $window.document.getElementById('canvas');

      var angleInDegrees=0;

        vm.$onChanges = onChange;


      initialize();

      function initialize() {
				$window.addEventListener('resize', resizeCanvas, false);
				resizeCanvas();
			}

			function resizeCanvas() {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
				drawPicture(vm.image);
			}

		function onChange() {
            drawPicture(vm.image);
        }

      function drawPicture(image) {
        clearCanvas();
        var img = new Image();
        img.onload = start;
        img.src = image;
        function start(){
          var ratio=calculateProportionalAspectRatio(img.width,img.height,canvas.width,canvas.height);
          ctx.drawImage(img,(canvas.width - img.width*ratio)/2, (canvas.height - img.height*ratio)/2
              ,img.width*ratio,img.height*ratio);
        }
        function calculateProportionalAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
          return(Math.min(maxWidth / srcWidth, maxHeight / srcHeight));
        }
      }

      function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
})();
