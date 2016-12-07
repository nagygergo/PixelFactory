(function () {
  'use strict';

  angular
        .module('app.image-handler')
        .factory('ImageHandler', ImageHandler);

  ImageHandler.$inject = ['WorkerService', '$q'];

    /* @ngInject */
  function ImageHandler(WorkerService, $q) {
    var service = {
      loadImage: loadImage,
      saveImage: saveImage,
        rotateImageLeft: rotateImageLeft,
        rotateImageRight: rotateImageRight,
        rotateImage180: rotateImage180,
        flipHorizontally: flipHorizontally,
        flipVertically: flipVertically,
        greyscaleImage: greyscaleImage
    };
    var maxWorkers = 1;
    var isWorkerReady;
    var workers = [];

        // PUBLIC FUNCTIONS

    function loadImage(imageFile) {
      if (!imageFile || !(imageFile instanceof File)) {
        throw new TypeError('ERR:INVALIDPARAMS:FILE');
      }

      return getReadyWorker()
          .then(function (worker) {
          var task =  new Task('loadImage', {file: imageFile});
          return worker.run(task);
      });
    }

    function rotateImageLeft(image) {
        if(!image || !angular.isString(image)) {
            throw new TypeError('ERR:INVALIDPARAMS:BASE64');
        }

        return getReadyWorker()
            .then(function (worker) {
                var task = new Task('rotateLeft', {img: image});
                return worker.run(task);
            });
    }

      function rotateImageRight(image) {
          if(!image || !angular.isString(image)) {
              throw new TypeError('ERR:INVALIDPARAMS:BASE64');
          }

          return getReadyWorker()
              .then(function (worker) {
                  var task = new Task('rotateRight', {img: image});
                  return worker.run(task);
              });
      }

      function rotateImage180(image) {
          if(!image || !angular.isString(image)) {
              throw new TypeError('ERR:INVALIDPARAMS:BASE64');
          }

          return getReadyWorker()
              .then(function (worker) {
                  var task = new Task('rotate180', {img: image});
                  return worker.run(task);
              });
      }
      function flipHorizontally(image) {
          if(!image || !angular.isString(image)) {
              throw new TypeError('ERR:INVALIDPARAMS:BASE64');
          }

          return getReadyWorker()
              .then(function (worker) {
                  var task = new Task('flipHorz', {img: image});
                  return worker.run(task);
              });
      }

      function flipVertically(image) {
          if(!image || !angular.isString(image)) {
              throw new TypeError('ERR:INVALIDPARAMS:BASE64');
          }

          return getReadyWorker()
              .then(function (worker) {
                  var task = new Task('flipVert', {img: image});
                  return worker.run(task);
              });
      }

      function greyscaleImage(image) {
          if(!image || !angular.isString(image)) {
              throw new TypeError('ERR:INVALIDPARAMS:BASE64');
          }

          return getReadyWorker()
              .then(function (worker) {
                  var task = new Task('greyscale', {img: image});
                  return worker.run(task);
              });
      }

    function saveImage(imageFile) {
      if (!imageFile || !(imageFile instanceof File)){}
    }

        // PRIVATE FUNCTIONS

    function Task(taskName, params) {
      var task = {};

      if (!angular.isString(taskName) || !angular.isObject(params)) {
        throw new TypeError('ERR:INVALIDPARAMS:STIRNG:OBJECT');
      }

      this.name = taskName;
      this.params = params;
    }
    //Selects one of the workers to be
    function getReadyWorker() {
      var returnWorker;
      workers.some(function (value) {
        if(value && value.state === 'ready') {
         returnWorker = value.worker;
          return true;
        }
      });
      if(!returnWorker && maxWorkers > workers.length) {
        return  spawnWorker().then(function () {
          return  getReadyWorker();
        });
      } else if(returnWorker){
        return $q.resolve(returnWorker);
      }
    }

    function spawnWorker() {
      var workerPromise = WorkerService.createAngularWorker(['input', 'output',
                function (input, output) {
                  inputParser(input);
                    function inputParser(input) {
                      if(!input || !angular.isString(input.name)){
                        output.reject('ERR:WEBWORKER:INVALIDPARAMS');
                      } else {
                        switch (input.name) {
                          case 'loadImage':
                            loadImage(input);
                            break;
                            case 'rotateLeft':
                              rotateLeft(input);
                              break;
                            case 'rotateRight':
                                rotateRight(input);
                                break;
                            case 'rotate180':
                                rotate180(input);
                                break;
                            case 'flipHorz':
                                flipHorz(input);
                                break;
                            case 'flipVert':
                                flipVert(input);
                                break;
                            case 'greyscale':
                                greyscale(input);
                                break;
                          default:

                        }
                      }
                    }

                    function loadImage(input) {
                        var reader = new FileReader();
                        reader.readAsDataURL(input.params.file);
                      reader.onload = function () {
                        output.resolve(reader.result);
                      };
                      reader.onerror = function () {
                          output.reject();
                      }
                    }

                    function rotateLeft(input) {
                        rotate(input, -90);
                    }

                    function rotateRight(input) {
                        rotate(input, 90);
                    }

                    function rotate180(input) {
                        rotate(input, 180);
                    }

                    function flipHorz(input) {
                        Jimp.read(input.params.img).then(function (image) {
                            image.flip(true,false)
                                .getBase64(Jimp.MIME_PNG, function (err, src) {
                                    output.resolve(src);
                                });
                        });
                    }

                    function flipVert(input) {
                        Jimp.read(input.params.img).then(function (image) {
                            image.flip(false,true)
                                .getBase64(Jimp.MIME_PNG, function (err, src) {
                                    output.resolve(src);
                                });
                        });
                    }

                    function greyscale(input) {
                        Jimp.read(input.params.img).then(function (image) {
                            image.greyscale()
                                .getBase64(Jimp.MIME_PNG, function (err, src) {
                                    output.resolve(src);
                                });
                        });
                    }

                    function rotate(input, deg) {
                        Jimp.read(input.params.img).then(function (image) {
                            image.rotate(deg)
                                .getBase64(Jimp.MIME_PNG, function (err, src) {
                                    output.resolve(src);
                                });
                        });
                    }

                }
            ]);

      return workerPromise.then(function (angularWorker) {
        workers.push({
          worker : angularWorker,
          state : 'ready'
        });
      })
      .catch(function (error) {
        $log.error('ERR:WEBWORKER:FAILINIT');
      });
    }

    return service;
  }
})();
