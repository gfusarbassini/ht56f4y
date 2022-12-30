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

});