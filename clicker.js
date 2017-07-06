$(document).ready(function() {
    console.log('page is ready after load');
    $('#catsValue').attr('max', allpups.length);
});

var pupNumbers, babyType;

//to get no. of animals and their types and fetch it from the database
function loadPups() {

    //get the no. of puppies to display from input vallue
    pupNumbers = $('#catsValue').val();
    console.log(pupNumbers);

    // checks the selected radio button and save the value of type in variable from input value
    if ($("input[type='radio'].puptype").is(':checked')) {
        babyType = $("input[type='radio'].puptype:checked").val();
    }

    console.log(babyType);

    //main function that takes
    //number of puppies,
    //all puppies object from cat.js
    //and type of puppies from pupType
    var pupClicker = function(n, woof, typeee) {

        var pupNames = [];
        var pupImages = [];

        //loop to getall the puppies from the cat.js that matches the requirements
        for (x = 0; x < meow.pups.length; x++) {

            var ptype = meow.pups[x].type;
            var ctype = meow.pups[x].category;

            // if the type or category or animals in cat.js matches with the input values, if pushes in a array
            if (ptype === typeee) {

                var pupname = meow.pups[x].name;
                var pupimage = meow.pups[x].image;

                pupNames.push(pupname);
                pupImages.push(pupimage);

            } else if (ctype === typeee) {

                var puptname = meow.pups[x].name;
                var puptimage = meow.pups[x].image;

                pupNames.push(puptname);
                pupImages.push(puptimage);
            }
        }

        //once array of animals that matched the requirement is collected,
        //following loop displays the no. of animals in this array requested in input value
        //by calling the template function to display images
        $.each(pupNames, function(index, value) {
            if (value !== null) {
                for (i = 0; i < n; i++) {
                    template(pupNames[i], pupImages[i]);
                    console.log('rendering');
                }
            }
        });
        // for (i = 0; i < n; i++) {
        //     if (i <= )
        // }
    };

    function template(name, image) {
        $('.row').append('<div class="col">' +
            '<h2>' + name + '</h2>' +
            '<img src="' + image + '">' +
            '<h3>No. of clicks <span>0</span></h3>' +
            '</div>');
    }

    //function call
    pupClicker(pupNumbers, allpups, pupType);

    //check if image was clicked and display the respective larger image
    //keeping this below pupclicker function call
    //because click on image is checked only once template function is done rendering images
    $('.cat-list img').click(function() {
        var index = $(this).parent().index();
        $('#large-image').attr('src', allpups.pups[index].image);
        $(this).parent().find('span').text(function() {
            var clicks = parseInt($(this).text(), 10) + 1;
            return clicks;
        });
    });

    return false;

}

//function to reset all the values
function resetPage() {
    console.log('hevvo');
    $('div.col').remove();
    $('#large-image').attr('src', '');
}

//calling function to loadcats
$('#catCount').submit(loadPups);
$('input:reset').click(resetPage);


// Function in Vanilla JS
// var elem = document.getElementById('Catclicks');
// console.log(elem);
// var elemTwo = document.getElementById('CatclicksTwo');
// console.log(elemTwo);
// function Click(){
//  count++;
//  document.getElementById('ClickCount').innerHTML = "No. of clicks " + count;
// };
// elem.addEventListener('click', Click, false);
// elemTwo.addEventListener('click', Click, false);
