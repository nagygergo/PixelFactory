(function () {
'use strict';
angular.module('app.feature-button')
.constant('BUTTONCONFIG', {
  'rotate-left' : {
    imgURL: 'images/rotate_left.png'
  },
  'rotate-right' : {
    imgURL: 'images/rotate_right.png'
  },
  'rotate-180' : {
    imgURL: 'images/rotate_180.png'
  },
  'flip-horizontal' : {
    imgURL: 'images/flip_horizontal.png'
  },
  'flip-vertical' : {
    imgURL: 'images/flip_vertical.png'
  },
  'grayscale' : {
    imgURL: 'images/grayscale.png'
  },
  'cancel' : {
    imgURL: 'images/cancel.png'
  },
  'checkmark' : {
    imgURL: 'images/checkmark.png'
  }
});
})();
