(function () {
'use strict';
angular.module('app.feature-button')
.constant('BUTTONCONFIG', {
  'rotate-left' : {
    imgURL: 'images/rotate-left.png'
  },
  'rotate-right' : {
    imgURL: 'images/rotate-right.png'
  },
  'rotate-180' : {
    imgURL: 'images/rotate-180.png'
  },
  'flip-horizontal' : {
    imgURL: 'images/flip-horizontal.png'
  },
  'flip-vertical' : {
    imgURL: 'images/flip-vertical.png'
  },
  'grayscale' : {
    imgURL: 'images/grayscale.png'
  },
  'cancel' : {
    imgURL: 'images/cancel.svg'
  },
  'checkmark' : {
    imgURL: 'images/checkmark.svg'
  }
});
})();
