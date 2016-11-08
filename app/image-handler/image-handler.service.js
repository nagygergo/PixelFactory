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
      saveImage: saveImage
    };
    var maxWorkers = 1;
    var isWorkerReady;
    var workers = [];

        // PUBLIC FUNCTIONS

    function loadImage(imageFile) {
      console.log(Object.prototype.toString.call(imageFile));
      if (!imageFile || !(imageFile instanceof File)) {
        throw new TypeError('ERR:INVALIDPARAMS:FILE');
      }
      console.log(imageFile);
      getReadyWorker().then(function (worker) {
        var task =  new Task('loadImage', {file: imageFile});
        return worker.run(task);
      });
    }

    function saveImage(imageFile) {
      if (!imageFile || !(imageFile instanceof File)) {
        console.error(imageFile);
      }
      console.log(imageFile);
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
                          default:

                        }
                      }
                    }

                    function loadImage(input) {
                      createImageBitmap(input.params.file).then(function (response) {
                        console.log(response);
                        output.resolve(response);
                      })
                    }
                }
            ]);

      return workerPromise.then(function (angularWorker) {
        console.log(angularWorker);
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
