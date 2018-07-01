/**
 * site
 */
var site = site || {};

/**
 *
 */
var PATH = (function() {
  var scripts = document.getElementsByTagName('script');
  var src = scripts[scripts.length - 1].getAttribute('src');
  var index = src.lastIndexOf('/');
  return (index !== -1) ? src.substring(0, index) : '';
})();

/*
 *
 */
var LAYOUT = $('.u-mediaquery').css('font-family').replace(/"/g, '');
window.addEventListener('resize', function(e) {
  LAYOUT = $('.u-mediaquery').css('font-family').replace(/"/g, '');
});

/**
 * IE
 */
var ua, isIE, array, version;
// UserAgetn
ua = window.navigator.userAgent.toLowerCase();
// IE
isIE = (ua.indexOf('msie') >= 0 || ua.indexOf('trident') >= 0);
// IE
if (isIE) {
  array = /(msie|rv:?)\s?([\d\.]+)/.exec(ua);
  version = (array) ? array[2] : '';
  $('body').addClass('ie' + Math.floor(version));
}


/**
 *
 *
 * @param jQuery $ jQuery
 * @require jQuery v1.7.2
 * @require jQuery Easing v1.3
 */
site.setSmoothScroll = function($) {
  var $page = $('html, body');
  $('a[href^="#"], area[href^="#"]').not('a[data-rel="trigger"]').on('click', function(e) {
    e.preventDefault();
    var offset = $($(this).attr('href')).offset();
    var destination = (offset !== undefined) ? offset.top - 100 : 0;
    TweenMax.to(window, 2, {
      scrollTo: destination
    }).duration(0.8);
    window.history.pushState(null, null, this.hash);
  });
}

/**
 *
 *
 * @param jQuery $ jQuery
 * @require jQuery v1.7.2
 */
site.setLinkNewWindow = function($) {
  var $targets = $('a[href^="http://"], a[href^="https://"], a[data-rel="external"]').not('a[href^="http://' + location.hostname + '"], a[href^="https://' + location.hostname + '"], a[data-rel="trigger"]');
  $targets.on('click', function() {
    open($(this).attr('href'), null);
    return false;
  });
}

/**
 *
 *
 * @param jQuery $ jQuery
 * @require jQuery v1.7.2
 */
site.setAccordion = function($) {
  var trigger = '.js-accordion-trigger';
  var content = '.js-accordion-content';
  var wrapper = '.js-accordion';
  var containerHeight;

  if (!$(trigger)[0]) {
    return;
  }

  var checkState = function() {
    $(trigger).each(function(index, el) {
      if ($(el).hasClass('is-active')) {
        $(el).siblings(content).show();
      } else {
        $(el).siblings(content).hide();
        //containerHeight = $(this).closest(wrapper).innerHeight();
      }
    });
  }

  // init
  checkState();

  $(trigger).each(function(index, el) {
    $(el).on('click', function(e) {
      e.preventDefault();

      $(this).toggleClass('is-active');
      if ($(this).hasClass('is-active')) {
        $(this).siblings(content).slideDown(500);
      } else {
        var targetOffset = $(this).closest(wrapper).offset().top;
        $(this).siblings(content).slideUp(500);
        if (LAYOUT === 'mobile') {
          //$('html').velocity('scroll', { duration: 750, offset: targetOffset - 20 });
          TweenMax.to(window, 2, {
            scrollTo: targetOffset - 20
          });
        }
      }
    });
  });
}

/**
 *
 *
 * @param jQuery $ jQuery
 * @require jQuery v1.7.2
 */
site.setHeader = function($) {
  var $header = $('.l-header');
  var $trigger = $('.l-header__btn');
  var $nav = $('.l-header__nav');

  $trigger.on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    $header.toggleClass('is-active');
    $nav.toggleClass('is-active');
  });
}

/**
 *
 *
 * @param jQuery $ jQuery
 * @require jQuery v1.7.2
 */
site.setLine = function($) {
  var visibleClass = 'is-transparent';
  //
  var logos = document.querySelectorAll('.l-logo-container');
  var images = document.querySelectorAll('.l-logo-container');
  var image = logos[0];
  var windowHeight = window.innerHeight;
  var areaHeight = logos[0].clientHeight;
  var imageHeight = image.clientHeight;
  if (LAYOUT === "mobile") {
    var threshold = imageHeight - areaHeight - (windowHeight / 4);
  } else {
    var threshold = imageHeight - areaHeight - (windowHeight / 1.5);
  }
  var toggleClass = function() {
    document.querySelector('.l-bg').classList.toggle(visibleClass);
  };
  document.querySelector('.l-bg').classList.add(visibleClass);
  var setInvisible = new Hunt(images, {
    enter: toggleClass,
    out: toggleClass,
    persist: true,
    offset: threshold
  });

  //
  var index = 0;
  var scenes = document.querySelectorAll('.l-bg__svg');
  var variation = scenes.length;
  var INTERVAL = 1;
  var lineAnims = [];
  /* var easing = function (x) {
  	var randomNum = Math.round(Math.random() * 1000) / 1000;
  	return x + ( x - Math.cos(0.1) + 1);
  }; */ //
  var callback = function() {
    TweenMax.to(scenes[index], INTERVAL, {
      opacity: 0,
      ease: Back.easeOut
    });
    setTimeout(function() {
      index = (index + 1) % variation;
      playAnim(index);
    }, INTERVAL * 2000); //
  };
  var playAnim = function(i) {
    TweenMax.to(scenes[i], INTERVAL, {
      opacity: 1,
      ease: Back.easeOut
    });
    var line = new Vivus('line' + (i + 1), {
      duration: 300,
      animTimingFunction: Vivus.EASE_OUT_BOUNCE
    }, callback);
  };
  setTimeout(function() {
    playAnim(index);
  }, 1800);
}

