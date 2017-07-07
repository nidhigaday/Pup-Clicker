$(document).ready(function() {
    $('#catsValue').attr('max', allpups.length);
});

//to get no. of animals and their types and fetch it from the database
function loadPups(e) {
    e.preventDefault();
    var pupNumbers, babyType;

    //get the no. of puppies to display from input vallue
    pupNumbers = $('#catsValue').val();

    // checks the selected radio button and save the value of type in variable from input value
    if ($("input[type='radio'].puptype").is(':checked')) {
        babyType = $("input[type='radio'].puptype:checked").val();
    }

    //main function that takes
    //number of puppies,
    //all puppies object from cat.js
    //and type of puppies from pupType
    var pupClicker = function(n, woof, typeee) {
        var counter = 0;

        //loop to getall the puppies from the cat.js that matches the requirements
        for (x = 0; x < woof.length; x++) {

            // if the type or category or animals in cat.js matches with the input values, it renders
            if ((woof[x].type === typeee && counter < n) || (woof[x].category === typeee && counter < n)) {
                //function call to render puppies in cats.js
                woof[x].template();
                counter++;
            } 
        }
    };

    //function call
    pupClicker(pupNumbers, allpups, babyType);

    //checks if image was clicked and display the respective larger image
    //keeping this below pupclicker function call
    //because click on image is checked only once template function is done rendering images
    $('.cat-list img').click(function() {
        var index = $(this).parent().index();
        $('#large-image').attr('src', allpups[index].image);
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
$('input:submit').click(loadPups);
$('input:reset').click(resetPage);
