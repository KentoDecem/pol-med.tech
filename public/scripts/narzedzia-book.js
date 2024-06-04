let intervalId; // Zmienna przechowująca ID interwału

// Funkcja zmieniająca obraz co 7 sekund
function changeImageAutomatically() {
    // Funkcja zmieniająca obraz
    function changeImage() {
        let currentIndex = $("#narzedziaOfertaLista ul li.active").index(); // Pobierz aktualny indeks aktywnego elementu
        let nextIndex = (currentIndex + 1) % $("#narzedziaOfertaLista ul li").length; // Oblicz indeks następnego elementu

        let nextData = $("#narzedziaOfertaLista ul li").eq(nextIndex).data("image");
        let nextImage = "images/narzedzia/list/" + "t" + nextData.toString() + ".jpg";

        // Ukryj aktualny obraz
        $(".narzedzia-image").hide();

        // Załaduj nowe zdjęcie
        $(".narzedzia-image").attr("src", nextImage);

        // Wyświetl nowe zdjęcie z animacją
        $(".narzedzia-image").fadeIn("fast");

        $("#narzedziaOfertaLista ul li").removeClass("active"); // Usuń klasę aktywności ze wszystkich elementów
        $("#narzedziaOfertaLista ul li").eq(nextIndex).addClass("active"); // Dodaj klasę aktywności do następnego elementu
    }

    // Wywołaj zmianę obrazu od razu po uruchomieniu
    changeImage();

    // Uruchom automatyczną zmianę obrazów co 7 sekund
    intervalId = setInterval(changeImage, 5000);
}

// Uruchom automatyczną zmianę obrazów
changeImageAutomatically();


$("#narzedziaOfertaLista ul li").click(function() {
    clearInterval(intervalId); // Zatrzymaj interwał po kliknięciu na elemencie listy
    $("#narzedziaOfertaLista ul li").removeClass("active"); // Usuń klasę aktywności ze wszystkich elementów
    $(this).addClass("active");


    let data = $(this).data("image")
    let choosen_image = "images/narzedzia/list/" + "t" + data.toString() + ".jpg";
        // Ukryj aktualny obraz
        $(".narzedzia-image").hide();

        // Załaduj nowe zdjęcie
        $(".narzedzia-image").attr("src", choosen_image);
    
        // Wyświetl nowe zdjęcie z animacją
        $(".narzedzia-image").fadeIn("fast");
})