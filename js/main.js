
$.fn.maxWidth = function () {
  let widths = ($(this).map(function () {
    return $(this).width();
  }));
  return Math.max.apply(null, widths);

};

$(document).ready(function () {
  const mediaQuery = window.matchMedia('(min-width: 600px)');
  if (mediaQuery.matches) {
    $("nav.sidenav").hover(function (){
      let width = 100 + $(".nav-text").maxWidth();
        $("nav.sidenav").css("max-width", width);
      $(".nav-text").css("opacity", 1);
      },
      function () {
        $("nav.sidenav").css("max-width", 80);
        $(".nav-text").css("opacity", 0);
    }
    );
  }




  $("html").on("click", ".card, .ripple", function(evt) {
    var btn = $(evt.currentTarget);
    var x = evt.pageX - btn.offset().left;
    var y = evt.pageY - btn.offset().top;

    var duration = 1000;
    var animationFrame, animationStart;
    var colorString = btn.css("background-color");
    if (colorString.indexOf('rgba') === -1)
      colorString += ',1';
    var startingColor =  colorString.match(/[\.\d]+/g).map(function (a)
        {
            return +a*0.45
    });
    startingColorString = startingColor[0] + "," + startingColor[1] + "," + startingColor[2];

    var animationStep = function(timestamp) {
      if (!animationStart) {
        animationStart = timestamp;
      }

      var frame = timestamp - animationStart;
      if (frame < duration) {
        var easing = (frame/duration) * (2 - (frame/duration));

        var circle = "circle at " + x + "px " + y + "px";

        var color = "rgba(" + startingColorString + ", " + (0.3 * (1 - easing)) + ")";

        var stop = 90 * easing + "%";

        btn.css({
          "background-image": "radial-gradient(" + circle + ", " + color + " " + stop + ", transparent " + stop + ")"
        });

        animationFrame = window.requestAnimationFrame(animationStep);
      } else {
        $(btn).css({
          "background-image": "none"
        });
        window.cancelAnimationFrame(animationFrame);
      }

    };

    animationFrame = window.requestAnimationFrame(animationStep);

  });



  $("html").on("click", ".accordion-header", function () {
    const mediaQuery = window.matchMedia('(max-width: 992px)')
// Check if the media query is true
    if (mediaQuery.matches) {
      // Then trigger an alert

      var container = $(".accordion-content", $(this).parent());
      if (!container.hasClass("expanded")) {
        var heights = $(container).find("> div").map(
          function () {
            return +$(this).outerHeight(true);
          }).get().reduce((acc, cur) => acc + cur, 0);
        $(".activity-container.expanded").css("height", "0px").removeClass("collapsed").addClass("expanded");
        $(".accordion-header").removeClass("collapsed").addClass("expanded")
        container.css("height", heights + "px").removeClass("collapsed").addClass("expanded");
        if ($("body").scrollTop() > $(this).offset().top) {
          $("body").animate({ scrollTop: $(this).offset().top - 50 }, 'ease');
        }
      } else {
        container.css("height", "0px").addClass("collapsed").removeClass("expanded");
        $(".accordion-header").addClass("collapsed").removeClass("expanded");
      }

    }
  });


  $(".nav-trigger").on("click", function () {
    let width = 100 + $(".nav-text").maxWidth();
    $("nav.sidenav").css("max-width", width);
    $(".nav-text").css("opacity", 1);
    $(".sidenav").css("left", 0);
    width = 100 + $(".nav-text").maxWidth();
    console.log(width);
    $(".overlay").fadeIn();
  });

  $(".nav-close, .overlay").on("click", function () {
    $(".sidenav").css({ "left": "-100vw" });
    $(".overlay").fadeOut();
  });
});