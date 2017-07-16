$(function() {

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            var duplicate = data.some(function(item){
                return item.image === obj.image;
            });
            if(!duplicate) {
                data.push(obj);
            }
            localStorage.notes = JSON.stringify(data);
        },
        addClicks: function(indx, count) {
            var data = JSON.parse(localStorage.notes);
            data[indx].clicks = count;
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
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
                id: 'ID-'+ path.slice(7),
                name : name,
                image : path,
                type : typee,
                category : 'both',
                clicks: 0
            });
        },
        getNotes: function() {
            return model.getAllNotes();
        },
        getPups: function(n, woof, typeee) {
            var counter = 0;
            for (x = 0; x < woof.length; x++) {
                if ((woof[x].type === typeee && counter < n) || (woof[x].category === typeee && counter < n)) {
                    view.render(woof[x]);
                    counter++;
                }
            }
            $('.cat-list img').click(this.pupClicked);
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
            $('#large-image').click(octopus.imgClicked);

        },
        initReset: function() {
            localStorage.clear();
            window.location.reload();
        },
        pupClicked: function() {
            //displays larger image
            var bigImg, pupInfo;
            bigImg = $(this).attr('src');
            pupInfo = octopus.getNotes();
            pupInfo.some(function(item) {
                if(item.image == bigImg) {
                    view.renderImg(item);
                }
            });
        },
        imgClicked: function() {
            var img, list, loc, clicks;
            img = $(this).attr('src');
            list = octopus.getNotes();
            list.some(function(item, x){
                if(item.image == img) {
                    loc = x;
                }
            });
            clicks = list[loc].clicks;
            clicks = clicks + 1;
            $(this).parent().find('span').text(clicks);
            model.addClicks(loc, clicks);
            return clicks;

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
                '</div>');
        },
        renderImg: function(pup) {
            $('div.pup_details').remove();
            $('.display-area').prepend('<div class="pup_details">' +
                '<h3 class="pup_name">' + pup.name + '</h3>' +
                '<h3 class="pup_clicks">No. of clicks <span>' + pup.clicks + '</span></h3></div>');
            $('#large-image').attr('src', pup.image);
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
