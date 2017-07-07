//class function for all the animals
var BabyAnimal = function(name, path, typee) {

	//used Object.create() method to enable prototype delegation
	//if called BabyAnimal lookup to BabyAnimal.prototype for template function

	//var this = Object.create(BabyAnimal.prototype); -----> done this by keyword 'new' pseudoclassical pattern

	this.name = name;
	this.image = path;
	this.type = typee;
	this.category = 'both';

	//return this; ----> done this by keyword 'new'
};

BabyAnimal.prototype.template = function() {
    return $('.row').append('<div class="col">' +
            '<h2>' + this.name + '</h2>' +
            '<img src="' + this.image + '">' +
            '<h3>No. of clicks <span>0</span></h3>' +
            '</div>');
};

//array to store all the animal objects
var allpups = [];

//all  animals created using class function
allpups.push(new BabyAnimal('Rufus', 'images/puppy.JPG', 'dog'));
allpups.push(new BabyAnimal('Tina', 'images/Cat.jpg', 'cat'));
allpups.push(new BabyAnimal('Oscar', 'images/puppyTwo.PNG', 'dog'));
allpups.push(new BabyAnimal('Teddy', 'images/CatTwo.jpg', 'cat'));
allpups.push(new BabyAnimal('Sleepy', 'images/puppyThree.JPG', 'dog'));
allpups.push(new BabyAnimal('Ruff and Tuff', 'images/CatThree.jpg', 'cat'));
allpups.push(new BabyAnimal('Pluto, Sunny & Brian', 'images/puppyFour.JPG', 'dog'));
allpups.push(new BabyAnimal('Marcus', 'images/CatFour.jpg', 'cat'));
allpups.push(new BabyAnimal('Mikky & Ginny', 'images/puppyFive.JPG', 'dog'));
allpups.push(new BabyAnimal('Mike', 'images/CatFive.jpg', 'cat'));
allpups.push(new BabyAnimal('Mau & Pau', 'images/puppySix.jpg', 'dog'));

// console.log(allpups.length);
// console.log(allpups);
// console.log(allpups[1].template());
