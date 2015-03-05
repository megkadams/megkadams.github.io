(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var chromefix       = require('./chromefix.js');
var sidebar         = require('./sidebarEffects.js');
var forms           = require('./formLogic.js');
var video           = require('./videoLogic.js');
var mobileAnimation = require('./mobileAnimation.js');

//Home Page Functions
function setClock(time) {
  clock.innerText = time;
}

function animationNavigation(setTime, thisClass, el) {
  var fullClassList = ['animationStage1', 'animationStage2', 'animationStage3', 'animationStage4', 'animationStage5', 'animationStage6'];
  var thisClassIndex = fullClassList.indexOf(thisClass);
  if (thisClassIndex > -1) {
    fullClassList.splice(thisClassIndex, 1);
  }
 
  setClock(setTime);

  var clickSiblings = Array.prototype.filter.call(el.parentNode.children, function(child){
     return child !== el;
  });
  clickSiblings.forEach(function(sib){
    sib.classList.remove('active');
  });
  el.classList.add('active');

  if (!animationControl.classList.contains(thisClass)) {
    animationControl.classList.add(thisClass);
  }
  animationControl.classList.remove(fullClassList[0], fullClassList[1], fullClassList[2], fullClassList[3], fullClassList[4]);
}

//Service Page Functions
function serviceCalculator() {
  calculator    = document.getElementById('serviceCalculator');
  if (calculator) {
    var result        = document.getElementById('calculatorFinalResult');
    var formResult    = document.getElementById('formFinalResult');
    var sites         = document.getElementById('numberSites');
    var circuits      = document.getElementById('numberCircuits');
    var sensors       = document.getElementById('numberSensors');
    var inputs        = [sites, circuits, sensors];
    var sitesValue    = 1;
    var circuitsValue = 0;
    var sensorsValue  = 0;

    var calculateResult = function() {
      if (isNaN(parseInt(sitesValue))) {
        sitesValue = 0;
      } else if (isNaN(parseInt(circuitsValue))) {
        circuitsValue = 0;
      } else if (isNaN(parseInt(sensorsValue))) {
        sensorsValue = 0;
      }

      totalCost = (parseInt(sitesValue) * 20) + (parseInt(circuitsValue) * 2) + (parseInt(sensorsValue) * 2);

      if (((parseInt(circuitsValue)) + (parseInt(sensorsValue)) > 200) || totalCost > 9999) {
        result.classList.add('disable-calculation');
        result.classList.remove('lg-number');
        document.getElementById('price-per').classList.add('hidden');
        result.textContent = 'Please contact us today for a customized estimate.';
      } else {
        result.classList.remove('disable-calculation');
        document.getElementById('price-per').classList.remove('hidden');
        if (totalCost > 999) {
          result.classList.add('lg-number');
        } else {
          result.classList.remove('lg-number');
        }
        result.textContent = '$' + totalCost;
        formResult.textContent = '$' + totalCost;
      }
    };

    var incrementCounter = function(thisElement, el) {
      var inputs = [sites, circuits, sensors];
      var thisElementIndex = inputs.indexOf(thisElement);
      if (thisElementIndex > -1) {
        inputs.splice(thisElementIndex, 1);
      }

      if (!el.parentNode.parentNode.classList.contains('active')) {
        inputs[0].classList.remove('active');
        inputs[1].classList.remove('active');
        el.parentNode.parentNode.classList.add('active');
      }
      thisElement.getElementsByTagName('input')[0].value = parseInt(thisElement.getElementsByTagName('input')[0].value) + 1;

      if (thisElement === sites) {
        sitesValue    = sites.getElementsByTagName('input')[0].value;
      } else if (thisElement === circuits) {
        circuitsValue = circuits.getElementsByTagName('input')[0].value;
      } else {
        sensorsValue  = sensors.getElementsByTagName('input')[0].value;
      }
      calculateResult();
    };

    var decrementCounter = function(thisElement, el) {
      var inputs = [sites, circuits, sensors];
      var thisElementIndex = inputs.indexOf(thisElement);
      if (thisElementIndex > -1) {
        inputs.splice(thisElementIndex, 1);
      }
      if (!el.parentNode.parentNode.classList.contains('active')) {
        inputs[0].classList.remove('active');
        inputs[1].classList.remove('active');
        el.parentNode.parentNode.classList.add('active');
      }
      if (parseInt(thisElement.getElementsByTagName('input')[0].value) > 1) {
        thisElement.getElementsByTagName('input')[0].value = parseInt(thisElement.getElementsByTagName('input')[0].value) - 1;
        if (thisElement === sites) {
          sitesValue    = sites.getElementsByTagName('input')[0].value;
        } else if (thisElement === circuits) {
          circuitsValue = circuits.getElementsByTagName('input')[0].value;
        } else {
          sensorsValue  = sensors.getElementsByTagName('input')[0].value;
        }
        calculateResult();
      }
    };

    var activeState = function(el) {
      var clickSiblings = Array.prototype.filter.call(el.parentNode.children, function(child){
         return child !== el;
      });
      if (!el.classList.contains('active')) {
        clickSiblings.forEach(function(sib){
          sib.classList.remove('active');
        });
        el.classList.add('active');
      }
    };

    sites.addEventListener('input', function(e) {
      sitesValue    = sites.getElementsByTagName('input')[0].value;
      calculateResult();
    });
    sites.getElementsByTagName('input')[0].addEventListener('focus', function(e) {
      if (!this.parentNode.parentNode.classList.contains('active')) {
        circuits.classList.remove('active');
        sensors.classList.remove('active');
        this.parentNode.parentNode.classList.add('active');
      }
    });
    sites.addEventListener('click', function(e){
      e.preventDefault();
      var el = this;
      activeState(el);
    });
    document.getElementById('numberSitesUp').addEventListener('click', function(e){
      e.preventDefault();
      var el = this;
      incrementCounter(sites, el);
    });
    document.getElementById('numberSitesDown').addEventListener('click', function(e){
      e.preventDefault();
      var el = this;
      decrementCounter(sites, el);
    });

    circuits.addEventListener('input', function(e) {
      circuitsValue = circuits.getElementsByTagName('input')[0].value;
      calculateResult();
    });
    circuits.getElementsByTagName('input')[0].addEventListener('focus', function(e) {
      if (!this.parentNode.parentNode.classList.contains('active')) {
        sites.classList.remove('active');
        sensors.classList.remove('active');
        this.parentNode.parentNode.classList.add('active');
      }
    });
    circuits.addEventListener('click', function(e){
      e.preventDefault();
      var el = this;
      activeState(el);
    });
    document.getElementById('numberCircuitsUp').addEventListener('click', function(e){
      e.preventDefault();
      var el = this;
      incrementCounter(circuits, el);
    });
    document.getElementById('numberCircuitsDown').addEventListener('click', function(e){
      e.preventDefault();
      var el = this;
      decrementCounter(circuits, el);
    });

    sensors.addEventListener('input', function(e) {
      sensorsValue  = sensors.getElementsByTagName('input')[0].value;
      calculateResult();
    });
    sensors.getElementsByTagName('input')[0].addEventListener('focus', function(e) {
      if (!this.parentNode.parentNode.classList.contains('active')) {
        circuits.classList.remove('active');
        sites.classList.remove('active');
        this.parentNode.parentNode.classList.add('active');
      }
    });
    sensors.addEventListener('click', function(e){
      e.preventDefault();
      var el = this;
      activeState(el);
    });
    document.getElementById('numberSensorsUp').addEventListener('click', function(e){
      e.preventDefault();
      var el = this;
      incrementCounter(sensors, el);
    });
    document.getElementById('numberSensorsDown').addEventListener('click', function(e){
      e.preventDefault();
      var el = this;
      decrementCounter(sensors, el);
    });
  }
}

// function formfocus() {
//  var focusInput = document.getElementById('numberSitesInput');
//  if (focusInput) {
//    focusInput.focus();
//  }
// }

//Product Page Functions
function productCards() {
  var products   = document.getElementsByClassName('product-card');
  var productCardFlip = function() {
    if (!this.classList.contains('card-flip')) {
      this.classList.add('card-flip');
    } else {
      this.classList.remove('card-flip');
    }
  };

  for (var i=0; i<products.length; i++) {
    products[i].addEventListener('click', productCardFlip, false);
  }
}

//Contact Page Functions
function shortPage() {
  var outerScreenHeight  = document.getElementsByTagName('body')[0].offsetHeight;
  var innerContentHeight = document.getElementById('body-content').offsetHeight;
  var footerHeight = document.getElementById('mainFooter').offsetHeight;
  if (innerContentHeight < outerScreenHeight) {
    var heightDifference = outerScreenHeight - (innerContentHeight + footerHeight);
    document.getElementById('shortPage').style.height =  heightDifference + "px";
  }
}



//On page load
shortPage();
serviceCalculator();
productCards();

var clock = document.getElementById('clock-time');
if (clock) {
  setClock('7:00am');
}



// if (window.innerWidth > 640) {
//   var frame = document.getElementById('fullVideo');
//   if (frame) {
//     videoControl();
//   }
// } else {
//   var frame = document.getElementById('fullVideoMobile');
//   if (frame) {
//     mobileVideoControl();
//   }
// }
// function videoControl() {
//   var vidsrc = 'http://player.vimeo.com/video/111085476?autoplay=1?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;api=1';
//   document.getElementById('closeVideo').addEventListener('click', function(e) {
//     // frame.setAttribute('src','');
//     player.api('pause');
//   });
//   document.getElementById('activateVideo').addEventListener('click', function(e) {
//     frame.setAttribute('src', vidsrc);
//   });
// }
// function mobileVideoControl() {
//   document.getElementById('activateMobileVideo').addEventListener('click', function(e) {
//     e.preventDefault();
//     // frame.classList.remove('invisible');
//     // frame.setAttribute('src', vidsrc);
//     // var player = $f(frame);
//     // player.api("play");
//   });
// }

//Animation
var animationControl = document.getElementById('lightingAnimation');
if (animationControl) {
  document.getElementById('schedule').addEventListener('click', function(e){
    var el = this;
    animationNavigation('7:00am', 'animationStage1', el);
  });
  document.getElementById('daylight').addEventListener('click', function(e){
    var el = this;
    animationNavigation('9:00am', 'animationStage2', el);
  });
  document.getElementById('occupancy').addEventListener('click', function(e){
    var el = this;
    animationNavigation('11:00am', 'animationStage3', el);
  });
  document.getElementById('dimming').addEventListener('click', function(e){
    var el = this;
    animationNavigation('1:00pm', 'animationStage4', el);
  });
  document.getElementById('demandResponse').addEventListener('click', function(e){
    var el = this;
    animationNavigation('3:00pm', 'animationStage5', el);
  });
  document.getElementById('dimmingControls').addEventListener('click', function(e){
    var el = this;
    animationNavigation('5:00pm', 'animationStage6', el);
  });
}

//On page scroll
document.getElementById('mainContentOuter').onscroll = function() {
  if (document.getElementById('homepage')) {
    var buttonIndicator = document.getElementById('activateVideo');
    if (buttonIndicator.getBoundingClientRect().bottom > 80) {
      document.getElementById('brand-header').classList.add('transparent-header');
      document.getElementById('headerCheech').classList.add('transparent-header');
    } else {
      document.getElementById('brand-header').classList.remove('transparent-header');
      document.getElementById('headerCheech').classList.remove('transparent-header');
    }
  }
};

//On window resize
window.onresize = function() {
  shortPage();
};





// // Test for lack of 100vh support
// var a = document.createElement('div');
// var b = document.createElement('div');

// // Add them to the body
// document.documentElement.appendChild(a);
// document.documentElement.appendChild(b);

// // The first div must be higher than the viewport
// a.setAttribute('style','height:2000em');
// // The second div just as high
// b.setAttribute('style','height:100vh');

// // wrap it all in a timeout, or it won't work
// var readyStateCheckInterval = setInterval(function() {
// 	if (document.readyState === "complete") {
// 	    // Add something, or it won't work
// 	    b.innerHTML = '1';
// 	    var dHeight = b.clientHeight - 69;
// 	    var bHeight = window.innerHeight;

// 	    // If 100vh is higher than the viewport, vh is not supported well
// 	    if (dHeight > bHeight) {
// 	        // add a class the HTML element for alternative styling
// 	        document.documentElement.classList.add('crazy-vh');
// 	    }
// 	    // Delete the elements
// 	    document.documentElement.removeChild(a);
// 	    document.documentElement.removeChild(b);
// 		clearInterval(readyStateCheckInterval);
// 	}
// }, 10);



//Height matching for form elements
// function setEqualHeight() {
//   $(".set-equal-height").each(function() {
//     var getHeight = $(this).find(".get-height"),
//         setHeight = $(this).find(".set-height");

//     setHeight.height(getHeight.outerHeight(true));
//   });
// }

// function formSubmittedHeight() {
//   var formHeight = $('#contactLightcloud .personal-details').outerHeight(true) + $('#contactLightcloud .submit').outerHeight(true);
//   $('#contactLightcloud').height(formHeight);
// }


// function init() {
//   setEqualHeight();
//   formSubmittedHeight();
// }

//Translate to JS
// $(".transitional-text h3").each(function() {
//   var wordArray = $(this).text().split(" ");
//   if (wordArray.length > 1) {
//     wordArray[wordArray.length-2] += "&nbsp;" + wordArray[wordArray.length-1];
//     wordArray.pop();
//     $(this).html(wordArray.join(" "));
//   }
// });

// $('a[href*=#]:not([href=#])').click(function() {
//   if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//     var target = $(this.hash);
//     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//     if (target.length) {
//       $('html,body').animate({
//         scrollTop: target.offset().top
//       }, 1000);
//       return false;
//     }
//   }
// });

// var clock = document.getElementById('clock-time');
// var CURRENT_TIME = null;
// var ITERATOR_COUNT = 5;
// var ANIMATION_DURATION = 75;

// function setClock(time) {
//   if (CURRENT_TIME) {
//     var currentTime = getMinutes(CURRENT_TIME);
//     var nextTime = getMinutes(time);
//     var diff = nextTime - currentTime;

//     var stepValue = Math.ceil(diff / ITERATOR_COUNT);


//     var tmpTime = currentTime;

//     var seq = Array.apply(null, new Array(ITERATOR_COUNT)).map(function(_, i) {
//       return get12Hour(currentTime + (i * stepValue));
//     });

//     seq.pop();
//     seq.push(time);

//     var animation = new animate(seq, stepValue);

//   }
//   else {
//     CURRENT_TIME = time;
//     clock.innerText = CURRENT_TIME;
//   }
// }

// function animate(seq, step) {
//   seq.forEach(function(time, i) {
//     setTimeout(function() {
//       clock.innerText = time;
//     }, i * step);
//   });
// }

// function get12Hour(time) {
//   var hours = Math.floor(time / 60);
//   var min = time % 60;
//   var meridian;

//   if (hours > 12) {
//     meridian = 'pm';
//     hours -= 12;
//   }
//   else {
//     meridian = 'am';
//   }

//   min = min < 10 ? '0' + min.toString() : min;

//   return hours + ':' + min + meridian;
// }

// function getMinutes(str) {
//   var time = str.match(/^(\d+):(\d+)(am|pm)$/);
//   var hours = parseInt(time[1], 10) + (time[3] === 'pm' ? 12 : 0);
//   var minutes = parseInt(time[2], 10);


//   return (60 * hours) + minutes;
// }
},{"./chromefix.js":2,"./formLogic.js":4,"./mobileAnimation.js":5,"./sidebarEffects.js":6,"./videoLogic.js":7}],2:[function(require,module,exports){
"use strict";


var agent = window.navigator.userAgent;

var isWebkit = /WebKit/.test(agent);
var isChrome = isWebkit && /Chrome/.test(agent);

if (isChrome) {
	document.documentElement.classList.add('chrome-fix');
}
},{}],3:[function(require,module,exports){
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

},{}],4:[function(require,module,exports){
var formLogic = (function() {

	function serviceViewForm() {
	  var stepOne   = document.getElementById('serviceStepOne'),
	      stepTwo   = document.getElementById('serviceStepTwo'),
	      stepThree = document.getElementById('serviceStepThree'),
	      sites     = document.getElementById('numberSites'),
	      circuits  = document.getElementById('numberCircuits'),
	      sensors   = document.getElementById('numberSensors');

	  document.getElementById('submissionSites').value    = sites.getElementsByTagName('input')[0].value;
	  document.getElementById('submissionCircuits').value = circuits.getElementsByTagName('input')[0].value;
	  document.getElementById('submissionSensors').value  = sensors.getElementsByTagName('input')[0].value;
	  stepTwo.classList.remove('hidden');
	  stepOne.classList.add('hidden');
	  sites.classList.remove('active');
	  circuits.classList.remove('active');
	  sensors.classList.remove('active');
	}

	function newsletterSignup() {
	  var signup = document.getElementById('signUpForNewsletter');
	  var signupHeight = signup.offsetHeight;
	  signup.classList.add('confirmation-text');
	  signup.innerHTML = '<h6>Thank you for your interest in Lightcloud.</h6><p>A lightcloud representative from RAB is reviewing your request and will follow up within the next 24-48 hours.</p>';
	  if (window.innerWidth >= 769) {
	    signup.style.height = signupHeight + 'px';
	  }
	}

	function contactForm() {
	  var contact = document.getElementById('contactLightcloud');
	  var contactHeight = contact.offsetHeight;
	  contact.classList.add('confirmation-text');
	  contact.innerHTML = '<h3>Thank you for your interest in Lightcloud.</h3><p>A lightcloud representative from RAB is reviewing your request and will follow up within the next 24-48 hours.</p>';
	  if (window.innerWidth >= 769) {
	    contact.style.height = contactHeight + 'px';
	  }
	}

	function validateFormOnSubmit(contact) {
	    reason = "";
	    reason += validateName(contact.name);
	    reason += validateEmail(contact.email);
	    reason += validatePhone(contact.phone);
	    if (reason.length > 0) {
	        return false;
	    } else {
	        var serviceForm     = document.getElementById('serviceContactSubmit');
	        serviceForm.setAttribute('disabled', 'disabled');
          serviceForm.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Please wait...';
          setTimeout(function(){document.getElementById('serviceStepTwo').classList.add('hidden');document.getElementById('serviceStepThree').classList.remove('hidden');}, 1000);
	    }
	}

	function validateFormOnSubmitFancy(contact) {
	    reason = "";
	    reason += validateNameFancy(contact.name);
	    reason += validateEmailFancy(contact.email);
	    reason += validatePhoneFancy(contact.phone);
	    if (reason.length > 0) {
	        return false;
	    } else {
	        var contactForm     = document.getElementById('contactSubmit');
	        if (contactForm) {
	        	contactForm.setAttribute('disabled', 'disabled');
	          contactForm.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Please wait...';
	          setTimeout(function(){submitFormAjax();}, 1000);
	        }
	    }
	}

	function validateNewsletterSignup(contact) {
	  reason = "";
	  reason += validateEmail(document.getElementById('newsletterForm').email);
	  var serviceForm     = document.getElementById('serviceContactSubmit');
	  if (reason.length > 0) {
	      return false;
	  } else {
	  	var newsletterButton = document.getElementById('submitNewsletterForm');
	  	newsletterButton.setAttribute('disabled', 'disabled');
	  	newsletterButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
	    setTimeout(function(){newsletterSignup();}, 1000);
	  }
	}

	function validateName(name) {
	    var error = "";

	    if (name.value === "") {
	        name.style.borderColor = '#d0002f';
	        error = "1";
	    } else {
	        name.style.borderColor = '#231f20';
	    }
	    return error;
	}

	function validateNameFancy(name) {
	    var error = "";
	    if (name.value === "") {
	        name.parentNode.style.borderColor   = '#d0002f';
	        name.nextElementSibling.style.color = '#d0002f';
	        error = "1";
	    } else {
	        name.parentNode.style.borderColor   = '#231f20';
	        name.nextElementSibling.style.color = '#282d32';
	    }
	    return error;
	}

	function trim(s) {
	    return s.replace(/^\s+|\s+$/, '');
	}

	function validateEmail(email) {
	    var error = "";
	    var temail = trim(email.value); // value of field with whitespace trimmed off
	    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;

	    if (email.value === "") {
	        email.style.borderColor = '#d0002f';
	        error = "2";
	    } else if (!emailFilter.test(temail)) { //test email for illegal characters
	        email.style.borderColor = '#d0002f';
	        error = "3";
	    }
	    else {
	        email.style.borderColor = '#231f20';
	    }
	    return error;
	}

	function validateEmailFancy(email) {
	    var error = "";
	    var temail = trim(email.value); // value of field with whitespace trimmed off
	    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;

	    if (email.value === "") {
	        email.parentNode.style.borderColor   = '#d0002f';
	        email.nextElementSibling.style.color = '#d0002f';
	        error = "2";
	    } else if (!emailFilter.test(temail)) { //test email for illegal characters
	        email.parentNode.style.borderColor   = '#d0002f';
	        email.nextElementSibling.style.color = '#282d32';
	        error = "3";
	    }
	    else {
	        email.parentNode.style.borderColor = '#231f20';
	    }
	    return error;
	}

	function validatePhone(phone) {
	    var error = "";
	    var stripped = phone.value.replace(/[\(\)\.\-\ ]/g, '');

	    if (phone.value === "") {
	        phone.style.borderColor = '#d0002f';
	        error = '6';
	    } else if (isNaN(parseInt(stripped))) {
	        error = "5";
	        phone.style.borderColor = '#d0002f';
	        
	    } else if (stripped.length < 10) {
	        error = "6";
	        phone.style.borderColor = '#d0002f';
	        
	    } else {
	        phone.style.borderColor = '#231f20';
	        
	    }
	    return error;
	}

	function validatePhoneFancy(phone) {
	    var error = "";
	    var stripped = phone.value.replace(/[\(\)\.\-\ ]/g, '');

	    if (phone.value === "") {
	        phone.parentNode.style.borderColor   = '#d0002f';
	        phone.nextElementSibling.style.color = '#d0002f';
	        error = '6';
	    } else if (isNaN(parseInt(stripped))) {
	        error = "5";
	        phone.parentNode.style.borderColor   = '#d0002f';
	        phone.nextElementSibling.style.color = '#d0002f';
	    } else if (stripped.length < 10) {
	        error = "6";
	        phone.parentNode.style.borderColor   = '#d0002f';
	        phone.nextElementSibling.style.color = '#d0002f';
	    } else {
	        phone.parentNode.style.borderColor   = '#231f20';
	        phone.nextElementSibling.style.color = '#282d32';
	    }
	    return error;
	}

	function submitFormAjax() {
	  contactForm();
	  // var xmlhttp= window.XMLHttpRequest ?
	  //     new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

	  // xmlhttp.onreadystatechange = function() {
	  //   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	  //     alert(xmlhttp.responseText); // Here is the response
	  //   }
	  // };

	  // var name = document.getElementById('contactName').innerHTML;
	  // var email = document.getElementById('contactEmail').innerHTML;
	  // var number = document.getElementById('contactPhone').innerHTML;


	  // xmlhttp.open("GET","form.php?name=" + name + "&nickname=" + nickname + "&email=" + email, + "&phone=" + phone + "&number=" + number + "&disclaimer=" + disclaimer, true);
	  // xmlhttp.send();
	}

	function initForms() {
		var newsletter = document.getElementById('newsletterForm');
	  if (newsletter) {
	    newsletter.addEventListener('submit', function(e) {
	      e.preventDefault();
	      validateNewsletterSignup();
	    });
	  }

	  var contactUs = document.getElementById('contactForm');
	  if (contactUs) {
	    contactUs.addEventListener('submit', function(e) {
	      e.preventDefault();
	      validateFormOnSubmitFancy(this);
	    });
	  }

	  var serviceForm = document.getElementById('serviceGetInTouch');
	  if (serviceForm) {
	    serviceForm.addEventListener('click', function(e) {
	      e.preventDefault();
	      serviceViewForm();
	    });
	    document.getElementById('serviceContactForm').addEventListener('submit', function(e) {
	      e.preventDefault();
	      validateFormOnSubmit(this);
	    });
	  }
	}

	initForms();

	//
	(function() {
	  // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	  if (!String.prototype.trim) {
	    (function() {
	      // Make sure we trim BOM and NBSP
	      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	      String.prototype.trim = function() {
	        return this.replace(rtrim, '');
	      };
	    })();
	  }

	  [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
	    // in case the input is already filled..
	    if( inputEl.value.trim() !== '' ) {
	      classie.add( inputEl.parentNode, 'input--filled' );
	    }

	    // events:
	    inputEl.addEventListener( 'focus', onInputFocus );
	    inputEl.addEventListener( 'blur', onInputBlur );
	  } );

	  [].slice.call( document.querySelectorAll( 'textarea.ta__field' ) ).forEach( function( taEl ) {
	    // in case the input is already filled..
	    if( taEl.value.trim() !== '' ) {
	      classie.add( taEl.parentNode, 'input--filled' );
	    }

	    // events:
	    taEl.addEventListener( 'focus', onInputFocus );
	    taEl.addEventListener( 'blur', onInputBlur );
	  } );

	  function onInputFocus( ev ) {
	    classie.add( ev.target.parentNode, 'input--filled' );
	  }

	  function onInputBlur( ev ) {
	    if( ev.target.value.trim() === '' ) {
	      classie.remove( ev.target.parentNode, 'input--filled' );
	    }
	  }
	})();


})();

},{}],5:[function(require,module,exports){
function phoneAnimationReplacement(el) {
  var schedule  = document.getElementById('schedule2');
  var daylight  = document.getElementById('daylight2');
  var occupancy = document.getElementById('occupancy2');
  var dimming   = document.getElementById('dimming2');
  var demand    = document.getElementById('demandResponse2');
  var controls  = document.getElementById('dimmingControls2');
  var text1     = document.getElementById('phoneAnimationText1');
  var text2     = document.getElementById('phoneAnimationText2');
  var text3     = document.getElementById('phoneAnimationText3');
  var texts     = document.querySelectorAll('.description-text');
  var individualTexts = document.querySelectorAll('.individual-descriptor-text');

  var clickSiblings = Array.prototype.filter.call(el.parentNode.children, function(child){
     return child !== el;
  });
  clickSiblings.forEach(function(sib){
    sib.classList.remove('active');
  });
  el.classList.add('active');

  for (var i = 0, len = texts.length; i < len; i++) {
    console.log(texts[i]);
    texts[i].classList.remove('active');
  }

  for (var i = 0, len = individualTexts.length; i < len; i++) {
    console.log(individualTexts[i]);
    individualTexts[i].classList.remove('active');
  }

  switch (el) {
    case schedule:
      console.log(3);
      text1.classList.add('active');
      document.getElementById('scheduleSupportText').classList.add('active');
      break;
    case daylight:
      console.log(4);
      text1.classList.add('active');
      document.getElementById('daylightSupportText').classList.add('active');
      break;
    case occupancy:
      console.log(5);
      text2.classList.add('active');
      document.getElementById('occupancySupportText').classList.add('active');
      break;
    case dimming:
      console.log(6);
      text2.classList.add('active');
      document.getElementById('dimmingSupportText').classList.add('active');
      break;
    case demand:
      console.log(7);
      text3.classList.add('active');
      document.getElementById('demandSupportText').classList.add('active');
      break;
    case controls:
      console.log(8);
      text3.classList.add('active');
      document.getElementById('controlsSupportText').classList.add('active');
      break;
  }
}

var animationReplacement = document.getElementById('phoneAnimationReplacement');
if (animationReplacement) {
  document.getElementById('schedule2').addEventListener('click', function(e){
    var el = this;
    phoneAnimationReplacement(el);
  });
  document.getElementById('daylight2').addEventListener('click', function(e){
    var el = this;
    phoneAnimationReplacement(el);
  });
  document.getElementById('occupancy2').addEventListener('click', function(e){
    var el = this;
    phoneAnimationReplacement(el);
  });
  document.getElementById('dimming2').addEventListener('click', function(e){
    var el = this;
    phoneAnimationReplacement(el);
  });
  document.getElementById('demandResponse2').addEventListener('click', function(e){
    var el = this;
    phoneAnimationReplacement(el);
  });
  document.getElementById('dimmingControls2').addEventListener('click', function(e){
    var el = this;
    phoneAnimationReplacement(el);
  });
}
},{}],6:[function(require,module,exports){
 require('./classie');
 var SidebarMenuEffects = (function() {

 	function hasParentClass(e, classname) {
		if(e === document) return false;
		if(window.classie.has(e, classname)) {
			return true;
		}
		return e.parentNode && hasParentClass(e.parentNode, classname);
	}

	// http://coveroverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	function init() {
		var container    = document.getElementById('outer-container'),
			  button       = document.getElementById('menuTrigger'),
			  closeButton  = document.getElementById('menuClose'),
			  windowHeight = window.innerHeight,
			  contentPush  = document.getElementById('contentPushManager'),
			  // event type (if mobile use touch events)
			  eventtype    = mobilecheck() ? 'touchstart' : 'click',
				resetMenu    = function() {
					window.classie.remove( container, 'sidebar-open');
				},
				bodyClickFn  = function(evt) {
					if(!hasParentClass(evt.target, 'sidebar')) {
						resetMenu();
						document.removeEventListener(eventtype, bodyClickFn);
					}
		};
		button.addEventListener(eventtype, function(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			container.className = 'outer-container'; // clear
			setTimeout( function() {
				window.classie.add(container, 'sidebar-open');
			}, 25 );
			document.addEventListener(eventtype, bodyClickFn);
		});
		closeButton.addEventListener(eventtype, function(ev) {
			ev.stopPropagation();
			ev.preventDefault();
			container.className = 'outer-container'; // clear
			setTimeout( function() {
				window.classie.remove(container, 'sidebar-open');
			}, 25 );
		});
	}

	init();

})();

},{"./classie":3}],7:[function(require,module,exports){
var froogaloop = require('vimeo-froogaloop');

document.addEventListener("DOMContentLoaded", function() {
  var vidsrc = 'http://player.vimeo.com/video/111085476?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;api=1';
  var frame = document.getElementById('fullVideo');
  if (frame) {
    frame.setAttribute('src', vidsrc);
    player = $f(frame);
    videoControl();
  }
});

function videoControl() {
  document.getElementById('closeVideo').addEventListener('click', function(e) {
    player.api('pause');
  });
  document.getElementById('activateVideo').addEventListener('click', function(e) {
    player.api('play');
  });
}

function mobileVideoControl() {
  document.getElementById('activateMobileVideo').addEventListener('click', function(e) {
    e.preventDefault();
    frame.classList.remove('invisible');
    frame.setAttribute('src', vidsrc);
    var player = $f(frame);
    player.api("play");
  });
}
},{"vimeo-froogaloop":8}],8:[function(require,module,exports){
// Init style shamelessly stolen from jQuery http://jquery.com
var Froogaloop = (function(){
    // Define a local copy of Froogaloop
    function Froogaloop(iframe) {
        // The Froogaloop object is actually just the init constructor
        return new Froogaloop.fn.init(iframe);
    }

    var eventCallbacks = {},
        hasWindowEvent = false,
        isReady = false,
        slice = Array.prototype.slice,
        playerDomain = '';

    Froogaloop.fn = Froogaloop.prototype = {
        element: null,

        init: function(iframe) {
            if (typeof iframe === "string") {
                iframe = document.getElementById(iframe);
            }

            this.element = iframe;

            // Register message event listeners
            playerDomain = getDomainFromUrl(this.element.getAttribute('src'));

            return this;
        },

        /*
         * Calls a function to act upon the player.
         *
         * @param {string} method The name of the Javascript API method to call. Eg: 'play'.
         * @param {Array|Function} valueOrCallback params Array of parameters to pass when calling an API method
         *                                or callback function when the method returns a value.
         */
        api: function(method, valueOrCallback) {
            if (!this.element || !method) {
                return false;
            }

            var self = this,
                element = self.element,
                target_id = element.id !== '' ? element.id : null,
                params = !isFunction(valueOrCallback) ? valueOrCallback : null,
                callback = isFunction(valueOrCallback) ? valueOrCallback : null;

            // Store the callback for get functions
            if (callback) {
                storeCallback(method, callback, target_id);
            }

            postMessage(method, params, element);
            return self;
        },

        /*
         * Registers an event listener and a callback function that gets called when the event fires.
         *
         * @param eventName (String): Name of the event to listen for.
         * @param callback (Function): Function that should be called when the event fires.
         */
        addEvent: function(eventName, callback) {
            if (!this.element) {
                return false;
            }

            var self = this,
                element = self.element,
                target_id = element.id !== '' ? element.id : null;


            storeCallback(eventName, callback, target_id);

            // The ready event is not registered via postMessage. It fires regardless.
            if (eventName != 'ready') {
                postMessage('addEventListener', eventName, element);
            }
            else if (eventName == 'ready' && isReady) {
                callback.call(null, target_id);
            }

            return self;
        },

        /*
         * Unregisters an event listener that gets called when the event fires.
         *
         * @param eventName (String): Name of the event to stop listening for.
         */
        removeEvent: function(eventName) {
            if (!this.element) {
                return false;
            }

            var self = this,
                element = self.element,
                target_id = element.id !== '' ? element.id : null,
                removed = removeCallback(eventName, target_id);

            // The ready event is not registered
            if (eventName != 'ready' && removed) {
                postMessage('removeEventListener', eventName, element);
            }
        }
    };

    /**
     * Handles posting a message to the parent window.
     *
     * @param method (String): name of the method to call inside the player. For api calls
     * this is the name of the api method (api_play or api_pause) while for events this method
     * is api_addEventListener.
     * @param params (Object or Array): List of parameters to submit to the method. Can be either
     * a single param or an array list of parameters.
     * @param target (HTMLElement): Target iframe to post the message to.
     */
    function postMessage(method, params, target) {
        if (!target.contentWindow.postMessage) {
            return false;
        }

        var url = target.getAttribute('src').split('?')[0],
            data = JSON.stringify({
                method: method,
                value: params
            });

        if (url.substr(0, 2) === '//') {
            url = window.location.protocol + url;
        }

        target.contentWindow.postMessage(data, url);
    }

    /**
     * Event that fires whenever the window receives a message from its parent
     * via window.postMessage.
     */
    function onMessageReceived(event) {
        var data, method;

        try {
            data = JSON.parse(event.data);
            method = data.event || data.method;
        }
        catch(e)  {
            //fail silently... like a ninja!
        }

        if (method == 'ready' && !isReady) {
            isReady = true;
        }

        // Handles messages from moogaloop only
        if (event.origin != playerDomain) {
            return false;
        }

        var value = data.value,
            eventData = data.data,
            target_id = target_id === '' ? null : data.player_id,

            callback = getCallback(method, target_id),
            params = [];

        if (!callback) {
            return false;
        }

        if (value !== undefined) {
            params.push(value);
        }

        if (eventData) {
            params.push(eventData);
        }

        if (target_id) {
            params.push(target_id);
        }

        return params.length > 0 ? callback.apply(null, params) : callback.call();
    }


    /**
     * Stores submitted callbacks for each iframe being tracked and each
     * event for that iframe.
     *
     * @param eventName (String): Name of the event. Eg. api_onPlay
     * @param callback (Function): Function that should get executed when the
     * event is fired.
     * @param target_id (String) [Optional]: If handling more than one iframe then
     * it stores the different callbacks for different iframes based on the iframe's
     * id.
     */
    function storeCallback(eventName, callback, target_id) {
        if (target_id) {
            if (!eventCallbacks[target_id]) {
                eventCallbacks[target_id] = {};
            }
            eventCallbacks[target_id][eventName] = callback;
        }
        else {
            eventCallbacks[eventName] = callback;
        }
    }

    /**
     * Retrieves stored callbacks.
     */
    function getCallback(eventName, target_id) {
        if (target_id) {
            return eventCallbacks[target_id][eventName];
        }
        else {
            return eventCallbacks[eventName];
        }
    }

    function removeCallback(eventName, target_id) {
        if (target_id && eventCallbacks[target_id]) {
            if (!eventCallbacks[target_id][eventName]) {
                return false;
            }
            eventCallbacks[target_id][eventName] = null;
        }
        else {
            if (!eventCallbacks[eventName]) {
                return false;
            }
            eventCallbacks[eventName] = null;
        }

        return true;
    }

    /**
     * Returns a domain's root domain.
     * Eg. returns http://vimeo.com when http://vimeo.com/channels is sbumitted
     *
     * @param url (String): Url to test against.
     * @return url (String): Root domain of submitted url
     */
    function getDomainFromUrl(url) {
        if (url.substr(0, 2) === '//') {
            url = window.location.protocol + url;
        }

        var url_pieces = url.split('/'),
            domain_str = '';

        for(var i = 0, length = url_pieces.length; i < length; i++) {
            if(i<3) {domain_str += url_pieces[i];}
            else {break;}
            if(i<2) {domain_str += '/';}
        }

        return domain_str;
    }

    function isFunction(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }

    function isArray(obj) {
        return toString.call(obj) === '[object Array]';
    }

    // Give the init function the Froogaloop prototype for later instantiation
    Froogaloop.fn.init.prototype = Froogaloop.fn;

    // Listens for the message event.
    // W3C
    if (window.addEventListener) {
        window.addEventListener('message', onMessageReceived, false);
    }
    // IE
    else {
        window.attachEvent('onmessage', onMessageReceived);
    }

    // Expose froogaloop to the global object
    return (window.Froogaloop = window.$f = Froogaloop);

})();

},{}]},{},[1]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJidW5kbGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGNocm9tZWZpeCAgICAgICA9IHJlcXVpcmUoJy4vY2hyb21lZml4LmpzJyk7XG52YXIgc2lkZWJhciAgICAgICAgID0gcmVxdWlyZSgnLi9zaWRlYmFyRWZmZWN0cy5qcycpO1xudmFyIGZvcm1zICAgICAgICAgICA9IHJlcXVpcmUoJy4vZm9ybUxvZ2ljLmpzJyk7XG52YXIgdmlkZW8gICAgICAgICAgID0gcmVxdWlyZSgnLi92aWRlb0xvZ2ljLmpzJyk7XG52YXIgbW9iaWxlQW5pbWF0aW9uID0gcmVxdWlyZSgnLi9tb2JpbGVBbmltYXRpb24uanMnKTtcblxuLy9Ib21lIFBhZ2UgRnVuY3Rpb25zXG5mdW5jdGlvbiBzZXRDbG9jayh0aW1lKSB7XG4gIGNsb2NrLmlubmVyVGV4dCA9IHRpbWU7XG59XG5cbmZ1bmN0aW9uIGFuaW1hdGlvbk5hdmlnYXRpb24oc2V0VGltZSwgdGhpc0NsYXNzLCBlbCkge1xuICB2YXIgZnVsbENsYXNzTGlzdCA9IFsnYW5pbWF0aW9uU3RhZ2UxJywgJ2FuaW1hdGlvblN0YWdlMicsICdhbmltYXRpb25TdGFnZTMnLCAnYW5pbWF0aW9uU3RhZ2U0JywgJ2FuaW1hdGlvblN0YWdlNScsICdhbmltYXRpb25TdGFnZTYnXTtcbiAgdmFyIHRoaXNDbGFzc0luZGV4ID0gZnVsbENsYXNzTGlzdC5pbmRleE9mKHRoaXNDbGFzcyk7XG4gIGlmICh0aGlzQ2xhc3NJbmRleCA+IC0xKSB7XG4gICAgZnVsbENsYXNzTGlzdC5zcGxpY2UodGhpc0NsYXNzSW5kZXgsIDEpO1xuICB9XG4gXG4gIHNldENsb2NrKHNldFRpbWUpO1xuXG4gIHZhciBjbGlja1NpYmxpbmdzID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsLnBhcmVudE5vZGUuY2hpbGRyZW4sIGZ1bmN0aW9uKGNoaWxkKXtcbiAgICAgcmV0dXJuIGNoaWxkICE9PSBlbDtcbiAgfSk7XG4gIGNsaWNrU2libGluZ3MuZm9yRWFjaChmdW5jdGlvbihzaWIpe1xuICAgIHNpYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgfSk7XG4gIGVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuXG4gIGlmICghYW5pbWF0aW9uQ29udHJvbC5jbGFzc0xpc3QuY29udGFpbnModGhpc0NsYXNzKSkge1xuICAgIGFuaW1hdGlvbkNvbnRyb2wuY2xhc3NMaXN0LmFkZCh0aGlzQ2xhc3MpO1xuICB9XG4gIGFuaW1hdGlvbkNvbnRyb2wuY2xhc3NMaXN0LnJlbW92ZShmdWxsQ2xhc3NMaXN0WzBdLCBmdWxsQ2xhc3NMaXN0WzFdLCBmdWxsQ2xhc3NMaXN0WzJdLCBmdWxsQ2xhc3NMaXN0WzNdLCBmdWxsQ2xhc3NMaXN0WzRdKTtcbn1cblxuLy9TZXJ2aWNlIFBhZ2UgRnVuY3Rpb25zXG5mdW5jdGlvbiBzZXJ2aWNlQ2FsY3VsYXRvcigpIHtcbiAgY2FsY3VsYXRvciAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXJ2aWNlQ2FsY3VsYXRvcicpO1xuICBpZiAoY2FsY3VsYXRvcikge1xuICAgIHZhciByZXN1bHQgICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGN1bGF0b3JGaW5hbFJlc3VsdCcpO1xuICAgIHZhciBmb3JtUmVzdWx0ICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1GaW5hbFJlc3VsdCcpO1xuICAgIHZhciBzaXRlcyAgICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251bWJlclNpdGVzJyk7XG4gICAgdmFyIGNpcmN1aXRzICAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVtYmVyQ2lyY3VpdHMnKTtcbiAgICB2YXIgc2Vuc29ycyAgICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudW1iZXJTZW5zb3JzJyk7XG4gICAgdmFyIGlucHV0cyAgICAgICAgPSBbc2l0ZXMsIGNpcmN1aXRzLCBzZW5zb3JzXTtcbiAgICB2YXIgc2l0ZXNWYWx1ZSAgICA9IDE7XG4gICAgdmFyIGNpcmN1aXRzVmFsdWUgPSAwO1xuICAgIHZhciBzZW5zb3JzVmFsdWUgID0gMDtcblxuICAgIHZhciBjYWxjdWxhdGVSZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpc05hTihwYXJzZUludChzaXRlc1ZhbHVlKSkpIHtcbiAgICAgICAgc2l0ZXNWYWx1ZSA9IDA7XG4gICAgICB9IGVsc2UgaWYgKGlzTmFOKHBhcnNlSW50KGNpcmN1aXRzVmFsdWUpKSkge1xuICAgICAgICBjaXJjdWl0c1ZhbHVlID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoaXNOYU4ocGFyc2VJbnQoc2Vuc29yc1ZhbHVlKSkpIHtcbiAgICAgICAgc2Vuc29yc1ZhbHVlID0gMDtcbiAgICAgIH1cblxuICAgICAgdG90YWxDb3N0ID0gKHBhcnNlSW50KHNpdGVzVmFsdWUpICogMjApICsgKHBhcnNlSW50KGNpcmN1aXRzVmFsdWUpICogMikgKyAocGFyc2VJbnQoc2Vuc29yc1ZhbHVlKSAqIDIpO1xuXG4gICAgICBpZiAoKChwYXJzZUludChjaXJjdWl0c1ZhbHVlKSkgKyAocGFyc2VJbnQoc2Vuc29yc1ZhbHVlKSkgPiAyMDApIHx8IHRvdGFsQ29zdCA+IDk5OTkpIHtcbiAgICAgICAgcmVzdWx0LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGUtY2FsY3VsYXRpb24nKTtcbiAgICAgICAgcmVzdWx0LmNsYXNzTGlzdC5yZW1vdmUoJ2xnLW51bWJlcicpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpY2UtcGVyJykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgIHJlc3VsdC50ZXh0Q29udGVudCA9ICdQbGVhc2UgY29udGFjdCB1cyB0b2RheSBmb3IgYSBjdXN0b21pemVkIGVzdGltYXRlLic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZS1jYWxjdWxhdGlvbicpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpY2UtcGVyJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIGlmICh0b3RhbENvc3QgPiA5OTkpIHtcbiAgICAgICAgICByZXN1bHQuY2xhc3NMaXN0LmFkZCgnbGctbnVtYmVyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0LmNsYXNzTGlzdC5yZW1vdmUoJ2xnLW51bWJlcicpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC50ZXh0Q29udGVudCA9ICckJyArIHRvdGFsQ29zdDtcbiAgICAgICAgZm9ybVJlc3VsdC50ZXh0Q29udGVudCA9ICckJyArIHRvdGFsQ29zdDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGluY3JlbWVudENvdW50ZXIgPSBmdW5jdGlvbih0aGlzRWxlbWVudCwgZWwpIHtcbiAgICAgIHZhciBpbnB1dHMgPSBbc2l0ZXMsIGNpcmN1aXRzLCBzZW5zb3JzXTtcbiAgICAgIHZhciB0aGlzRWxlbWVudEluZGV4ID0gaW5wdXRzLmluZGV4T2YodGhpc0VsZW1lbnQpO1xuICAgICAgaWYgKHRoaXNFbGVtZW50SW5kZXggPiAtMSkge1xuICAgICAgICBpbnB1dHMuc3BsaWNlKHRoaXNFbGVtZW50SW5kZXgsIDEpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVsLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgIGlucHV0c1swXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgaW5wdXRzWzFdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICBlbC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgICB0aGlzRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXS52YWx1ZSA9IHBhcnNlSW50KHRoaXNFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdLnZhbHVlKSArIDE7XG5cbiAgICAgIGlmICh0aGlzRWxlbWVudCA9PT0gc2l0ZXMpIHtcbiAgICAgICAgc2l0ZXNWYWx1ZSAgICA9IHNpdGVzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdLnZhbHVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzRWxlbWVudCA9PT0gY2lyY3VpdHMpIHtcbiAgICAgICAgY2lyY3VpdHNWYWx1ZSA9IGNpcmN1aXRzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdLnZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Vuc29yc1ZhbHVlICA9IHNlbnNvcnMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF0udmFsdWU7XG4gICAgICB9XG4gICAgICBjYWxjdWxhdGVSZXN1bHQoKTtcbiAgICB9O1xuXG4gICAgdmFyIGRlY3JlbWVudENvdW50ZXIgPSBmdW5jdGlvbih0aGlzRWxlbWVudCwgZWwpIHtcbiAgICAgIHZhciBpbnB1dHMgPSBbc2l0ZXMsIGNpcmN1aXRzLCBzZW5zb3JzXTtcbiAgICAgIHZhciB0aGlzRWxlbWVudEluZGV4ID0gaW5wdXRzLmluZGV4T2YodGhpc0VsZW1lbnQpO1xuICAgICAgaWYgKHRoaXNFbGVtZW50SW5kZXggPiAtMSkge1xuICAgICAgICBpbnB1dHMuc3BsaWNlKHRoaXNFbGVtZW50SW5kZXgsIDEpO1xuICAgICAgfVxuICAgICAgaWYgKCFlbC5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICBpbnB1dHNbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIGlucHV0c1sxXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcnNlSW50KHRoaXNFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdLnZhbHVlKSA+IDEpIHtcbiAgICAgICAgdGhpc0VsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF0udmFsdWUgPSBwYXJzZUludCh0aGlzRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXS52YWx1ZSkgLSAxO1xuICAgICAgICBpZiAodGhpc0VsZW1lbnQgPT09IHNpdGVzKSB7XG4gICAgICAgICAgc2l0ZXNWYWx1ZSAgICA9IHNpdGVzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdLnZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXNFbGVtZW50ID09PSBjaXJjdWl0cykge1xuICAgICAgICAgIGNpcmN1aXRzVmFsdWUgPSBjaXJjdWl0cy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZW5zb3JzVmFsdWUgID0gc2Vuc29ycy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYWxjdWxhdGVSZXN1bHQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGFjdGl2ZVN0YXRlID0gZnVuY3Rpb24oZWwpIHtcbiAgICAgIHZhciBjbGlja1NpYmxpbmdzID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsLnBhcmVudE5vZGUuY2hpbGRyZW4sIGZ1bmN0aW9uKGNoaWxkKXtcbiAgICAgICAgIHJldHVybiBjaGlsZCAhPT0gZWw7XG4gICAgICB9KTtcbiAgICAgIGlmICghZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICBjbGlja1NpYmxpbmdzLmZvckVhY2goZnVuY3Rpb24oc2liKXtcbiAgICAgICAgICBzaWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2l0ZXMuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICBzaXRlc1ZhbHVlICAgID0gc2l0ZXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF0udmFsdWU7XG4gICAgICBjYWxjdWxhdGVSZXN1bHQoKTtcbiAgICB9KTtcbiAgICBzaXRlcy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmICghdGhpcy5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICBjaXJjdWl0cy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgc2Vuc29ycy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc2l0ZXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBlbCA9IHRoaXM7XG4gICAgICBhY3RpdmVTdGF0ZShlbCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251bWJlclNpdGVzVXAnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGVsID0gdGhpcztcbiAgICAgIGluY3JlbWVudENvdW50ZXIoc2l0ZXMsIGVsKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVtYmVyU2l0ZXNEb3duJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBlbCA9IHRoaXM7XG4gICAgICBkZWNyZW1lbnRDb3VudGVyKHNpdGVzLCBlbCk7XG4gICAgfSk7XG5cbiAgICBjaXJjdWl0cy5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNpcmN1aXRzVmFsdWUgPSBjaXJjdWl0cy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXS52YWx1ZTtcbiAgICAgIGNhbGN1bGF0ZVJlc3VsdCgpO1xuICAgIH0pO1xuICAgIGNpcmN1aXRzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKCF0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgIHNpdGVzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICBzZW5zb3JzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjaXJjdWl0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGVsID0gdGhpcztcbiAgICAgIGFjdGl2ZVN0YXRlKGVsKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVtYmVyQ2lyY3VpdHNVcCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgZWwgPSB0aGlzO1xuICAgICAgaW5jcmVtZW50Q291bnRlcihjaXJjdWl0cywgZWwpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudW1iZXJDaXJjdWl0c0Rvd24nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGVsID0gdGhpcztcbiAgICAgIGRlY3JlbWVudENvdW50ZXIoY2lyY3VpdHMsIGVsKTtcbiAgICB9KTtcblxuICAgIHNlbnNvcnMuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICBzZW5zb3JzVmFsdWUgID0gc2Vuc29ycy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXS52YWx1ZTtcbiAgICAgIGNhbGN1bGF0ZVJlc3VsdCgpO1xuICAgIH0pO1xuICAgIHNlbnNvcnMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JylbMF0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoIXRoaXMucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgY2lyY3VpdHMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIHNpdGVzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZW5zb3JzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgZWwgPSB0aGlzO1xuICAgICAgYWN0aXZlU3RhdGUoZWwpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudW1iZXJTZW5zb3JzVXAnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGVsID0gdGhpcztcbiAgICAgIGluY3JlbWVudENvdW50ZXIoc2Vuc29ycywgZWwpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudW1iZXJTZW5zb3JzRG93bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB2YXIgZWwgPSB0aGlzO1xuICAgICAgZGVjcmVtZW50Q291bnRlcihzZW5zb3JzLCBlbCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gZnVuY3Rpb24gZm9ybWZvY3VzKCkge1xuLy8gIHZhciBmb2N1c0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251bWJlclNpdGVzSW5wdXQnKTtcbi8vICBpZiAoZm9jdXNJbnB1dCkge1xuLy8gICAgZm9jdXNJbnB1dC5mb2N1cygpO1xuLy8gIH1cbi8vIH1cblxuLy9Qcm9kdWN0IFBhZ2UgRnVuY3Rpb25zXG5mdW5jdGlvbiBwcm9kdWN0Q2FyZHMoKSB7XG4gIHZhciBwcm9kdWN0cyAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJvZHVjdC1jYXJkJyk7XG4gIHZhciBwcm9kdWN0Q2FyZEZsaXAgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJkLWZsaXAnKSkge1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdjYXJkLWZsaXAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdjYXJkLWZsaXAnKTtcbiAgICB9XG4gIH07XG5cbiAgZm9yICh2YXIgaT0wOyBpPHByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgcHJvZHVjdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9kdWN0Q2FyZEZsaXAsIGZhbHNlKTtcbiAgfVxufVxuXG4vL0NvbnRhY3QgUGFnZSBGdW5jdGlvbnNcbmZ1bmN0aW9uIHNob3J0UGFnZSgpIHtcbiAgdmFyIG91dGVyU2NyZWVuSGVpZ2h0ICA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0ub2Zmc2V0SGVpZ2h0O1xuICB2YXIgaW5uZXJDb250ZW50SGVpZ2h0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHktY29udGVudCcpLm9mZnNldEhlaWdodDtcbiAgdmFyIGZvb3RlckhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluRm9vdGVyJykub2Zmc2V0SGVpZ2h0O1xuICBpZiAoaW5uZXJDb250ZW50SGVpZ2h0IDwgb3V0ZXJTY3JlZW5IZWlnaHQpIHtcbiAgICB2YXIgaGVpZ2h0RGlmZmVyZW5jZSA9IG91dGVyU2NyZWVuSGVpZ2h0IC0gKGlubmVyQ29udGVudEhlaWdodCArIGZvb3RlckhlaWdodCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3J0UGFnZScpLnN0eWxlLmhlaWdodCA9ICBoZWlnaHREaWZmZXJlbmNlICsgXCJweFwiO1xuICB9XG59XG5cblxuXG4vL09uIHBhZ2UgbG9hZFxuc2hvcnRQYWdlKCk7XG5zZXJ2aWNlQ2FsY3VsYXRvcigpO1xucHJvZHVjdENhcmRzKCk7XG5cbnZhciBjbG9jayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9jay10aW1lJyk7XG5pZiAoY2xvY2spIHtcbiAgc2V0Q2xvY2soJzc6MDBhbScpO1xufVxuXG5cblxuLy8gaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNjQwKSB7XG4vLyAgIHZhciBmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmdWxsVmlkZW8nKTtcbi8vICAgaWYgKGZyYW1lKSB7XG4vLyAgICAgdmlkZW9Db250cm9sKCk7XG4vLyAgIH1cbi8vIH0gZWxzZSB7XG4vLyAgIHZhciBmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmdWxsVmlkZW9Nb2JpbGUnKTtcbi8vICAgaWYgKGZyYW1lKSB7XG4vLyAgICAgbW9iaWxlVmlkZW9Db250cm9sKCk7XG4vLyAgIH1cbi8vIH1cbi8vIGZ1bmN0aW9uIHZpZGVvQ29udHJvbCgpIHtcbi8vICAgdmFyIHZpZHNyYyA9ICdodHRwOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8xMTEwODU0NzY/YXV0b3BsYXk9MT90aXRsZT0wJmFtcDtieWxpbmU9MCZhbXA7cG9ydHJhaXQ9MCZhbXA7Y29sb3I9ZmZmZmZmJmFtcDthcGk9MSc7XG4vLyAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVZpZGVvJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4vLyAgICAgLy8gZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCcnKTtcbi8vICAgICBwbGF5ZXIuYXBpKCdwYXVzZScpO1xuLy8gICB9KTtcbi8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjdGl2YXRlVmlkZW8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbi8vICAgICBmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZpZHNyYyk7XG4vLyAgIH0pO1xuLy8gfVxuLy8gZnVuY3Rpb24gbW9iaWxlVmlkZW9Db250cm9sKCkge1xuLy8gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWN0aXZhdGVNb2JpbGVWaWRlbycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcbi8vICAgICAvLyBmcmFtZS5jbGFzc0xpc3QucmVtb3ZlKCdpbnZpc2libGUnKTtcbi8vICAgICAvLyBmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZpZHNyYyk7XG4vLyAgICAgLy8gdmFyIHBsYXllciA9ICRmKGZyYW1lKTtcbi8vICAgICAvLyBwbGF5ZXIuYXBpKFwicGxheVwiKTtcbi8vICAgfSk7XG4vLyB9XG5cbi8vQW5pbWF0aW9uXG52YXIgYW5pbWF0aW9uQ29udHJvbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaWdodGluZ0FuaW1hdGlvbicpO1xuaWYgKGFuaW1hdGlvbkNvbnRyb2wpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjaGVkdWxlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICB2YXIgZWwgPSB0aGlzO1xuICAgIGFuaW1hdGlvbk5hdmlnYXRpb24oJzc6MDBhbScsICdhbmltYXRpb25TdGFnZTEnLCBlbCk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF5bGlnaHQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIHZhciBlbCA9IHRoaXM7XG4gICAgYW5pbWF0aW9uTmF2aWdhdGlvbignOTowMGFtJywgJ2FuaW1hdGlvblN0YWdlMicsIGVsKTtcbiAgfSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvY2N1cGFuY3knKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIHZhciBlbCA9IHRoaXM7XG4gICAgYW5pbWF0aW9uTmF2aWdhdGlvbignMTE6MDBhbScsICdhbmltYXRpb25TdGFnZTMnLCBlbCk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGltbWluZycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgdmFyIGVsID0gdGhpcztcbiAgICBhbmltYXRpb25OYXZpZ2F0aW9uKCcxOjAwcG0nLCAnYW5pbWF0aW9uU3RhZ2U0JywgZWwpO1xuICB9KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbWFuZFJlc3BvbnNlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICB2YXIgZWwgPSB0aGlzO1xuICAgIGFuaW1hdGlvbk5hdmlnYXRpb24oJzM6MDBwbScsICdhbmltYXRpb25TdGFnZTUnLCBlbCk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGltbWluZ0NvbnRyb2xzJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICB2YXIgZWwgPSB0aGlzO1xuICAgIGFuaW1hdGlvbk5hdmlnYXRpb24oJzU6MDBwbScsICdhbmltYXRpb25TdGFnZTYnLCBlbCk7XG4gIH0pO1xufVxuXG4vL09uIHBhZ2Ugc2Nyb2xsXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbkNvbnRlbnRPdXRlcicpLm9uc2Nyb2xsID0gZnVuY3Rpb24oKSB7XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG9tZXBhZ2UnKSkge1xuICAgIHZhciBidXR0b25JbmRpY2F0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWN0aXZhdGVWaWRlbycpO1xuICAgIGlmIChidXR0b25JbmRpY2F0b3IuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuYm90dG9tID4gODApIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdicmFuZC1oZWFkZXInKS5jbGFzc0xpc3QuYWRkKCd0cmFuc3BhcmVudC1oZWFkZXInKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXJDaGVlY2gnKS5jbGFzc0xpc3QuYWRkKCd0cmFuc3BhcmVudC1oZWFkZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JyYW5kLWhlYWRlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zcGFyZW50LWhlYWRlcicpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlckNoZWVjaCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zcGFyZW50LWhlYWRlcicpO1xuICAgIH1cbiAgfVxufTtcblxuLy9PbiB3aW5kb3cgcmVzaXplXG53aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgc2hvcnRQYWdlKCk7XG59O1xuXG5cblxuXG5cbi8vIC8vIFRlc3QgZm9yIGxhY2sgb2YgMTAwdmggc3VwcG9ydFxuLy8gdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbi8vIHZhciBiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbi8vIC8vIEFkZCB0aGVtIHRvIHRoZSBib2R5XG4vLyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoYSk7XG4vLyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoYik7XG5cbi8vIC8vIFRoZSBmaXJzdCBkaXYgbXVzdCBiZSBoaWdoZXIgdGhhbiB0aGUgdmlld3BvcnRcbi8vIGEuc2V0QXR0cmlidXRlKCdzdHlsZScsJ2hlaWdodDoyMDAwZW0nKTtcbi8vIC8vIFRoZSBzZWNvbmQgZGl2IGp1c3QgYXMgaGlnaFxuLy8gYi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnaGVpZ2h0OjEwMHZoJyk7XG5cbi8vIC8vIHdyYXAgaXQgYWxsIGluIGEgdGltZW91dCwgb3IgaXQgd29uJ3Qgd29ya1xuLy8gdmFyIHJlYWR5U3RhdGVDaGVja0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4vLyBcdGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbi8vIFx0ICAgIC8vIEFkZCBzb21ldGhpbmcsIG9yIGl0IHdvbid0IHdvcmtcbi8vIFx0ICAgIGIuaW5uZXJIVE1MID0gJzEnO1xuLy8gXHQgICAgdmFyIGRIZWlnaHQgPSBiLmNsaWVudEhlaWdodCAtIDY5O1xuLy8gXHQgICAgdmFyIGJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbi8vIFx0ICAgIC8vIElmIDEwMHZoIGlzIGhpZ2hlciB0aGFuIHRoZSB2aWV3cG9ydCwgdmggaXMgbm90IHN1cHBvcnRlZCB3ZWxsXG4vLyBcdCAgICBpZiAoZEhlaWdodCA+IGJIZWlnaHQpIHtcbi8vIFx0ICAgICAgICAvLyBhZGQgYSBjbGFzcyB0aGUgSFRNTCBlbGVtZW50IGZvciBhbHRlcm5hdGl2ZSBzdHlsaW5nXG4vLyBcdCAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NyYXp5LXZoJyk7XG4vLyBcdCAgICB9XG4vLyBcdCAgICAvLyBEZWxldGUgdGhlIGVsZW1lbnRzXG4vLyBcdCAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoYSk7XG4vLyBcdCAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoYik7XG4vLyBcdFx0Y2xlYXJJbnRlcnZhbChyZWFkeVN0YXRlQ2hlY2tJbnRlcnZhbCk7XG4vLyBcdH1cbi8vIH0sIDEwKTtcblxuXG5cbi8vSGVpZ2h0IG1hdGNoaW5nIGZvciBmb3JtIGVsZW1lbnRzXG4vLyBmdW5jdGlvbiBzZXRFcXVhbEhlaWdodCgpIHtcbi8vICAgJChcIi5zZXQtZXF1YWwtaGVpZ2h0XCIpLmVhY2goZnVuY3Rpb24oKSB7XG4vLyAgICAgdmFyIGdldEhlaWdodCA9ICQodGhpcykuZmluZChcIi5nZXQtaGVpZ2h0XCIpLFxuLy8gICAgICAgICBzZXRIZWlnaHQgPSAkKHRoaXMpLmZpbmQoXCIuc2V0LWhlaWdodFwiKTtcblxuLy8gICAgIHNldEhlaWdodC5oZWlnaHQoZ2V0SGVpZ2h0Lm91dGVySGVpZ2h0KHRydWUpKTtcbi8vICAgfSk7XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGZvcm1TdWJtaXR0ZWRIZWlnaHQoKSB7XG4vLyAgIHZhciBmb3JtSGVpZ2h0ID0gJCgnI2NvbnRhY3RMaWdodGNsb3VkIC5wZXJzb25hbC1kZXRhaWxzJykub3V0ZXJIZWlnaHQodHJ1ZSkgKyAkKCcjY29udGFjdExpZ2h0Y2xvdWQgLnN1Ym1pdCcpLm91dGVySGVpZ2h0KHRydWUpO1xuLy8gICAkKCcjY29udGFjdExpZ2h0Y2xvdWQnKS5oZWlnaHQoZm9ybUhlaWdodCk7XG4vLyB9XG5cblxuLy8gZnVuY3Rpb24gaW5pdCgpIHtcbi8vICAgc2V0RXF1YWxIZWlnaHQoKTtcbi8vICAgZm9ybVN1Ym1pdHRlZEhlaWdodCgpO1xuLy8gfVxuXG4vL1RyYW5zbGF0ZSB0byBKU1xuLy8gJChcIi50cmFuc2l0aW9uYWwtdGV4dCBoM1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xuLy8gICB2YXIgd29yZEFycmF5ID0gJCh0aGlzKS50ZXh0KCkuc3BsaXQoXCIgXCIpO1xuLy8gICBpZiAod29yZEFycmF5Lmxlbmd0aCA+IDEpIHtcbi8vICAgICB3b3JkQXJyYXlbd29yZEFycmF5Lmxlbmd0aC0yXSArPSBcIiZuYnNwO1wiICsgd29yZEFycmF5W3dvcmRBcnJheS5sZW5ndGgtMV07XG4vLyAgICAgd29yZEFycmF5LnBvcCgpO1xuLy8gICAgICQodGhpcykuaHRtbCh3b3JkQXJyYXkuam9pbihcIiBcIikpO1xuLy8gICB9XG4vLyB9KTtcblxuLy8gJCgnYVtocmVmKj0jXTpub3QoW2hyZWY9I10pJykuY2xpY2soZnVuY3Rpb24oKSB7XG4vLyAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuLy8gICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4vLyAgICAgdGFyZ2V0ID0gdGFyZ2V0Lmxlbmd0aCA/IHRhcmdldCA6ICQoJ1tuYW1lPScgKyB0aGlzLmhhc2guc2xpY2UoMSkgKyddJyk7XG4vLyAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbi8vICAgICAgICQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe1xuLy8gICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3Bcbi8vICAgICAgIH0sIDEwMDApO1xuLy8gICAgICAgcmV0dXJuIGZhbHNlO1xuLy8gICAgIH1cbi8vICAgfVxuLy8gfSk7XG5cbi8vIHZhciBjbG9jayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9jay10aW1lJyk7XG4vLyB2YXIgQ1VSUkVOVF9USU1FID0gbnVsbDtcbi8vIHZhciBJVEVSQVRPUl9DT1VOVCA9IDU7XG4vLyB2YXIgQU5JTUFUSU9OX0RVUkFUSU9OID0gNzU7XG5cbi8vIGZ1bmN0aW9uIHNldENsb2NrKHRpbWUpIHtcbi8vICAgaWYgKENVUlJFTlRfVElNRSkge1xuLy8gICAgIHZhciBjdXJyZW50VGltZSA9IGdldE1pbnV0ZXMoQ1VSUkVOVF9USU1FKTtcbi8vICAgICB2YXIgbmV4dFRpbWUgPSBnZXRNaW51dGVzKHRpbWUpO1xuLy8gICAgIHZhciBkaWZmID0gbmV4dFRpbWUgLSBjdXJyZW50VGltZTtcblxuLy8gICAgIHZhciBzdGVwVmFsdWUgPSBNYXRoLmNlaWwoZGlmZiAvIElURVJBVE9SX0NPVU5UKTtcblxuXG4vLyAgICAgdmFyIHRtcFRpbWUgPSBjdXJyZW50VGltZTtcblxuLy8gICAgIHZhciBzZXEgPSBBcnJheS5hcHBseShudWxsLCBuZXcgQXJyYXkoSVRFUkFUT1JfQ09VTlQpKS5tYXAoZnVuY3Rpb24oXywgaSkge1xuLy8gICAgICAgcmV0dXJuIGdldDEySG91cihjdXJyZW50VGltZSArIChpICogc3RlcFZhbHVlKSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBzZXEucG9wKCk7XG4vLyAgICAgc2VxLnB1c2godGltZSk7XG5cbi8vICAgICB2YXIgYW5pbWF0aW9uID0gbmV3IGFuaW1hdGUoc2VxLCBzdGVwVmFsdWUpO1xuXG4vLyAgIH1cbi8vICAgZWxzZSB7XG4vLyAgICAgQ1VSUkVOVF9USU1FID0gdGltZTtcbi8vICAgICBjbG9jay5pbm5lclRleHQgPSBDVVJSRU5UX1RJTUU7XG4vLyAgIH1cbi8vIH1cblxuLy8gZnVuY3Rpb24gYW5pbWF0ZShzZXEsIHN0ZXApIHtcbi8vICAgc2VxLmZvckVhY2goZnVuY3Rpb24odGltZSwgaSkge1xuLy8gICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4vLyAgICAgICBjbG9jay5pbm5lclRleHQgPSB0aW1lO1xuLy8gICAgIH0sIGkgKiBzdGVwKTtcbi8vICAgfSk7XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGdldDEySG91cih0aW1lKSB7XG4vLyAgIHZhciBob3VycyA9IE1hdGguZmxvb3IodGltZSAvIDYwKTtcbi8vICAgdmFyIG1pbiA9IHRpbWUgJSA2MDtcbi8vICAgdmFyIG1lcmlkaWFuO1xuXG4vLyAgIGlmIChob3VycyA+IDEyKSB7XG4vLyAgICAgbWVyaWRpYW4gPSAncG0nO1xuLy8gICAgIGhvdXJzIC09IDEyO1xuLy8gICB9XG4vLyAgIGVsc2Uge1xuLy8gICAgIG1lcmlkaWFuID0gJ2FtJztcbi8vICAgfVxuXG4vLyAgIG1pbiA9IG1pbiA8IDEwID8gJzAnICsgbWluLnRvU3RyaW5nKCkgOiBtaW47XG5cbi8vICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWluICsgbWVyaWRpYW47XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGdldE1pbnV0ZXMoc3RyKSB7XG4vLyAgIHZhciB0aW1lID0gc3RyLm1hdGNoKC9eKFxcZCspOihcXGQrKShhbXxwbSkkLyk7XG4vLyAgIHZhciBob3VycyA9IHBhcnNlSW50KHRpbWVbMV0sIDEwKSArICh0aW1lWzNdID09PSAncG0nID8gMTIgOiAwKTtcbi8vICAgdmFyIG1pbnV0ZXMgPSBwYXJzZUludCh0aW1lWzJdLCAxMCk7XG5cblxuLy8gICByZXR1cm4gKDYwICogaG91cnMpICsgbWludXRlcztcbi8vIH1cbn0se1wiLi9jaHJvbWVmaXguanNcIjoyLFwiLi9mb3JtTG9naWMuanNcIjo0LFwiLi9tb2JpbGVBbmltYXRpb24uanNcIjo1LFwiLi9zaWRlYmFyRWZmZWN0cy5qc1wiOjYsXCIuL3ZpZGVvTG9naWMuanNcIjo3fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgYWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxudmFyIGlzV2Via2l0ID0gL1dlYktpdC8udGVzdChhZ2VudCk7XG52YXIgaXNDaHJvbWUgPSBpc1dlYmtpdCAmJiAvQ2hyb21lLy50ZXN0KGFnZW50KTtcblxuaWYgKGlzQ2hyb21lKSB7XG5cdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdjaHJvbWUtZml4Jyk7XG59XG59LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qIVxuICogY2xhc3NpZSAtIGNsYXNzIGhlbHBlciBmdW5jdGlvbnNcbiAqIGZyb20gYm9uem8gaHR0cHM6Ly9naXRodWIuY29tL2RlZC9ib256b1xuICogXG4gKiBjbGFzc2llLmhhcyggZWxlbSwgJ215LWNsYXNzJyApIC0+IHRydWUvZmFsc2VcbiAqIGNsYXNzaWUuYWRkKCBlbGVtLCAnbXktbmV3LWNsYXNzJyApXG4gKiBjbGFzc2llLnJlbW92ZSggZWxlbSwgJ215LXVud2FudGVkLWNsYXNzJyApXG4gKiBjbGFzc2llLnRvZ2dsZSggZWxlbSwgJ215LWNsYXNzJyApXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSAqL1xuLypnbG9iYWwgZGVmaW5lOiBmYWxzZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gY2xhc3MgaGVscGVyIGZ1bmN0aW9ucyBmcm9tIGJvbnpvIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvYm9uem9cblxuZnVuY3Rpb24gY2xhc3NSZWcoIGNsYXNzTmFtZSApIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXCIoXnxcXFxccyspXCIgKyBjbGFzc05hbWUgKyBcIihcXFxccyt8JClcIik7XG59XG5cbi8vIGNsYXNzTGlzdCBzdXBwb3J0IGZvciBjbGFzcyBtYW5hZ2VtZW50XG4vLyBhbHRobyB0byBiZSBmYWlyLCB0aGUgYXBpIHN1Y2tzIGJlY2F1c2UgaXQgd29uJ3QgYWNjZXB0IG11bHRpcGxlIGNsYXNzZXMgYXQgb25jZVxudmFyIGhhc0NsYXNzLCBhZGRDbGFzcywgcmVtb3ZlQ2xhc3M7XG5cbmlmICggJ2NsYXNzTGlzdCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICkge1xuICBoYXNDbGFzcyA9IGZ1bmN0aW9uKCBlbGVtLCBjICkge1xuICAgIHJldHVybiBlbGVtLmNsYXNzTGlzdC5jb250YWlucyggYyApO1xuICB9O1xuICBhZGRDbGFzcyA9IGZ1bmN0aW9uKCBlbGVtLCBjICkge1xuICAgIGVsZW0uY2xhc3NMaXN0LmFkZCggYyApO1xuICB9O1xuICByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKCBlbGVtLCBjICkge1xuICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZSggYyApO1xuICB9O1xufVxuZWxzZSB7XG4gIGhhc0NsYXNzID0gZnVuY3Rpb24oIGVsZW0sIGMgKSB7XG4gICAgcmV0dXJuIGNsYXNzUmVnKCBjICkudGVzdCggZWxlbS5jbGFzc05hbWUgKTtcbiAgfTtcbiAgYWRkQ2xhc3MgPSBmdW5jdGlvbiggZWxlbSwgYyApIHtcbiAgICBpZiAoICFoYXNDbGFzcyggZWxlbSwgYyApICkge1xuICAgICAgZWxlbS5jbGFzc05hbWUgPSBlbGVtLmNsYXNzTmFtZSArICcgJyArIGM7XG4gICAgfVxuICB9O1xuICByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKCBlbGVtLCBjICkge1xuICAgIGVsZW0uY2xhc3NOYW1lID0gZWxlbS5jbGFzc05hbWUucmVwbGFjZSggY2xhc3NSZWcoIGMgKSwgJyAnICk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKCBlbGVtLCBjICkge1xuICB2YXIgZm4gPSBoYXNDbGFzcyggZWxlbSwgYyApID8gcmVtb3ZlQ2xhc3MgOiBhZGRDbGFzcztcbiAgZm4oIGVsZW0sIGMgKTtcbn1cblxudmFyIGNsYXNzaWUgPSB7XG4gIC8vIGZ1bGwgbmFtZXNcbiAgaGFzQ2xhc3M6IGhhc0NsYXNzLFxuICBhZGRDbGFzczogYWRkQ2xhc3MsXG4gIHJlbW92ZUNsYXNzOiByZW1vdmVDbGFzcyxcbiAgdG9nZ2xlQ2xhc3M6IHRvZ2dsZUNsYXNzLFxuICAvLyBzaG9ydCBuYW1lc1xuICBoYXM6IGhhc0NsYXNzLFxuICBhZGQ6IGFkZENsYXNzLFxuICByZW1vdmU6IHJlbW92ZUNsYXNzLFxuICB0b2dnbGU6IHRvZ2dsZUNsYXNzXG59O1xuXG4vLyB0cmFuc3BvcnRcbmlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAvLyBBTURcbiAgZGVmaW5lKCBjbGFzc2llICk7XG59IGVsc2Uge1xuICAvLyBicm93c2VyIGdsb2JhbFxuICB3aW5kb3cuY2xhc3NpZSA9IGNsYXNzaWU7XG59XG5cbn0pKCB3aW5kb3cgKTtcblxufSx7fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgZm9ybUxvZ2ljID0gKGZ1bmN0aW9uKCkge1xuXG5cdGZ1bmN0aW9uIHNlcnZpY2VWaWV3Rm9ybSgpIHtcblx0ICB2YXIgc3RlcE9uZSAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlcnZpY2VTdGVwT25lJyksXG5cdCAgICAgIHN0ZXBUd28gICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXJ2aWNlU3RlcFR3bycpLFxuXHQgICAgICBzdGVwVGhyZWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VydmljZVN0ZXBUaHJlZScpLFxuXHQgICAgICBzaXRlcyAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVtYmVyU2l0ZXMnKSxcblx0ICAgICAgY2lyY3VpdHMgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ251bWJlckNpcmN1aXRzJyksXG5cdCAgICAgIHNlbnNvcnMgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudW1iZXJTZW5zb3JzJyk7XG5cblx0ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWlzc2lvblNpdGVzJykudmFsdWUgICAgPSBzaXRlcy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXS52YWx1ZTtcblx0ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWlzc2lvbkNpcmN1aXRzJykudmFsdWUgPSBjaXJjdWl0cy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKVswXS52YWx1ZTtcblx0ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWlzc2lvblNlbnNvcnMnKS52YWx1ZSAgPSBzZW5zb3JzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpWzBdLnZhbHVlO1xuXHQgIHN0ZXBUd28uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG5cdCAgc3RlcE9uZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblx0ICBzaXRlcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0ICBjaXJjdWl0cy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcblx0ICBzZW5zb3JzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuXHR9XG5cblx0ZnVuY3Rpb24gbmV3c2xldHRlclNpZ251cCgpIHtcblx0ICB2YXIgc2lnbnVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25VcEZvck5ld3NsZXR0ZXInKTtcblx0ICB2YXIgc2lnbnVwSGVpZ2h0ID0gc2lnbnVwLm9mZnNldEhlaWdodDtcblx0ICBzaWdudXAuY2xhc3NMaXN0LmFkZCgnY29uZmlybWF0aW9uLXRleHQnKTtcblx0ICBzaWdudXAuaW5uZXJIVE1MID0gJzxoNj5UaGFuayB5b3UgZm9yIHlvdXIgaW50ZXJlc3QgaW4gTGlnaHRjbG91ZC48L2g2PjxwPkEgbGlnaHRjbG91ZCByZXByZXNlbnRhdGl2ZSBmcm9tIFJBQiBpcyByZXZpZXdpbmcgeW91ciByZXF1ZXN0IGFuZCB3aWxsIGZvbGxvdyB1cCB3aXRoaW4gdGhlIG5leHQgMjQtNDggaG91cnMuPC9wPic7XG5cdCAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OSkge1xuXHQgICAgc2lnbnVwLnN0eWxlLmhlaWdodCA9IHNpZ251cEhlaWdodCArICdweCc7XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gY29udGFjdEZvcm0oKSB7XG5cdCAgdmFyIGNvbnRhY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdExpZ2h0Y2xvdWQnKTtcblx0ICB2YXIgY29udGFjdEhlaWdodCA9IGNvbnRhY3Qub2Zmc2V0SGVpZ2h0O1xuXHQgIGNvbnRhY3QuY2xhc3NMaXN0LmFkZCgnY29uZmlybWF0aW9uLXRleHQnKTtcblx0ICBjb250YWN0LmlubmVySFRNTCA9ICc8aDM+VGhhbmsgeW91IGZvciB5b3VyIGludGVyZXN0IGluIExpZ2h0Y2xvdWQuPC9oMz48cD5BIGxpZ2h0Y2xvdWQgcmVwcmVzZW50YXRpdmUgZnJvbSBSQUIgaXMgcmV2aWV3aW5nIHlvdXIgcmVxdWVzdCBhbmQgd2lsbCBmb2xsb3cgdXAgd2l0aGluIHRoZSBuZXh0IDI0LTQ4IGhvdXJzLjwvcD4nO1xuXHQgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA3NjkpIHtcblx0ICAgIGNvbnRhY3Quc3R5bGUuaGVpZ2h0ID0gY29udGFjdEhlaWdodCArICdweCc7XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gdmFsaWRhdGVGb3JtT25TdWJtaXQoY29udGFjdCkge1xuXHQgICAgcmVhc29uID0gXCJcIjtcblx0ICAgIHJlYXNvbiArPSB2YWxpZGF0ZU5hbWUoY29udGFjdC5uYW1lKTtcblx0ICAgIHJlYXNvbiArPSB2YWxpZGF0ZUVtYWlsKGNvbnRhY3QuZW1haWwpO1xuXHQgICAgcmVhc29uICs9IHZhbGlkYXRlUGhvbmUoY29udGFjdC5waG9uZSk7XG5cdCAgICBpZiAocmVhc29uLmxlbmd0aCA+IDApIHtcblx0ICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHZhciBzZXJ2aWNlRm9ybSAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VydmljZUNvbnRhY3RTdWJtaXQnKTtcblx0ICAgICAgICBzZXJ2aWNlRm9ybS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgc2VydmljZUZvcm0uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBQbGVhc2Ugd2FpdC4uLic7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXJ2aWNlU3RlcFR3bycpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXJ2aWNlU3RlcFRocmVlJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7fSwgMTAwMCk7XG5cdCAgICB9XG5cdH1cblxuXHRmdW5jdGlvbiB2YWxpZGF0ZUZvcm1PblN1Ym1pdEZhbmN5KGNvbnRhY3QpIHtcblx0ICAgIHJlYXNvbiA9IFwiXCI7XG5cdCAgICByZWFzb24gKz0gdmFsaWRhdGVOYW1lRmFuY3koY29udGFjdC5uYW1lKTtcblx0ICAgIHJlYXNvbiArPSB2YWxpZGF0ZUVtYWlsRmFuY3koY29udGFjdC5lbWFpbCk7XG5cdCAgICByZWFzb24gKz0gdmFsaWRhdGVQaG9uZUZhbmN5KGNvbnRhY3QucGhvbmUpO1xuXHQgICAgaWYgKHJlYXNvbi5sZW5ndGggPiAwKSB7XG5cdCAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICB2YXIgY29udGFjdEZvcm0gICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3RTdWJtaXQnKTtcblx0ICAgICAgICBpZiAoY29udGFjdEZvcm0pIHtcblx0ICAgICAgICBcdGNvbnRhY3RGb3JtLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblx0ICAgICAgICAgIGNvbnRhY3RGb3JtLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gUGxlYXNlIHdhaXQuLi4nO1xuXHQgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe3N1Ym1pdEZvcm1BamF4KCk7fSwgMTAwMCk7XG5cdCAgICAgICAgfVxuXHQgICAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gdmFsaWRhdGVOZXdzbGV0dGVyU2lnbnVwKGNvbnRhY3QpIHtcblx0ICByZWFzb24gPSBcIlwiO1xuXHQgIHJlYXNvbiArPSB2YWxpZGF0ZUVtYWlsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXdzbGV0dGVyRm9ybScpLmVtYWlsKTtcblx0ICB2YXIgc2VydmljZUZvcm0gICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlcnZpY2VDb250YWN0U3VibWl0Jyk7XG5cdCAgaWYgKHJlYXNvbi5sZW5ndGggPiAwKSB7XG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0ICB9IGVsc2Uge1xuXHQgIFx0dmFyIG5ld3NsZXR0ZXJCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0TmV3c2xldHRlckZvcm0nKTtcblx0ICBcdG5ld3NsZXR0ZXJCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuXHQgIFx0bmV3c2xldHRlckJ1dHRvbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+Jztcblx0ICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtuZXdzbGV0dGVyU2lnbnVwKCk7fSwgMTAwMCk7XG5cdCAgfVxuXHR9XG5cblx0ZnVuY3Rpb24gdmFsaWRhdGVOYW1lKG5hbWUpIHtcblx0ICAgIHZhciBlcnJvciA9IFwiXCI7XG5cblx0ICAgIGlmIChuYW1lLnZhbHVlID09PSBcIlwiKSB7XG5cdCAgICAgICAgbmFtZS5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZDAwMDJmJztcblx0ICAgICAgICBlcnJvciA9IFwiMVwiO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgICBuYW1lLnN0eWxlLmJvcmRlckNvbG9yID0gJyMyMzFmMjAnO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIGVycm9yO1xuXHR9XG5cblx0ZnVuY3Rpb24gdmFsaWRhdGVOYW1lRmFuY3kobmFtZSkge1xuXHQgICAgdmFyIGVycm9yID0gXCJcIjtcblx0ICAgIGlmIChuYW1lLnZhbHVlID09PSBcIlwiKSB7XG5cdCAgICAgICAgbmFtZS5wYXJlbnROb2RlLnN0eWxlLmJvcmRlckNvbG9yICAgPSAnI2QwMDAyZic7XG5cdCAgICAgICAgbmFtZS5uZXh0RWxlbWVudFNpYmxpbmcuc3R5bGUuY29sb3IgPSAnI2QwMDAyZic7XG5cdCAgICAgICAgZXJyb3IgPSBcIjFcIjtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgbmFtZS5wYXJlbnROb2RlLnN0eWxlLmJvcmRlckNvbG9yICAgPSAnIzIzMWYyMCc7XG5cdCAgICAgICAgbmFtZS5uZXh0RWxlbWVudFNpYmxpbmcuc3R5bGUuY29sb3IgPSAnIzI4MmQzMic7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gZXJyb3I7XG5cdH1cblxuXHRmdW5jdGlvbiB0cmltKHMpIHtcblx0ICAgIHJldHVybiBzLnJlcGxhY2UoL15cXHMrfFxccyskLywgJycpO1xuXHR9XG5cblx0ZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xuXHQgICAgdmFyIGVycm9yID0gXCJcIjtcblx0ICAgIHZhciB0ZW1haWwgPSB0cmltKGVtYWlsLnZhbHVlKTsgLy8gdmFsdWUgb2YgZmllbGQgd2l0aCB3aGl0ZXNwYWNlIHRyaW1tZWQgb2ZmXG5cdCAgICB2YXIgZW1haWxGaWx0ZXIgPSAvXlteQF0rQFteQC5dK1xcLlteQF0qXFx3XFx3JC87XG5cblx0ICAgIGlmIChlbWFpbC52YWx1ZSA9PT0gXCJcIikge1xuXHQgICAgICAgIGVtYWlsLnN0eWxlLmJvcmRlckNvbG9yID0gJyNkMDAwMmYnO1xuXHQgICAgICAgIGVycm9yID0gXCIyXCI7XG5cdCAgICB9IGVsc2UgaWYgKCFlbWFpbEZpbHRlci50ZXN0KHRlbWFpbCkpIHsgLy90ZXN0IGVtYWlsIGZvciBpbGxlZ2FsIGNoYXJhY3RlcnNcblx0ICAgICAgICBlbWFpbC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZDAwMDJmJztcblx0ICAgICAgICBlcnJvciA9IFwiM1wiO1xuXHQgICAgfVxuXHQgICAgZWxzZSB7XG5cdCAgICAgICAgZW1haWwuc3R5bGUuYm9yZGVyQ29sb3IgPSAnIzIzMWYyMCc7XG5cdCAgICB9XG5cdCAgICByZXR1cm4gZXJyb3I7XG5cdH1cblxuXHRmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsRmFuY3koZW1haWwpIHtcblx0ICAgIHZhciBlcnJvciA9IFwiXCI7XG5cdCAgICB2YXIgdGVtYWlsID0gdHJpbShlbWFpbC52YWx1ZSk7IC8vIHZhbHVlIG9mIGZpZWxkIHdpdGggd2hpdGVzcGFjZSB0cmltbWVkIG9mZlxuXHQgICAgdmFyIGVtYWlsRmlsdGVyID0gL15bXkBdK0BbXkAuXStcXC5bXkBdKlxcd1xcdyQvO1xuXG5cdCAgICBpZiAoZW1haWwudmFsdWUgPT09IFwiXCIpIHtcblx0ICAgICAgICBlbWFpbC5wYXJlbnROb2RlLnN0eWxlLmJvcmRlckNvbG9yICAgPSAnI2QwMDAyZic7XG5cdCAgICAgICAgZW1haWwubmV4dEVsZW1lbnRTaWJsaW5nLnN0eWxlLmNvbG9yID0gJyNkMDAwMmYnO1xuXHQgICAgICAgIGVycm9yID0gXCIyXCI7XG5cdCAgICB9IGVsc2UgaWYgKCFlbWFpbEZpbHRlci50ZXN0KHRlbWFpbCkpIHsgLy90ZXN0IGVtYWlsIGZvciBpbGxlZ2FsIGNoYXJhY3RlcnNcblx0ICAgICAgICBlbWFpbC5wYXJlbnROb2RlLnN0eWxlLmJvcmRlckNvbG9yICAgPSAnI2QwMDAyZic7XG5cdCAgICAgICAgZW1haWwubmV4dEVsZW1lbnRTaWJsaW5nLnN0eWxlLmNvbG9yID0gJyMyODJkMzInO1xuXHQgICAgICAgIGVycm9yID0gXCIzXCI7XG5cdCAgICB9XG5cdCAgICBlbHNlIHtcblx0ICAgICAgICBlbWFpbC5wYXJlbnROb2RlLnN0eWxlLmJvcmRlckNvbG9yID0gJyMyMzFmMjAnO1xuXHQgICAgfVxuXHQgICAgcmV0dXJuIGVycm9yO1xuXHR9XG5cblx0ZnVuY3Rpb24gdmFsaWRhdGVQaG9uZShwaG9uZSkge1xuXHQgICAgdmFyIGVycm9yID0gXCJcIjtcblx0ICAgIHZhciBzdHJpcHBlZCA9IHBob25lLnZhbHVlLnJlcGxhY2UoL1tcXChcXClcXC5cXC1cXCBdL2csICcnKTtcblxuXHQgICAgaWYgKHBob25lLnZhbHVlID09PSBcIlwiKSB7XG5cdCAgICAgICAgcGhvbmUuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI2QwMDAyZic7XG5cdCAgICAgICAgZXJyb3IgPSAnNic7XG5cdCAgICB9IGVsc2UgaWYgKGlzTmFOKHBhcnNlSW50KHN0cmlwcGVkKSkpIHtcblx0ICAgICAgICBlcnJvciA9IFwiNVwiO1xuXHQgICAgICAgIHBob25lLnN0eWxlLmJvcmRlckNvbG9yID0gJyNkMDAwMmYnO1xuXHQgICAgICAgIFxuXHQgICAgfSBlbHNlIGlmIChzdHJpcHBlZC5sZW5ndGggPCAxMCkge1xuXHQgICAgICAgIGVycm9yID0gXCI2XCI7XG5cdCAgICAgICAgcGhvbmUuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI2QwMDAyZic7XG5cdCAgICAgICAgXG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAgIHBob25lLnN0eWxlLmJvcmRlckNvbG9yID0gJyMyMzFmMjAnO1xuXHQgICAgICAgIFxuXHQgICAgfVxuXHQgICAgcmV0dXJuIGVycm9yO1xuXHR9XG5cblx0ZnVuY3Rpb24gdmFsaWRhdGVQaG9uZUZhbmN5KHBob25lKSB7XG5cdCAgICB2YXIgZXJyb3IgPSBcIlwiO1xuXHQgICAgdmFyIHN0cmlwcGVkID0gcGhvbmUudmFsdWUucmVwbGFjZSgvW1xcKFxcKVxcLlxcLVxcIF0vZywgJycpO1xuXG5cdCAgICBpZiAocGhvbmUudmFsdWUgPT09IFwiXCIpIHtcblx0ICAgICAgICBwaG9uZS5wYXJlbnROb2RlLnN0eWxlLmJvcmRlckNvbG9yICAgPSAnI2QwMDAyZic7XG5cdCAgICAgICAgcGhvbmUubmV4dEVsZW1lbnRTaWJsaW5nLnN0eWxlLmNvbG9yID0gJyNkMDAwMmYnO1xuXHQgICAgICAgIGVycm9yID0gJzYnO1xuXHQgICAgfSBlbHNlIGlmIChpc05hTihwYXJzZUludChzdHJpcHBlZCkpKSB7XG5cdCAgICAgICAgZXJyb3IgPSBcIjVcIjtcblx0ICAgICAgICBwaG9uZS5wYXJlbnROb2RlLnN0eWxlLmJvcmRlckNvbG9yICAgPSAnI2QwMDAyZic7XG5cdCAgICAgICAgcGhvbmUubmV4dEVsZW1lbnRTaWJsaW5nLnN0eWxlLmNvbG9yID0gJyNkMDAwMmYnO1xuXHQgICAgfSBlbHNlIGlmIChzdHJpcHBlZC5sZW5ndGggPCAxMCkge1xuXHQgICAgICAgIGVycm9yID0gXCI2XCI7XG5cdCAgICAgICAgcGhvbmUucGFyZW50Tm9kZS5zdHlsZS5ib3JkZXJDb2xvciAgID0gJyNkMDAwMmYnO1xuXHQgICAgICAgIHBob25lLm5leHRFbGVtZW50U2libGluZy5zdHlsZS5jb2xvciA9ICcjZDAwMDJmJztcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcGhvbmUucGFyZW50Tm9kZS5zdHlsZS5ib3JkZXJDb2xvciAgID0gJyMyMzFmMjAnO1xuXHQgICAgICAgIHBob25lLm5leHRFbGVtZW50U2libGluZy5zdHlsZS5jb2xvciA9ICcjMjgyZDMyJztcblx0ICAgIH1cblx0ICAgIHJldHVybiBlcnJvcjtcblx0fVxuXG5cdGZ1bmN0aW9uIHN1Ym1pdEZvcm1BamF4KCkge1xuXHQgIGNvbnRhY3RGb3JtKCk7XG5cdCAgLy8gdmFyIHhtbGh0dHA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA/XG5cdCAgLy8gICAgIG5ldyBYTUxIdHRwUmVxdWVzdCgpIDogbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcblxuXHQgIC8vIHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdCAgLy8gICBpZiAoeG1saHR0cC5yZWFkeVN0YXRlID09IDQgJiYgeG1saHR0cC5zdGF0dXMgPT0gMjAwKSB7XG5cdCAgLy8gICAgIGFsZXJ0KHhtbGh0dHAucmVzcG9uc2VUZXh0KTsgLy8gSGVyZSBpcyB0aGUgcmVzcG9uc2Vcblx0ICAvLyAgIH1cblx0ICAvLyB9O1xuXG5cdCAgLy8gdmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFjdE5hbWUnKS5pbm5lckhUTUw7XG5cdCAgLy8gdmFyIGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3RFbWFpbCcpLmlubmVySFRNTDtcblx0ICAvLyB2YXIgbnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3RQaG9uZScpLmlubmVySFRNTDtcblxuXG5cdCAgLy8geG1saHR0cC5vcGVuKFwiR0VUXCIsXCJmb3JtLnBocD9uYW1lPVwiICsgbmFtZSArIFwiJm5pY2tuYW1lPVwiICsgbmlja25hbWUgKyBcIiZlbWFpbD1cIiArIGVtYWlsLCArIFwiJnBob25lPVwiICsgcGhvbmUgKyBcIiZudW1iZXI9XCIgKyBudW1iZXIgKyBcIiZkaXNjbGFpbWVyPVwiICsgZGlzY2xhaW1lciwgdHJ1ZSk7XG5cdCAgLy8geG1saHR0cC5zZW5kKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBpbml0Rm9ybXMoKSB7XG5cdFx0dmFyIG5ld3NsZXR0ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3c2xldHRlckZvcm0nKTtcblx0ICBpZiAobmV3c2xldHRlcikge1xuXHQgICAgbmV3c2xldHRlci5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XG5cdCAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblx0ICAgICAgdmFsaWRhdGVOZXdzbGV0dGVyU2lnbnVwKCk7XG5cdCAgICB9KTtcblx0ICB9XG5cblx0ICB2YXIgY29udGFjdFVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhY3RGb3JtJyk7XG5cdCAgaWYgKGNvbnRhY3RVcykge1xuXHQgICAgY29udGFjdFVzLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcblx0ICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgICB2YWxpZGF0ZUZvcm1PblN1Ym1pdEZhbmN5KHRoaXMpO1xuXHQgICAgfSk7XG5cdCAgfVxuXG5cdCAgdmFyIHNlcnZpY2VGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlcnZpY2VHZXRJblRvdWNoJyk7XG5cdCAgaWYgKHNlcnZpY2VGb3JtKSB7XG5cdCAgICBzZXJ2aWNlRm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcblx0ICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgICBzZXJ2aWNlVmlld0Zvcm0oKTtcblx0ICAgIH0pO1xuXHQgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlcnZpY2VDb250YWN0Rm9ybScpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcblx0ICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHQgICAgICB2YWxpZGF0ZUZvcm1PblN1Ym1pdCh0aGlzKTtcblx0ICAgIH0pO1xuXHQgIH1cblx0fVxuXG5cdGluaXRGb3JtcygpO1xuXG5cdC8vXG5cdChmdW5jdGlvbigpIHtcblx0ICAvLyB0cmltIHBvbHlmaWxsIDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL1RyaW1cblx0ICBpZiAoIVN0cmluZy5wcm90b3R5cGUudHJpbSkge1xuXHQgICAgKGZ1bmN0aW9uKCkge1xuXHQgICAgICAvLyBNYWtlIHN1cmUgd2UgdHJpbSBCT00gYW5kIE5CU1Bcblx0ICAgICAgdmFyIHJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXHQgICAgICBTdHJpbmcucHJvdG90eXBlLnRyaW0gPSBmdW5jdGlvbigpIHtcblx0ICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKHJ0cmltLCAnJyk7XG5cdCAgICAgIH07XG5cdCAgICB9KSgpO1xuXHQgIH1cblxuXHQgIFtdLnNsaWNlLmNhbGwoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICdpbnB1dC5pbnB1dF9fZmllbGQnICkgKS5mb3JFYWNoKCBmdW5jdGlvbiggaW5wdXRFbCApIHtcblx0ICAgIC8vIGluIGNhc2UgdGhlIGlucHV0IGlzIGFscmVhZHkgZmlsbGVkLi5cblx0ICAgIGlmKCBpbnB1dEVsLnZhbHVlLnRyaW0oKSAhPT0gJycgKSB7XG5cdCAgICAgIGNsYXNzaWUuYWRkKCBpbnB1dEVsLnBhcmVudE5vZGUsICdpbnB1dC0tZmlsbGVkJyApO1xuXHQgICAgfVxuXG5cdCAgICAvLyBldmVudHM6XG5cdCAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoICdmb2N1cycsIG9uSW5wdXRGb2N1cyApO1xuXHQgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIG9uSW5wdXRCbHVyICk7XG5cdCAgfSApO1xuXG5cdCAgW10uc2xpY2UuY2FsbCggZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJ3RleHRhcmVhLnRhX19maWVsZCcgKSApLmZvckVhY2goIGZ1bmN0aW9uKCB0YUVsICkge1xuXHQgICAgLy8gaW4gY2FzZSB0aGUgaW5wdXQgaXMgYWxyZWFkeSBmaWxsZWQuLlxuXHQgICAgaWYoIHRhRWwudmFsdWUudHJpbSgpICE9PSAnJyApIHtcblx0ICAgICAgY2xhc3NpZS5hZGQoIHRhRWwucGFyZW50Tm9kZSwgJ2lucHV0LS1maWxsZWQnICk7XG5cdCAgICB9XG5cblx0ICAgIC8vIGV2ZW50czpcblx0ICAgIHRhRWwuYWRkRXZlbnRMaXN0ZW5lciggJ2ZvY3VzJywgb25JbnB1dEZvY3VzICk7XG5cdCAgICB0YUVsLmFkZEV2ZW50TGlzdGVuZXIoICdibHVyJywgb25JbnB1dEJsdXIgKTtcblx0ICB9ICk7XG5cblx0ICBmdW5jdGlvbiBvbklucHV0Rm9jdXMoIGV2ICkge1xuXHQgICAgY2xhc3NpZS5hZGQoIGV2LnRhcmdldC5wYXJlbnROb2RlLCAnaW5wdXQtLWZpbGxlZCcgKTtcblx0ICB9XG5cblx0ICBmdW5jdGlvbiBvbklucHV0Qmx1ciggZXYgKSB7XG5cdCAgICBpZiggZXYudGFyZ2V0LnZhbHVlLnRyaW0oKSA9PT0gJycgKSB7XG5cdCAgICAgIGNsYXNzaWUucmVtb3ZlKCBldi50YXJnZXQucGFyZW50Tm9kZSwgJ2lucHV0LS1maWxsZWQnICk7XG5cdCAgICB9XG5cdCAgfVxuXHR9KSgpO1xuXG5cbn0pKCk7XG5cbn0se31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuZnVuY3Rpb24gcGhvbmVBbmltYXRpb25SZXBsYWNlbWVudChlbCkge1xuICB2YXIgc2NoZWR1bGUgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjaGVkdWxlMicpO1xuICB2YXIgZGF5bGlnaHQgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RheWxpZ2h0MicpO1xuICB2YXIgb2NjdXBhbmN5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29jY3VwYW5jeTInKTtcbiAgdmFyIGRpbW1pbmcgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaW1taW5nMicpO1xuICB2YXIgZGVtYW5kICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbWFuZFJlc3BvbnNlMicpO1xuICB2YXIgY29udHJvbHMgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpbW1pbmdDb250cm9sczInKTtcbiAgdmFyIHRleHQxICAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaG9uZUFuaW1hdGlvblRleHQxJyk7XG4gIHZhciB0ZXh0MiAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGhvbmVBbmltYXRpb25UZXh0MicpO1xuICB2YXIgdGV4dDMgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bob25lQW5pbWF0aW9uVGV4dDMnKTtcbiAgdmFyIHRleHRzICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZXNjcmlwdGlvbi10ZXh0Jyk7XG4gIHZhciBpbmRpdmlkdWFsVGV4dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5kaXZpZHVhbC1kZXNjcmlwdG9yLXRleHQnKTtcblxuICB2YXIgY2xpY2tTaWJsaW5ncyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChlbC5wYXJlbnROb2RlLmNoaWxkcmVuLCBmdW5jdGlvbihjaGlsZCl7XG4gICAgIHJldHVybiBjaGlsZCAhPT0gZWw7XG4gIH0pO1xuICBjbGlja1NpYmxpbmdzLmZvckVhY2goZnVuY3Rpb24oc2liKXtcbiAgICBzaWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gIH0pO1xuICBlbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGV4dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zb2xlLmxvZyh0ZXh0c1tpXSk7XG4gICAgdGV4dHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gaW5kaXZpZHVhbFRleHRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc29sZS5sb2coaW5kaXZpZHVhbFRleHRzW2ldKTtcbiAgICBpbmRpdmlkdWFsVGV4dHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gIH1cblxuICBzd2l0Y2ggKGVsKSB7XG4gICAgY2FzZSBzY2hlZHVsZTpcbiAgICAgIGNvbnNvbGUubG9nKDMpO1xuICAgICAgdGV4dDEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NoZWR1bGVTdXBwb3J0VGV4dCcpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBkYXlsaWdodDpcbiAgICAgIGNvbnNvbGUubG9nKDQpO1xuICAgICAgdGV4dDEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF5bGlnaHRTdXBwb3J0VGV4dCcpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBvY2N1cGFuY3k6XG4gICAgICBjb25zb2xlLmxvZyg1KTtcbiAgICAgIHRleHQyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29jY3VwYW5jeVN1cHBvcnRUZXh0JykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGRpbW1pbmc6XG4gICAgICBjb25zb2xlLmxvZyg2KTtcbiAgICAgIHRleHQyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpbW1pbmdTdXBwb3J0VGV4dCcpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBkZW1hbmQ6XG4gICAgICBjb25zb2xlLmxvZyg3KTtcbiAgICAgIHRleHQzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbWFuZFN1cHBvcnRUZXh0JykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIGNvbnRyb2xzOlxuICAgICAgY29uc29sZS5sb2coOCk7XG4gICAgICB0ZXh0My5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sc1N1cHBvcnRUZXh0JykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICBicmVhaztcbiAgfVxufVxuXG52YXIgYW5pbWF0aW9uUmVwbGFjZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGhvbmVBbmltYXRpb25SZXBsYWNlbWVudCcpO1xuaWYgKGFuaW1hdGlvblJlcGxhY2VtZW50KSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2hlZHVsZTInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIHZhciBlbCA9IHRoaXM7XG4gICAgcGhvbmVBbmltYXRpb25SZXBsYWNlbWVudChlbCk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF5bGlnaHQyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICB2YXIgZWwgPSB0aGlzO1xuICAgIHBob25lQW5pbWF0aW9uUmVwbGFjZW1lbnQoZWwpO1xuICB9KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29jY3VwYW5jeTInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIHZhciBlbCA9IHRoaXM7XG4gICAgcGhvbmVBbmltYXRpb25SZXBsYWNlbWVudChlbCk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGltbWluZzInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIHZhciBlbCA9IHRoaXM7XG4gICAgcGhvbmVBbmltYXRpb25SZXBsYWNlbWVudChlbCk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtYW5kUmVzcG9uc2UyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICB2YXIgZWwgPSB0aGlzO1xuICAgIHBob25lQW5pbWF0aW9uUmVwbGFjZW1lbnQoZWwpO1xuICB9KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpbW1pbmdDb250cm9sczInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIHZhciBlbCA9IHRoaXM7XG4gICAgcGhvbmVBbmltYXRpb25SZXBsYWNlbWVudChlbCk7XG4gIH0pO1xufVxufSx7fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4gcmVxdWlyZSgnLi9jbGFzc2llJyk7XG4gdmFyIFNpZGViYXJNZW51RWZmZWN0cyA9IChmdW5jdGlvbigpIHtcblxuIFx0ZnVuY3Rpb24gaGFzUGFyZW50Q2xhc3MoZSwgY2xhc3NuYW1lKSB7XG5cdFx0aWYoZSA9PT0gZG9jdW1lbnQpIHJldHVybiBmYWxzZTtcblx0XHRpZih3aW5kb3cuY2xhc3NpZS5oYXMoZSwgY2xhc3NuYW1lKSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBlLnBhcmVudE5vZGUgJiYgaGFzUGFyZW50Q2xhc3MoZS5wYXJlbnROb2RlLCBjbGFzc25hbWUpO1xuXHR9XG5cblx0Ly8gaHR0cDovL2NvdmVyb3ZlcmZsb3cuY29tL2EvMTEzODE3MzAvOTg5NDM5XG5cdGZ1bmN0aW9uIG1vYmlsZWNoZWNrKCkge1xuXHRcdHZhciBjaGVjayA9IGZhbHNlO1xuXHRcdChmdW5jdGlvbihhKXtpZigvKGFuZHJvaWR8aXBhZHxwbGF5Ym9va3xzaWxrfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgKGNlfHBob25lKXx4ZGF8eGlpbm8vaS50ZXN0KGEpfHwvMTIwN3w2MzEwfDY1OTB8M2dzb3w0dGhwfDUwWzEtNl1pfDc3MHN8ODAyc3xhIHdhfGFiYWN8YWMoZXJ8b298c1xcLSl8YWkoa298cm4pfGFsKGF2fGNhfGNvKXxhbW9pfGFuKGV4fG55fHl3KXxhcHR1fGFyKGNofGdvKXxhcyh0ZXx1cyl8YXR0d3xhdShkaXxcXC1tfHIgfHMgKXxhdmFufGJlKGNrfGxsfG5xKXxiaShsYnxyZCl8YmwoYWN8YXopfGJyKGV8dil3fGJ1bWJ8YndcXC0obnx1KXxjNTVcXC98Y2FwaXxjY3dhfGNkbVxcLXxjZWxsfGNodG18Y2xkY3xjbWRcXC18Y28obXB8bmQpfGNyYXd8ZGEoaXR8bGx8bmcpfGRidGV8ZGNcXC1zfGRldml8ZGljYXxkbW9ifGRvKGN8cClvfGRzKDEyfFxcLWQpfGVsKDQ5fGFpKXxlbShsMnx1bCl8ZXIoaWN8azApfGVzbDh8ZXooWzQtN10wfG9zfHdhfHplKXxmZXRjfGZseShcXC18Xyl8ZzEgdXxnNTYwfGdlbmV8Z2ZcXC01fGdcXC1tb3xnbyhcXC53fG9kKXxncihhZHx1bil8aGFpZXxoY2l0fGhkXFwtKG18cHx0KXxoZWlcXC18aGkocHR8dGEpfGhwKCBpfGlwKXxoc1xcLWN8aHQoYyhcXC18IHxffGF8Z3xwfHN8dCl8dHApfGh1KGF3fHRjKXxpXFwtKDIwfGdvfG1hKXxpMjMwfGlhYyggfFxcLXxcXC8pfGlicm98aWRlYXxpZzAxfGlrb218aW0xa3xpbm5vfGlwYXF8aXJpc3xqYSh0fHYpYXxqYnJvfGplbXV8amlnc3xrZGRpfGtlaml8a2d0KCB8XFwvKXxrbG9ufGtwdCB8a3djXFwtfGt5byhjfGspfGxlKG5vfHhpKXxsZyggZ3xcXC8oa3xsfHUpfDUwfDU0fFxcLVthLXddKXxsaWJ3fGx5bnh8bTFcXC13fG0zZ2F8bTUwXFwvfG1hKHRlfHVpfHhvKXxtYygwMXwyMXxjYSl8bVxcLWNyfG1lKHJjfHJpKXxtaShvOHxvYXx0cyl8bW1lZnxtbygwMXwwMnxiaXxkZXxkb3x0KFxcLXwgfG98dil8enopfG10KDUwfHAxfHYgKXxtd2JwfG15d2F8bjEwWzAtMl18bjIwWzItM118bjMwKDB8Mil8bjUwKDB8Mnw1KXxuNygwKDB8MSl8MTApfG5lKChjfG0pXFwtfG9ufHRmfHdmfHdnfHd0KXxub2soNnxpKXxuenBofG8yaW18b3AodGl8d3YpfG9yYW58b3dnMXxwODAwfHBhbihhfGR8dCl8cGR4Z3xwZygxM3xcXC0oWzEtOF18YykpfHBoaWx8cGlyZXxwbChheXx1Yyl8cG5cXC0yfHBvKGNrfHJ0fHNlKXxwcm94fHBzaW98cHRcXC1nfHFhXFwtYXxxYygwN3wxMnwyMXwzMnw2MHxcXC1bMi03XXxpXFwtKXxxdGVrfHIzODB8cjYwMHxyYWtzfHJpbTl8cm8odmV8em8pfHM1NVxcL3xzYShnZXxtYXxtbXxtc3xueXx2YSl8c2MoMDF8aFxcLXxvb3xwXFwtKXxzZGtcXC98c2UoYyhcXC18MHwxKXw0N3xtY3xuZHxyaSl8c2doXFwtfHNoYXJ8c2llKFxcLXxtKXxza1xcLTB8c2woNDV8aWQpfHNtKGFsfGFyfGIzfGl0fHQ1KXxzbyhmdHxueSl8c3AoMDF8aFxcLXx2XFwtfHYgKXxzeSgwMXxtYil8dDIoMTh8NTApfHQ2KDAwfDEwfDE4KXx0YShndHxsayl8dGNsXFwtfHRkZ1xcLXx0ZWwoaXxtKXx0aW1cXC18dFxcLW1vfHRvKHBsfHNoKXx0cyg3MHxtXFwtfG0zfG01KXx0eFxcLTl8dXAoXFwuYnxnMXxzaSl8dXRzdHx2NDAwfHY3NTB8dmVyaXx2aShyZ3x0ZSl8dmsoNDB8NVswLTNdfFxcLXYpfHZtNDB8dm9kYXx2dWxjfHZ4KDUyfDUzfDYwfDYxfDcwfDgwfDgxfDgzfDg1fDk4KXx3M2MoXFwtfCApfHdlYmN8d2hpdHx3aShnIHxuY3xudyl8d21sYnx3b251fHg3MDB8eWFzXFwtfHlvdXJ8emV0b3x6dGVcXC0vaS50ZXN0KGEuc3Vic3RyKDAsNCkpKWNoZWNrID0gdHJ1ZTt9KShuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHx3aW5kb3cub3BlcmEpO1xuXHRcdHJldHVybiBjaGVjaztcblx0fVxuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0dmFyIGNvbnRhaW5lciAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRlci1jb250YWluZXInKSxcblx0XHRcdCAgYnV0dG9uICAgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVUcmlnZ2VyJyksXG5cdFx0XHQgIGNsb3NlQnV0dG9uICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51Q2xvc2UnKSxcblx0XHRcdCAgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0LFxuXHRcdFx0ICBjb250ZW50UHVzaCAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudFB1c2hNYW5hZ2VyJyksXG5cdFx0XHQgIC8vIGV2ZW50IHR5cGUgKGlmIG1vYmlsZSB1c2UgdG91Y2ggZXZlbnRzKVxuXHRcdFx0ICBldmVudHR5cGUgICAgPSBtb2JpbGVjaGVjaygpID8gJ3RvdWNoc3RhcnQnIDogJ2NsaWNrJyxcblx0XHRcdFx0cmVzZXRNZW51ICAgID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0d2luZG93LmNsYXNzaWUucmVtb3ZlKCBjb250YWluZXIsICdzaWRlYmFyLW9wZW4nKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0Ym9keUNsaWNrRm4gID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0aWYoIWhhc1BhcmVudENsYXNzKGV2dC50YXJnZXQsICdzaWRlYmFyJykpIHtcblx0XHRcdFx0XHRcdHJlc2V0TWVudSgpO1xuXHRcdFx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHR5cGUsIGJvZHlDbGlja0ZuKTtcblx0XHRcdFx0XHR9XG5cdFx0fTtcblx0XHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihldmVudHR5cGUsIGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb250YWluZXIuY2xhc3NOYW1lID0gJ291dGVyLWNvbnRhaW5lcic7IC8vIGNsZWFyXG5cdFx0XHRzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0d2luZG93LmNsYXNzaWUuYWRkKGNvbnRhaW5lciwgJ3NpZGViYXItb3BlbicpO1xuXHRcdFx0fSwgMjUgKTtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnR0eXBlLCBib2R5Q2xpY2tGbik7XG5cdFx0fSk7XG5cdFx0Y2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihldmVudHR5cGUsIGZ1bmN0aW9uKGV2KSB7XG5cdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRjb250YWluZXIuY2xhc3NOYW1lID0gJ291dGVyLWNvbnRhaW5lcic7IC8vIGNsZWFyXG5cdFx0XHRzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcblx0XHRcdFx0d2luZG93LmNsYXNzaWUucmVtb3ZlKGNvbnRhaW5lciwgJ3NpZGViYXItb3BlbicpO1xuXHRcdFx0fSwgMjUgKTtcblx0XHR9KTtcblx0fVxuXG5cdGluaXQoKTtcblxufSkoKTtcblxufSx7XCIuL2NsYXNzaWVcIjozfV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgZnJvb2dhbG9vcCA9IHJlcXVpcmUoJ3ZpbWVvLWZyb29nYWxvb3AnKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gIHZhciB2aWRzcmMgPSAnaHR0cDovL3BsYXllci52aW1lby5jb20vdmlkZW8vMTExMDg1NDc2P3RpdGxlPTAmYW1wO2J5bGluZT0wJmFtcDtwb3J0cmFpdD0wJmFtcDtjb2xvcj1mZmZmZmYmYW1wO2FwaT0xJztcbiAgdmFyIGZyYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Z1bGxWaWRlbycpO1xuICBpZiAoZnJhbWUpIHtcbiAgICBmcmFtZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHZpZHNyYyk7XG4gICAgcGxheWVyID0gJGYoZnJhbWUpO1xuICAgIHZpZGVvQ29udHJvbCgpO1xuICB9XG59KTtcblxuZnVuY3Rpb24gdmlkZW9Db250cm9sKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VWaWRlbycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIHBsYXllci5hcGkoJ3BhdXNlJyk7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWN0aXZhdGVWaWRlbycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIHBsYXllci5hcGkoJ3BsYXknKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1vYmlsZVZpZGVvQ29udHJvbCgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjdGl2YXRlTW9iaWxlVmlkZW8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZnJhbWUuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG4gICAgZnJhbWUuc2V0QXR0cmlidXRlKCdzcmMnLCB2aWRzcmMpO1xuICAgIHZhciBwbGF5ZXIgPSAkZihmcmFtZSk7XG4gICAgcGxheWVyLmFwaShcInBsYXlcIik7XG4gIH0pO1xufVxufSx7XCJ2aW1lby1mcm9vZ2Fsb29wXCI6OH1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gSW5pdCBzdHlsZSBzaGFtZWxlc3NseSBzdG9sZW4gZnJvbSBqUXVlcnkgaHR0cDovL2pxdWVyeS5jb21cbnZhciBGcm9vZ2Fsb29wID0gKGZ1bmN0aW9uKCl7XG4gICAgLy8gRGVmaW5lIGEgbG9jYWwgY29weSBvZiBGcm9vZ2Fsb29wXG4gICAgZnVuY3Rpb24gRnJvb2dhbG9vcChpZnJhbWUpIHtcbiAgICAgICAgLy8gVGhlIEZyb29nYWxvb3Agb2JqZWN0IGlzIGFjdHVhbGx5IGp1c3QgdGhlIGluaXQgY29uc3RydWN0b3JcbiAgICAgICAgcmV0dXJuIG5ldyBGcm9vZ2Fsb29wLmZuLmluaXQoaWZyYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgZXZlbnRDYWxsYmFja3MgPSB7fSxcbiAgICAgICAgaGFzV2luZG93RXZlbnQgPSBmYWxzZSxcbiAgICAgICAgaXNSZWFkeSA9IGZhbHNlLFxuICAgICAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZSxcbiAgICAgICAgcGxheWVyRG9tYWluID0gJyc7XG5cbiAgICBGcm9vZ2Fsb29wLmZuID0gRnJvb2dhbG9vcC5wcm90b3R5cGUgPSB7XG4gICAgICAgIGVsZW1lbnQ6IG51bGwsXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24oaWZyYW1lKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGlmcmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlmcmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGlmcmFtZTtcblxuICAgICAgICAgICAgLy8gUmVnaXN0ZXIgbWVzc2FnZSBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgICAgIHBsYXllckRvbWFpbiA9IGdldERvbWFpbkZyb21VcmwodGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcblxuICAgICAgICAvKlxuICAgICAgICAgKiBDYWxscyBhIGZ1bmN0aW9uIHRvIGFjdCB1cG9uIHRoZSBwbGF5ZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgVGhlIG5hbWUgb2YgdGhlIEphdmFzY3JpcHQgQVBJIG1ldGhvZCB0byBjYWxsLiBFZzogJ3BsYXknLlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSB2YWx1ZU9yQ2FsbGJhY2sgcGFyYW1zIEFycmF5IG9mIHBhcmFtZXRlcnMgdG8gcGFzcyB3aGVuIGNhbGxpbmcgYW4gQVBJIG1ldGhvZFxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgY2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgbWV0aG9kIHJldHVybnMgYSB2YWx1ZS5cbiAgICAgICAgICovXG4gICAgICAgIGFwaTogZnVuY3Rpb24obWV0aG9kLCB2YWx1ZU9yQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50IHx8ICFtZXRob2QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc2VsZi5lbGVtZW50LFxuICAgICAgICAgICAgICAgIHRhcmdldF9pZCA9IGVsZW1lbnQuaWQgIT09ICcnID8gZWxlbWVudC5pZCA6IG51bGwsXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gIWlzRnVuY3Rpb24odmFsdWVPckNhbGxiYWNrKSA/IHZhbHVlT3JDYWxsYmFjayA6IG51bGwsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBpc0Z1bmN0aW9uKHZhbHVlT3JDYWxsYmFjaykgPyB2YWx1ZU9yQ2FsbGJhY2sgOiBudWxsO1xuXG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgY2FsbGJhY2sgZm9yIGdldCBmdW5jdGlvbnNcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHN0b3JlQ2FsbGJhY2sobWV0aG9kLCBjYWxsYmFjaywgdGFyZ2V0X2lkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9zdE1lc3NhZ2UobWV0aG9kLCBwYXJhbXMsIGVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcbiAgICAgICAgICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIGFuZCBhIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgZmlyZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBldmVudE5hbWUgKFN0cmluZyk6IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiBmb3IuXG4gICAgICAgICAqIEBwYXJhbSBjYWxsYmFjayAoRnVuY3Rpb24pOiBGdW5jdGlvbiB0aGF0IHNob3VsZCBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgZmlyZXMuXG4gICAgICAgICAqL1xuICAgICAgICBhZGRFdmVudDogZnVuY3Rpb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc2VsZi5lbGVtZW50LFxuICAgICAgICAgICAgICAgIHRhcmdldF9pZCA9IGVsZW1lbnQuaWQgIT09ICcnID8gZWxlbWVudC5pZCA6IG51bGw7XG5cblxuICAgICAgICAgICAgc3RvcmVDYWxsYmFjayhldmVudE5hbWUsIGNhbGxiYWNrLCB0YXJnZXRfaWQpO1xuXG4gICAgICAgICAgICAvLyBUaGUgcmVhZHkgZXZlbnQgaXMgbm90IHJlZ2lzdGVyZWQgdmlhIHBvc3RNZXNzYWdlLiBJdCBmaXJlcyByZWdhcmRsZXNzLlxuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSAhPSAncmVhZHknKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2UoJ2FkZEV2ZW50TGlzdGVuZXInLCBldmVudE5hbWUsIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZXZlbnROYW1lID09ICdyZWFkeScgJiYgaXNSZWFkeSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwobnVsbCwgdGFyZ2V0X2lkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLypcbiAgICAgICAgICogVW5yZWdpc3RlcnMgYW4gZXZlbnQgbGlzdGVuZXIgdGhhdCBnZXRzIGNhbGxlZCB3aGVuIHRoZSBldmVudCBmaXJlcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGV2ZW50TmFtZSAoU3RyaW5nKTogTmFtZSBvZiB0aGUgZXZlbnQgdG8gc3RvcCBsaXN0ZW5pbmcgZm9yLlxuICAgICAgICAgKi9cbiAgICAgICAgcmVtb3ZlRXZlbnQ6IGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc2VsZi5lbGVtZW50LFxuICAgICAgICAgICAgICAgIHRhcmdldF9pZCA9IGVsZW1lbnQuaWQgIT09ICcnID8gZWxlbWVudC5pZCA6IG51bGwsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZCA9IHJlbW92ZUNhbGxiYWNrKGV2ZW50TmFtZSwgdGFyZ2V0X2lkKTtcblxuICAgICAgICAgICAgLy8gVGhlIHJlYWR5IGV2ZW50IGlzIG5vdCByZWdpc3RlcmVkXG4gICAgICAgICAgICBpZiAoZXZlbnROYW1lICE9ICdyZWFkeScgJiYgcmVtb3ZlZCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKCdyZW1vdmVFdmVudExpc3RlbmVyJywgZXZlbnROYW1lLCBlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHBvc3RpbmcgYSBtZXNzYWdlIHRvIHRoZSBwYXJlbnQgd2luZG93LlxuICAgICAqXG4gICAgICogQHBhcmFtIG1ldGhvZCAoU3RyaW5nKTogbmFtZSBvZiB0aGUgbWV0aG9kIHRvIGNhbGwgaW5zaWRlIHRoZSBwbGF5ZXIuIEZvciBhcGkgY2FsbHNcbiAgICAgKiB0aGlzIGlzIHRoZSBuYW1lIG9mIHRoZSBhcGkgbWV0aG9kIChhcGlfcGxheSBvciBhcGlfcGF1c2UpIHdoaWxlIGZvciBldmVudHMgdGhpcyBtZXRob2RcbiAgICAgKiBpcyBhcGlfYWRkRXZlbnRMaXN0ZW5lci5cbiAgICAgKiBAcGFyYW0gcGFyYW1zIChPYmplY3Qgb3IgQXJyYXkpOiBMaXN0IG9mIHBhcmFtZXRlcnMgdG8gc3VibWl0IHRvIHRoZSBtZXRob2QuIENhbiBiZSBlaXRoZXJcbiAgICAgKiBhIHNpbmdsZSBwYXJhbSBvciBhbiBhcnJheSBsaXN0IG9mIHBhcmFtZXRlcnMuXG4gICAgICogQHBhcmFtIHRhcmdldCAoSFRNTEVsZW1lbnQpOiBUYXJnZXQgaWZyYW1lIHRvIHBvc3QgdGhlIG1lc3NhZ2UgdG8uXG4gICAgICovXG4gICAgZnVuY3Rpb24gcG9zdE1lc3NhZ2UobWV0aG9kLCBwYXJhbXMsIHRhcmdldCkge1xuICAgICAgICBpZiAoIXRhcmdldC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdXJsID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnc3JjJykuc3BsaXQoJz8nKVswXSxcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcmFtc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHVybC5zdWJzdHIoMCwgMikgPT09ICcvLycpIHtcbiAgICAgICAgICAgIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArIHVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldC5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKGRhdGEsIHVybCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgdGhhdCBmaXJlcyB3aGVuZXZlciB0aGUgd2luZG93IHJlY2VpdmVzIGEgbWVzc2FnZSBmcm9tIGl0cyBwYXJlbnRcbiAgICAgKiB2aWEgd2luZG93LnBvc3RNZXNzYWdlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9uTWVzc2FnZVJlY2VpdmVkKGV2ZW50KSB7XG4gICAgICAgIHZhciBkYXRhLCBtZXRob2Q7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgbWV0aG9kID0gZGF0YS5ldmVudCB8fCBkYXRhLm1ldGhvZDtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKSAge1xuICAgICAgICAgICAgLy9mYWlsIHNpbGVudGx5Li4uIGxpa2UgYSBuaW5qYSFcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZXRob2QgPT0gJ3JlYWR5JyAmJiAhaXNSZWFkeSkge1xuICAgICAgICAgICAgaXNSZWFkeSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGVzIG1lc3NhZ2VzIGZyb20gbW9vZ2Fsb29wIG9ubHlcbiAgICAgICAgaWYgKGV2ZW50Lm9yaWdpbiAhPSBwbGF5ZXJEb21haW4pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB2YWx1ZSA9IGRhdGEudmFsdWUsXG4gICAgICAgICAgICBldmVudERhdGEgPSBkYXRhLmRhdGEsXG4gICAgICAgICAgICB0YXJnZXRfaWQgPSB0YXJnZXRfaWQgPT09ICcnID8gbnVsbCA6IGRhdGEucGxheWVyX2lkLFxuXG4gICAgICAgICAgICBjYWxsYmFjayA9IGdldENhbGxiYWNrKG1ldGhvZCwgdGFyZ2V0X2lkKSxcbiAgICAgICAgICAgIHBhcmFtcyA9IFtdO1xuXG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnREYXRhKSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChldmVudERhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldF9pZCkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2godGFyZ2V0X2lkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJhbXMubGVuZ3RoID4gMCA/IGNhbGxiYWNrLmFwcGx5KG51bGwsIHBhcmFtcykgOiBjYWxsYmFjay5jYWxsKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTdG9yZXMgc3VibWl0dGVkIGNhbGxiYWNrcyBmb3IgZWFjaCBpZnJhbWUgYmVpbmcgdHJhY2tlZCBhbmQgZWFjaFxuICAgICAqIGV2ZW50IGZvciB0aGF0IGlmcmFtZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudE5hbWUgKFN0cmluZyk6IE5hbWUgb2YgdGhlIGV2ZW50LiBFZy4gYXBpX29uUGxheVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAoRnVuY3Rpb24pOiBGdW5jdGlvbiB0aGF0IHNob3VsZCBnZXQgZXhlY3V0ZWQgd2hlbiB0aGVcbiAgICAgKiBldmVudCBpcyBmaXJlZC5cbiAgICAgKiBAcGFyYW0gdGFyZ2V0X2lkIChTdHJpbmcpIFtPcHRpb25hbF06IElmIGhhbmRsaW5nIG1vcmUgdGhhbiBvbmUgaWZyYW1lIHRoZW5cbiAgICAgKiBpdCBzdG9yZXMgdGhlIGRpZmZlcmVudCBjYWxsYmFja3MgZm9yIGRpZmZlcmVudCBpZnJhbWVzIGJhc2VkIG9uIHRoZSBpZnJhbWUnc1xuICAgICAqIGlkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHN0b3JlQ2FsbGJhY2soZXZlbnROYW1lLCBjYWxsYmFjaywgdGFyZ2V0X2lkKSB7XG4gICAgICAgIGlmICh0YXJnZXRfaWQpIHtcbiAgICAgICAgICAgIGlmICghZXZlbnRDYWxsYmFja3NbdGFyZ2V0X2lkXSkge1xuICAgICAgICAgICAgICAgIGV2ZW50Q2FsbGJhY2tzW3RhcmdldF9pZF0gPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50Q2FsbGJhY2tzW3RhcmdldF9pZF1bZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXZlbnRDYWxsYmFja3NbZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHN0b3JlZCBjYWxsYmFja3MuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0Q2FsbGJhY2soZXZlbnROYW1lLCB0YXJnZXRfaWQpIHtcbiAgICAgICAgaWYgKHRhcmdldF9pZCkge1xuICAgICAgICAgICAgcmV0dXJuIGV2ZW50Q2FsbGJhY2tzW3RhcmdldF9pZF1bZXZlbnROYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBldmVudENhbGxiYWNrc1tldmVudE5hbWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQ2FsbGJhY2soZXZlbnROYW1lLCB0YXJnZXRfaWQpIHtcbiAgICAgICAgaWYgKHRhcmdldF9pZCAmJiBldmVudENhbGxiYWNrc1t0YXJnZXRfaWRdKSB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50Q2FsbGJhY2tzW3RhcmdldF9pZF1bZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50Q2FsbGJhY2tzW3RhcmdldF9pZF1bZXZlbnROYW1lXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWV2ZW50Q2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudENhbGxiYWNrc1tldmVudE5hbWVdID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBkb21haW4ncyByb290IGRvbWFpbi5cbiAgICAgKiBFZy4gcmV0dXJucyBodHRwOi8vdmltZW8uY29tIHdoZW4gaHR0cDovL3ZpbWVvLmNvbS9jaGFubmVscyBpcyBzYnVtaXR0ZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB1cmwgKFN0cmluZyk6IFVybCB0byB0ZXN0IGFnYWluc3QuXG4gICAgICogQHJldHVybiB1cmwgKFN0cmluZyk6IFJvb3QgZG9tYWluIG9mIHN1Ym1pdHRlZCB1cmxcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXREb21haW5Gcm9tVXJsKHVybCkge1xuICAgICAgICBpZiAodXJsLnN1YnN0cigwLCAyKSA9PT0gJy8vJykge1xuICAgICAgICAgICAgdXJsID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgdXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVybF9waWVjZXMgPSB1cmwuc3BsaXQoJy8nKSxcbiAgICAgICAgICAgIGRvbWFpbl9zdHIgPSAnJztcblxuICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW5ndGggPSB1cmxfcGllY2VzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihpPDMpIHtkb21haW5fc3RyICs9IHVybF9waWVjZXNbaV07fVxuICAgICAgICAgICAgZWxzZSB7YnJlYWs7fVxuICAgICAgICAgICAgaWYoaTwyKSB7ZG9tYWluX3N0ciArPSAnLyc7fVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRvbWFpbl9zdHI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuICEhKG9iaiAmJiBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNhbGwgJiYgb2JqLmFwcGx5KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc0FycmF5KG9iaikge1xuICAgICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH1cblxuICAgIC8vIEdpdmUgdGhlIGluaXQgZnVuY3Rpb24gdGhlIEZyb29nYWxvb3AgcHJvdG90eXBlIGZvciBsYXRlciBpbnN0YW50aWF0aW9uXG4gICAgRnJvb2dhbG9vcC5mbi5pbml0LnByb3RvdHlwZSA9IEZyb29nYWxvb3AuZm47XG5cbiAgICAvLyBMaXN0ZW5zIGZvciB0aGUgbWVzc2FnZSBldmVudC5cbiAgICAvLyBXM0NcbiAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2VSZWNlaXZlZCwgZmFsc2UpO1xuICAgIH1cbiAgICAvLyBJRVxuICAgIGVsc2Uge1xuICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoJ29ubWVzc2FnZScsIG9uTWVzc2FnZVJlY2VpdmVkKTtcbiAgICB9XG5cbiAgICAvLyBFeHBvc2UgZnJvb2dhbG9vcCB0byB0aGUgZ2xvYmFsIG9iamVjdFxuICAgIHJldHVybiAod2luZG93LkZyb29nYWxvb3AgPSB3aW5kb3cuJGYgPSBGcm9vZ2Fsb29wKTtcblxufSkoKTtcblxufSx7fV19LHt9LFsxXSk7XG4iXSwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9