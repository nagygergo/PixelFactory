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
                'api' : '='
            }
        };

        return component;
    }

    CanvasCtrl.$inject = ['$log', '$window', '$document', 'ImageHandler', '$scope'];

    /* @ngInject */
    function CanvasCtrl($log, $window, $document, ImageHandler, $scope) {
      var vm = this;

      vm.api = {
          openImage: openImage
      };
      var canvas = $window.document.getElementById('pfCanvas');

      var ctx = canvas.getContext('2d');

      var src = 'images/mario.png';

      var parent = $window.document.getElementById('canvas');

      var angleInDegrees=0;

      var image = new Image();


      initialize();

      function initialize() {
				$window.addEventListener('resize', resizeCanvas, false);
				resizeCanvas();
                $scope.$on('down:image:open', openImage);
			}

			function redraw() {
        drawPicture(image);
			}

			function resizeCanvas() {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
				redraw();
			}

      function drawPicture(img) {
        clearCanvas();
        start();
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
        
      function openImage(event, file) {

          ImageHandler.loadImage(file).then(function (bitmap) {
              image = bitmap;
              drawPicture(bitmap);
          });
      }  
    }
})();
