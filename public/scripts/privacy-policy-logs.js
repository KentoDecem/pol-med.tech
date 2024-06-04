$("#lastUpdatePrivacyPolicy span").click(function() {
    $("#lastUpdatePrivacyPolicy .arrow").toggleClass("rotateArrow");
    $("#polityka_prywatnosci").toggleClass("politykaAddMargin")

    var updateList = $(".UpdatesList");
    if (!updateList.hasClass("showDropdown")) {
        updateList.removeClass("hideDropdown").addClass("showDropdown");
    } else {
        updateList.removeClass("showDropdown").addClass("hideDropdown");
    }
})

// Choosing option from list
$(".UpdateListInner h5").each(function(index) {
    $(this).click(function() {
        // Animation for submitting the form
    $(".UpdatesList").removeClass("showDropdown").addClass("hideDropdownFast");

    setTimeout(function() {
        $("#privacyPolicyForm").attr("action", `/polityka_prywatnosci/v/${index + 1}`); //Set new form URL
        $("#privacyPolicyForm").submit(); // Submit form
        $(".UpdatesList").addClass("showDropdown").removeClass("hideDropdownFast");
    }, 200);
    });
});