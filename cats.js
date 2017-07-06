//class function for all the animals
var BabyAnimal = function(name, path, typee) {
	var obj = {
		name: name,
		image: path,
		type: typee,
		category: 'both'
	};
	return obj;
};

//array to store all the animal objects
var allpups = [];

//all new animals created using class function
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

console.log(allpups.length);
console.log(allpups);