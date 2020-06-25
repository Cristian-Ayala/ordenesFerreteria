$(function () {


    // ------------------------------------------------------- //
    // Sidebar
    // ------------------------------------------------------ //
    $('.sidebar-toggler').on('click', function () {
        $('.sidebar').toggleClass('shrink show');
    });



    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    var stylesheet = $('link#theme-stylesheet');
    $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, {
                expires: 365,
                path: document.URL.substr(0, document.URL.lastIndexOf('/'))
            });

        }

        return false;
    });

});


Cookies.set('active', 'true');


function referProd() {
    location.href = location.pathname.substr(0, 18) + "/productos.html";
}

function referCat() {
    location.href = location.pathname.substr(0, 18) + "/categorias.html";
}

function referOrd() {
    location.href = location.pathname.substr(0, 18) + "/ordenes.html";
}

function referMar() {
    location.href = location.pathname.substr(0, 18) + "/marca.html";
}

var ApiRestUrl = "http://localhost:8080/sistema-cobro/rest-resources/"


// $(document).ready(function(){
//     $('[data-toggle="tooltip"]').tooltip();
//   });

  