// default first dot
$(".dot").eq(0).addClass("activeDot");
let selection = 1;

function changeSelection(selection) {
    if (selection == 1) {
        $(".card2").removeClass("cardActive").addClass("cardUnactive");
        $(".card3").removeClass("cardActive").addClass("cardUnactive");
        $(".card1").removeClass("cardUnactive").addClass("cardActive");
    } else if( selection == 2) {
        $(".card1").removeClass("cardActive").addClass("cardUnactive");
        $(".card3").removeClass("cardActive").addClass("cardUnactive");
        $(".card2").removeClass("cardUnactive").addClass("cardActive");
    } else if ( selection == 3) {
        $(".card1").removeClass("cardActive").addClass("cardUnactive");
        $(".card2").removeClass("cardActive").addClass("cardUnactive");
        $(".card3").removeClass("cardUnactive").addClass("cardActive");
    }

    // Stop the video
    $('.ytVideo').each(function(){
        this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
    });
}


// Change dots
$(".dot").click(function(){
    $(".dot").removeClass("activeDot");
    $(this).addClass("activeDot");

    selection = $(this).index() + 1;

    changeSelection(selection);
    changeArrows();
    setTimeout(function(){  changeArrows(); }, 300)
})

$(document).ready(function(){ 
    changeArrows(load=true);
})


function changeArrows(load=false) {
    var left = $(".leftArrow");
    var right = $(".rightArrow");

    if (load) {
        left.stop(true, true).animate({left: "300px", opacity: 0}, 0);
        right.stop(true, true).animate({left: "-300px", opacity: 0}, 0);
    }

    if (selection == 1) {
        left.stop(true, true).animate({left: "300px", opacity: 0}, 400);
        right.stop(true, true).animate({left: "-300px", top: "-25px", opacity: 0}, 400, function(){
            setTimeout(function(){   
                right.animate({left: "0px", top: "0px", opacity: 1}, 400);
            }, 300)
        });
    } else if (selection == 3) {
        left.stop(true, true).animate({left: "300px",top: "25px", opacity: 0}, 400, function(){
            setTimeout(function(){   
                left.animate({left: "0px", opacity: 1}, 400);
            }, 300)
        });
        right.stop(true, true).animate({left: "-300px", opacity: 0}, 400);
    } else {
        left.stop(true, true).animate({left: "300px", opacity: 0}, 400, function(){
            setTimeout(function(){   
                left.animate({left: "0px", opacity: 1}, 400);
            }, 300)
        });
        right.stop(true, true).animate({left: "-300px", opacity: 0}, 400, function(){
            setTimeout(function(){   
                right.animate({left: "0px", top: "0px", opacity: 1}, 400);
            }, 300)
        });
    }
}

$(".rightArrow").click(function(){
    selection++;

    if (selection > 3) {
        selection = 3;
    }
    changeArrows();

    $(".dot").removeClass("activeDot");
    $(".dot").eq(selection - 1).addClass("activeDot");
    changeSelection(selection);
})

$(".leftArrow").click(function(){
    selection--;

    if (selection < 1) {
        selection = 1;
    }

    changeArrows();

    $(".dot").removeClass("activeDot");
    $(".dot").eq(selection - 1).addClass("activeDot");

    changeSelection(selection);
})