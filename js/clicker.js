$(function() {
var data = {
    allpups:[],
    method: function(name, path, typee) {
        this.name = name;
        this.image = path;
        this.type = typee;
        this.category = 'both';
    }
};

var view = {
    init: function(){
        $('input:submit').click(octopus.initSubmit);
        $('input:reset').click(octopus.initReset);
        //$('.cat-list img').click(octopus.itemClicked);
    },
    pupItem: function(){
        var BabyAnimal = data.method;
        data.allpups.push(new BabyAnimal('Rufus', 'images/puppy.jpg', 'dog'));
        data.allpups.push(new BabyAnimal('Tina', 'images/Cat.jpg', 'cat'));
        data.allpups.push(new BabyAnimal('Oscar', 'images/puppyTwo.png', 'dog'));
        data.allpups.push(new BabyAnimal('Teddy', 'images/CatTwo.jpg', 'cat'));
        data.allpups.push(new BabyAnimal('Sleepy', 'images/puppyThree.jpg', 'dog'));
        data.allpups.push(new BabyAnimal('Ruff and Tuff', 'images/CatThree.jpg', 'cat'));
        data.allpups.push(new BabyAnimal('Pluto, Sunny & Brian', 'images/puppyFour.jpg', 'dog'));
        data.allpups.push(new BabyAnimal('Marcus', 'images/CatFour.jpg', 'cat'));
        data.allpups.push(new BabyAnimal('Mikky & Ginny', 'images/puppyFive.jpg', 'dog'));
        data.allpups.push(new BabyAnimal('Mike', 'images/CatFive.jpg', 'cat'));
        data.allpups.push(new BabyAnimal('Mau & Pau', 'images/puppySix.jpg', 'dog'));
        console.log(data.allpups.length);
    },
    render: function(info) {
        return $('.row').append('<div class="col">' +
            '<img src="' + info.image + '">' +
            '<h2 class="col_title">' + info.name + '</h2>' +
            '<h3>No. of clicks <span>0</span></h3>' +
            '</div>');
    }
};

var octopus = {
    init: function() {
        view.pupItem();
        view.init();
        $('#catsValue').attr('max', data.allpups.length);
    },
    getPups: function(n, woof, typeee) {
        var counter = 0;
        for (x = 0; x < woof.length; x++) {
            if ((woof[x].type === typeee && counter < n) || (woof[x].category === typeee && counter < n)) {
                view.render(woof[x]);
                counter++;
            }
        }
        $('.cat-list img').click(this.itemClicked);
    },
    initSubmit: function(e){
        //gets value from form input
        e.preventDefault();
        //disables Submit button once clicked
        $(this).attr('disabled', true);
        var pupNumbers, babyType;
        pupNumbers = $('#catsValue').val();
        if ($("input[type='radio'].puptype").is(':checked')) {
            babyType = $("input[type='radio'].puptype:checked").val();
        }
        //this.getPups will not work here. 'this' is 'e' from input value
        octopus.getPups(pupNumbers, data.allpups, babyType);
    },
    initReset: function(){
        //re-enable Submit button on Reset
        $('input:submit').attr('disabled', false);
        $('div.col').remove();
        $('#large-image').attr('src', '');
    },
    itemClicked: function(){
        //displays larger image
        var bigImg = $(this).attr('src');
        var pupInfo = data.allpups;
        $.each(pupInfo, function(index) {
            if (pupInfo[index].image == bigImg) {
                $('#large-image').attr('src', bigImg);
            }
        });
        //displays no. of clicks
        $(this).parent().find('span').text(function() {
            var clicks = parseInt($(this).text(), 10) + 1;
            return clicks;
        });
    }

};

octopus.init();
}());


// $(document).ready(function() {
//     console.log('page is ready after load');
//     $('#catsValue').attr('max', allpups.length);
// });



// //to get no. of animals and their types and fetch it from the database
// function loadPups(e) {

//     e.preventDefault();

//     console.log(this);

//     $(this).attr('disabled', true);

//     var pupNumbers, babyType;

//     //get the no. of puppies to display from input vallue
//     pupNumbers = $('#catsValue').val();
//     console.log(pupNumbers);

//     // checks the selected radio button and save the value of type in variable from input value
//     if ($("input[type='radio'].puptype").is(':checked')) {
//         babyType = $("input[type='radio'].puptype:checked").val();
//     }
//     console.log(babyType);

//     //main function that takes number of puppies,
//     //all puppies object from cat.js  and type of puppies from pupType
//     var pupClicker = function(n, woof, typeee) {

//         var counter = 0;

//         //loop to getall the puppies from the cat.js that matches the requirements
//         for (x = 0; x < woof.length; x++) {

//             // if the type or category or animals in cat.js matches with the input values, it renders
//             if ((woof[x].type === typeee && counter < n) || (woof[x].category === typeee && counter < n)) {
//                 //function call to render puppies
//                 woof[x].template();
//                 counter++;
//             }
//         }
//     };


// //all the code below has been replaced by the prototype method template
//     //once array of animals that matched the requirement is collected,
//     //following loop displays the no. of animals in this array requested in input value
//     //by calling the template function to display images
//     // $.each(pupNames, function(index, value) {
//     //     if (value !== null) {
//     //         for (i = 0; i < n; i++) {
//     //             template(pupNames[i], pupImages[i]);
//     //             console.log('rendering');
//     //         }
//     //     }
//     // });
//     // for (i = 0; i < n; i++) {
//     //     if (i <= )
//     // }
//     // };

//     // function template(name, image) {
//     //     $('.row').append('<div class="col">' +
//     //         '<h2>' + name + '</h2>' +
//     //         '<img src="' + image + '">' +
//     //         '<h3>No. of clicks <span>0</span></h3>' +
//     //         '</div>');
//     // }

//     //function call
//     pupClicker(pupNumbers, allpups, babyType);

//     //check if image was clicked and display the respective larger image
//     //keeping this below pupclicker function call
//     //because click on image is checked only once template function is done rendering images
//     $('.cat-list img').click(function() {
//         var bigImg = $(this).attr('src');
//         $.each(allpups, function(index) {
//             if (allpups[index].image == bigImg) {
//                 $('#large-image').attr('src', bigImg);
//             }
//         });

//         $(this).parent().find('span').text(function() {
//             var clicks = parseInt($(this).text(), 10) + 1;
//             return clicks;
//         });
//     });

//     return false;

// }

// //function to reset all the values
// function resetPage() {
//     $('input:submit').attr('disabled', false);
//     $('div.col').remove();
//     $('#large-image').attr('src', '');
// }

// function testing(e) {
//     e.preventDefault();
//     // var pupNumbers, babyType;
//     // //get the no. of puppies to display from input vallue
//     // pupNumbers = $('#catsValue').val();
//     // console.log(pupNumbers);

//     // // checks the selected radio button and save the value of type in variable from input value
//     // if ($("input[type='radio'].puptype").is(':checked')) {
//     //     babyType = $("input[type='radio'].puptype:checked").val();
//     // }

//     // console.log(babyType);
//     console.log('clicked');
// }

// //calling function to loadcats
// $('input:submit').click(loadPups);
// $('input:reset').click(resetPage);


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