/**
 * animate
 *
 * @param jQuery $ jQuery

 * @require create.js
 */
site.setupAnimate = function($) {
  this.init = function(c, a, d, l, e, r) {
    canvas = c;
    anim_container = a;
    dom_overlay_container = d;
    handleComplete(l, e, r);
  }

  function handleComplete(l, e, r) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    exportRoot = e;
    stage = new createjs.Stage(canvas);
    stage.addChild(exportRoot);
    //Registers the "tick" event listener.
    fnStartAnimation = function() {
      createjs.Ticker.setFPS(l.properties.fps);
      createjs.Ticker.addEventListener("tick", stage);
    }
    //Code to support hidpi screens and responsive scaling.
    function makeResponsive(isResp, respDim, isScale, scaleType) {
      var lastW, lastH, lastS = 1;
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      function resizeCanvas() {
        var w = l.properties.width,
          h = l.properties.height;
        var iw = document.body.clientWidth * r,
          ih = document.body.clientHeight * r;
        var pRatio = window.devicePixelRatio || 1,
          xRatio = iw / w,
          yRatio = ih / h,
          sRatio = 1;
        LAYOUT = $('.u-mediaquery').css('font-family').replace(/"/g, '');
        if (LAYOUT === "mobile") {
          if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
            sRatio = lastS;
          } else if (LAYOUT === 'desktop') {
            if (iw < w || ih < h)
              sRatio = Math.min(xRatio, yRatio);
          } else if (scaleType == 1) {
            sRatio = Math.min(xRatio, yRatio);
          } else if (scaleType == 2) {
            sRatio = Math.max(xRatio, yRatio);
          }
        }
        canvas.width = w * pRatio * sRatio;
        canvas.height = h * pRatio * sRatio;
        canvas.style.width = dom_overlay_container.style.width = anim_container.style.width = w * sRatio + 'px';
        canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h * sRatio + 'px';
        stage.scaleX = pRatio * sRatio;
        stage.scaleY = pRatio * sRatio;
        lastW = iw;
        lastH = ih;
        lastS = sRatio;
      }
    }
    makeResponsive(true, 'both', true, 1);
    fnStartAnimation();
  }
}

/**
 *
 *
 * @param jQuery $ jQuery
 * @require jQuery v1.7.2
 * @require create.js
 */
site.setMainLogo = function($, isActive) {
  var anim = new site.setupAnimate($);
  //
  var first_canvas = document.querySelector('#firstLogo');
  var main_overlay = document.querySelector('.l-logo-overlay');
  var obj = new lib_long_1.logo_long1();

  $(window).on('load', function(e) {
    TweenMax.to(window, 0.1, {
      scrollTo: 0
    });
  });

  this.showLogo = function(target, lib, exportroot, overlay) {
    var createjs_s = createjs_s || {};
    var createjs = createjs_s;
    var anim_container = target;
    var dom_overlay = overlay;
    var this_lib = lib;
    var this_exportroot = exportroot;
    var ratio = 1;
    anim.init(target, anim_container, dom_overlay, this_lib, this_exportroot, ratio);
  }
  this.hideLogo = function(target, lib, exportroot, overlay) {
    var createjs_s = createjs_s || {};
    var createjs = createjs_s;
    var anim_container = target;
    var dom_overlay = overlay;
    var this_lib = lib;
    var this_exportroot = exportroot;
    var ratio = 1;
    anim.init(target, anim_container, dom_overlay, this_lib, this_exportroot, ratio);
    this_exportroot.gotoAndPlay(76);
  }

  if (isActive === true) {
    this.showLogo(first_canvas, lib_long_1, obj, main_overlay);
  }

}


/**
 *
 *
 * @param jQuery $ jQuery
 * @require jQuery v1.7.2
 * @require create.js
 */
site.setHeadLogoToggle = function($, isActive) {
  var anim = new site.setupAnimate($);

  var head_canvas = document.querySelector('#headLogo');
  var main_overlay = document.querySelector('.l-header__logo__overlay');
  var obj = new lib_head_e.head_logo();
  var showLogo = function(target, lib, exportroot, overlay) {
    var createjs_s = createjs_s || {};
    var createjs = createjs_s;
    var anim_container = target;
    var dom_overlay = overlay;
    var this_lib = lib;
    var this_exportroot = exportroot;
    var ratio = 1;
    anim.init(target, anim_container, dom_overlay, this_lib, this_exportroot, ratio);
  }
  var hideLogo = function(target, lib, exportroot, overlay) {
    var createjs_s = createjs_s || {};
    var createjs = createjs_s;
    var anim_container = target;
    var dom_overlay = overlay;
    var this_lib = lib;
    var this_exportroot = exportroot;
    var ratio = 1;
    anim.init(target, anim_container, dom_overlay, this_lib, this_exportroot, ratio);
    this_exportroot.gotoAndPlay(45);
  }
  if (isActive === true) {
    showLogo(head_canvas, lib_head_e, obj, main_overlay);
  } else {
    hideLogo(head_canvas, lib_head_e, obj, main_overlay);
  }
}

/**
 *
 *
 * @require jQuery v1.7.2
 */
jQuery(function($) {
  site.setSmoothScroll($);
  site.setLinkNewWindow($);
  site.setAccordion($);
  site.setHeader($);
  site.setLine($);
  site.setMainLogo($, true);
});
