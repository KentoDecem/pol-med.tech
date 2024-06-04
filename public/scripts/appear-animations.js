// Function that check visibility
function checkVisibility() {
    // Function that check the visibility of element and add animation class
    function checkAndAddClass(selector, chosenClass) {
        $(selector).each(function(i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass(chosenClass);
            }
        });
    }

    // footer
    checkAndAddClass(".footer-pol-med", "footer-pol-med-appear");
    checkAndAddClass(".footer-contact", "footer-contact-appear");
    checkAndAddClass(".footer-links", "footer-links-appear");

    // edukacja
    checkAndAddClass(".rightCarFooter", "car-moving");
    checkAndAddClass(".leftCarsFooter", "car-moving2");
    checkAndAddClass(".centerVideoCard", "videoCardsAppear");
    checkAndAddClass(".slideArrows", "videoCardsAppear");
    checkAndAddClass("#edukacjaLista li", "sekcja2h3");
    checkAndAddClass(".item", "sectionAppear");

    // polityka prywatnosci
    checkAndAddClass("#polityka_prywatnosci h1", "sectionAppear");
    checkAndAddClass("#informacje_polmed", "sectionAppear");
    checkAndAddClass("#dane_osobowe", "sectionAppear");
    checkAndAddClass("#przetwarzanie_danych", "sectionAppear");
    checkAndAddClass("#statystyki", "sectionAppear");
    checkAndAddClass("#utrzymanie_serwisu", "sectionAppear");
    checkAndAddClass("#prawa_uzytkownika", "sectionAppear");
    checkAndAddClass("#zmiany_polityki_prywatnosci", "sectionAppear");
    checkAndAddClass(".downloadPrivacyPolicy", "sectionAppear");

    // index
    checkAndAddClass("#is-edukacja", "isSectionLeft");
    checkAndAddClass("#is-oleje", "isSectionCenter");
    checkAndAddClass("#is-narzedzia", "isSectionRight");

    //oleje
    checkAndAddClass("#olejeLista h3, #olejeOferta li, #olejeOferta2 li, #olejeZaufanie li", "sekcja2h3");
    
}

// Check if element is visible after page loaded
$(document).ready(function() {
    checkVisibility();
});

// Calling function on scroll
$(window).scroll(function(event) {
    checkVisibility();
});

// https://css-tricks.com/slide-in-as-you-scroll-down-boxes/