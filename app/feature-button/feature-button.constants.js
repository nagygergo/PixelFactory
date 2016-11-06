(function () {
'use strict';
angular.module('app.feature-button')
.constant('BUTTONCONFIG', {
  'rotate-left' : {
    imgURL: 'images/rotate-left.svg'
  },
  'rotate-right' : {
    imgURL: 'images/rotate-right.svg'
  },
  'rotate-180' : {
    imgURL: 'images/rotate-180.svg'
  },
  'flip-horizontal' : {
    imgURL: 'images/flip-horizontal.svg'
  },
  'flip-vertical' : {
    imgURL: 'images/flip-vertical.svg'
  },
  'grayscale' : {
    imgURL: 'images/grayscale.svg'
  },
  'cancel' : {
    imgURL: 'images/cancel.svg'
  },
  'checkmark' : {
    imgURL: 'images/checkmark.svg'
  }
});
})();
