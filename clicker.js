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
