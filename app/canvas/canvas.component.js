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
            controllerAs: 'vm'
        };

        return component;
    }

    CanvasCtrl.$inject = ['$log'];

    /* @ngInject */
    function CanvasCtrl($log) {
      var vm = this;
      var canvas = document.getElementById('pfCanvas');
      var ctx = canvas.getContext('2d');

      var src = 'images/mario.png';
      var parent = document.getElementById('canvas');

      var angleInDegrees=0;

      initialize();

      function initialize() {
				window.addEventListener('resize', resizeCanvas, false);
				resizeCanvas();
			}

			function redraw() {
        openPicture(src);
			}

			function resizeCanvas() {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
				redraw();
			}

      function openPicture(src) {
        clearCanvas();
        var img=new Image();
        img.crossOrigin="anonymous";
        img.onload=start;
        img.src=src;
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
