$(document).ready(function () {

  $("nav.sidenav").hover(
    function () {
      let widths = ($(".nav-text").map(function () {
        return $(this).width();
      }));
      let maxwidth = Math.max.apply(null, widths);
      let width = 100 + maxwidth;
      $("nav.sidenav").css("max-width", width);
      $(".nav-text").css("opacity", 1);
    },
    function () {
      $("nav.sidenav").css("max-width", 80);
      $(".nav-text").css("opacity", 0);
    }
  );


  $("html").on("click", ".card", function(evt) {
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
    console.log(startingColor);
    var animationStep = function(timestamp) {
      if (!animationStart) {
        animationStart = timestamp;
      }

      var frame = timestamp - animationStart;
      if (frame < duration) {
        var easing = (frame/duration) * (2 - (frame/duration));

        var circle = "circle at " + x + "px " + y + "px";

        var color = "rgba(" + startingColorString + ", " + (0.3 * (1 - easing)) + ")";
        console.log(color);
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
});