$(function() {

/*===============MODEL===============*/

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
            //console.log(data[indx]);
            localStorage.notes = JSON.stringify(data);
        },
        addData: function(n, pname) {
            console.log(pname);
            var newdata = JSON.parse(localStorage.notes);
            newdata[n].name = pname;
            //console.log(newdata[n]);
            localStorage.notes = JSON.stringify(newdata);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        },
        index: {
            key: 0
        }
    };

/*===============OCTOPUS===============*/

    var octopus = {
        
        //initial functions ready
        init: function() {
            localStorage.clear();
            model.init();
            pupItem();
            view.init();
            $('#catsValue').attr('max', this.getNotes().length);
        },
        
        //function to get animal object
        method: function(name, path, typee) {
            model.add({
                name : name,
                image : path,
                type : typee,
                category : 'both',
                clicks: 0
            });
        },
        
        //pull data from storage
        getNotes: function() {
            return model.getAllNotes();
        },
        
        //reset function
        initReset: function() {
            localStorage.clear();
            window.location.reload();
        },
        
        // get input values for form submit
        initSubmit: function() {
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
        
        //function call to render list of pups
        getPups: function(n, woof, typeee) {
            var counter = 0;
            for (x = 0; x < woof.length; x++) {
                if ((woof[x].type === typeee && counter < n) || (woof[x].category === typeee && counter < n)) {
                    view.render(woof[x]);
                    counter++;
                }
            }
            //enable click function for pups in the list and large image
            $('.cat-list img').click(this.pupClicked);
            $('#large-image').click(octopus.imgClicked);
        },
        
        //function to render clicked pup image in the list is clicked
        pupClicked: function(e) {
            e.preventDefault();
            var bigImg = $(this).attr('src');
            var pupInfo = octopus.getNotes();
            pupInfo.some(function(item , i) {
                if(item.image == bigImg) {
                    //console.log(item);
                    view.renderImg(item);
                    model['index']['key'] = i;
                }
            });
            //enable click on the list and the larger image
            octopus.initClicks();
        },
        
        //make admin button visible; click function for large image and admin button
        initClicks: function() {
            $('.sec_admin h4').css('display','block');
            $('.sec_admin h4').click(octopus.adminButton);
        },
        
        //function call to increment no. of clicks
        imgClicked: function() {
            var list, loc, clicks;
            list = octopus.getNotes();
            loc = model['index']['key'];
            var val = $(this).parent().find('span').text();
            val = parseInt(val, 10);
            val += 1;
            model.addClicks(loc, val);
            $(this).parent().find('span').text(val);
        },
        
        //make admin sec visible and click function call for Save button
        adminButton: function(e) {
            e.preventDefault();
            $('.sec_view').css('display','block');
            $('html, body').animate({
                scrollTop: $("#admin_view").offset().top
            }, 500);
            $('.admin_save').click(octopus.adminData);
        },
        
        //function called when Save button in admin is clicked to update name and clicks of the pup
        adminData: function() {
            console.log('admin save function called');
            var newName, newCount, dataList, m;
            m = model['index']['key'];
            newName = $('.new_name').val();
            newCount = $('.new_count').val();
            console.log(newName.length);
            if(newCount.length > 0 && newName.length > 0) {
                model.addData(m, newName);
                model.addClicks(m, newCount);
                dataList = octopus.getNotes();
                // dataList[m].name = newName;
                // dataList[m].clicks = newCount;
                view.renderImg(dataList[m]);
                $('html, body').animate({
                    scrollTop: $("#pup_details").offset().top
                }, 100);
                $('.sec_view').css('display','none');
                $('.new_name').val('');
                $('.new_count').val('');
            }
        }
    };

/*===============VIEW===============*/

    var view = {
        init: function() {
            $('input.init_Submit:submit').click(octopus.initSubmit);
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
            $('.display-area').prepend('<div id="pup_details" class="pup_details">' +
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
