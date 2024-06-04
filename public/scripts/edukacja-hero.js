var form = $(".heroForm");
var fg = $(".fg");
var bg = $("#edukacjaHero");
var text = $(".heroText");

// For smooth sroll to list
$("#edukacjaHero .heroButton1").click(function(){
    $('html, body').animate({
            scrollTop: $('#oferta').offset().top
        }, 'slow');
})

$("#oleje-hero .heroButton1").click(function(){
    $('html, body').animate({
            scrollTop: $('#olejeOferta').offset().top -100
        }, 'slow');
})

$("#narzedziaHero .heroButton1").click(function(){
    $('html, body').animate({
            scrollTop: $('#narzedziaOferta').offset().top
        }, 'slow');
})

//  For Contact Form
$(".heroButton2").click(function(){
    // redirect to contact
    window.location.href = "/kontakt";

    // Coming Soon - contact form appear from one of side and replacing the main text with the ability to go back to main text
    // if (!form.hasClass("heroFormShow")) {
    //     // show
    //     form.removeClass("heroFormHide").addClass("heroFormShow");
    //     fg.removeClass("fg2FormHide").addClass("fg2FormShow");
    //     bg.removeClass("bgBack").addClass("bgMove");
    //     text.removeClass("heroTextHide").addClass("heroTextShow");
    // } else {
    //     // hide
    //     form.removeClass("heroFormShow").addClass("heroFormHide");
    //     fg.removeClass("fg2FormShow").addClass("fg2FormHide");
    //     bg.removeClass("bgMove").addClass("bgBack");
    //     text.removeClass("heroTextShow").addClass("heroTextHide");
    // }
})


// Change Position of background on scroll
// $(window).scroll(function(){
//     var scrollTop = $(this).scrollTop();

//     var winWidth = $(window).width();
//     var sectionHeight = 1500

//     var scrollTopPercent = scrollTop / sectionHeight * 100;
    
//     var scrollCoefficient = 0.3;

//     if (winWidth > 1000) scrollCoefficient = 0.4;
//     if (winWidth > 1200) scrollCoefficient = 0.6;
//     if (winWidth > 1500) scrollCoefficient = 0.8;
//     if (winWidth > 1700) scrollCoefficient = 1;
//     if (winWidth > 1900) scrollCoefficient = 1.2;
//     if (winWidth > 2100) scrollCoefficient = 1.4;


//     scrollTopPercent *= scrollCoefficient;


//     var newBackgroundPosition = (100 - scrollTopPercent) + "% bottom";
//     $('#edukacjaHero').css('background-position', newBackgroundPosition);
// });