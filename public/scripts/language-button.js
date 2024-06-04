// Show and Hide dropdown
$(".languageButton").click(function() {
$(".languageButton .arrow").toggleClass("rotateArrow");

    var dropdown = $(".languageDropdown");
    if (!dropdown.hasClass("showDropdown")) {
        dropdown.removeClass("hideDropdown").addClass("showDropdown");
    } else {
        dropdown.removeClass("showDropdown").addClass("hideDropdown");
    }
})

// Change language
$(".en, .ua, .pl, .de").click(function() {
    var lang = $(this).data('lang'); // Download the data-lang attribute

    // Animation for submitting the form
    $(".languageDropdown").removeClass("showDropdown").addClass("hideDropdownFast");

    setTimeout(function() {
        $(".languageDropdown").attr("action", "/language/" + lang); //Set new form URL
        $(".languageDropdown ").submit(); // Submit form
    }, 200);



    window.sessionStorage.setItem('navigation', 0);
});