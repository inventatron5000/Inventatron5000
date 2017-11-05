$(document).ready(function(){
    $(".dropdown-button").dropdown({
        belowOrigin: true
    });
    $(".button-collapse").sideNav();
    $(".collapsible").collapsible();
    $("#stock-collapsible").click(function(){
         $('.collapsible').collapsible('open', 0);
    });
});