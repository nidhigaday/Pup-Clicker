$(function() {

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            //console.log(obj);
            var data = JSON.parse(localStorage.notes);
            //console.log(data);
            //console.log('checking duplicacy');
            if(jQuery.inArray(obj.image, data != 1)) { data.push(obj); }
            console.log();
            // data.includes(obj.name) ? data.push(obj) : false;
            // data.push(obj);
            // var valueArr = values.map(function(item){ return item.name });
            // var isDuplicate = valueArr.some(function(item, idx){
            //     return valueArr.indexOf(item) != idx
            // });
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };

    var view = {
        init: function() {
            $('input:submit').click(octopus.initSubmit);
            $('input:reset').click(octopus.initReset);
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
            model.init();
            pupItem();
            view.init();
            $('#catsValue').attr('max', this.getNotes().length);
        },
        method: function(name, path, typee) {
            model.add({
                name : name,
                image : path,
                type : typee,
                category : 'both'
            });
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
        getNotes: function() {
            return model.getAllNotes();
        },
        initSubmit: function(e) {
            //gets value from form input
            e.preventDefault();
            //disables Submit button once clicked
            $(this).attr('disabled', true);
            var pupNumbers, babyType, pupArray ;
            pupNumbers = $('#catsValue').val();
            pupArray = octopus.getNotes();
            if ($("input[type='radio'].puptype").is(':checked')) {
                babyType = $("input[type='radio'].puptype:checked").val();
            }
            //this.getPups will not work here. 'this' is 'e' from input value
            octopus.getPups(pupNumbers, pupArray, babyType);
        },
        initReset: function() {
            //re-enable Submit button on Reset
            $('input:submit').attr('disabled', false);
            $('div.col').remove();
            $('#large-image').attr('src', '');
        },
        itemClicked: function() {
            //displays larger imag
            var bigImg = $(this).attr('src');
            var pupInfo = octopus.getNotes();
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

    function pupItem() {
        octopus.method('Rufus', 'images/puppy.jpg', 'dog');
        octopus.method('Tina', 'images/Cat.jpg', 'cat');
        octopus.method('Oscar', 'images/puppyTwo.png', 'dog');
        octopus.method('Teddy', 'images/CatTwo.jpg', 'cat');
        octopus.method('Sleepy', 'images/puppyThree.jpg', 'dog');
        octopus.method('Ruff and Tuff', 'images/CatThree.jpg', 'cat');
        octopus.method('Pluto, Sunny & Brian', 'images/puppyFour.jpg', 'dog');
        octopus.method('Marcus', 'images/CatFour.jpg', 'cat');
        octopus.method('Mikky & Ginny', 'images/puppyFive.jpg', 'dog');
        octopus.method('Mike', 'images/CatFive.jpg', 'cat');
        octopus.method('Mau & Pau', 'images/puppySix.jpg', 'dog');
    }

    octopus.init();
}());
