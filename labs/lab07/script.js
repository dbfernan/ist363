// Question 1
let favNumber = 39;

console.log("My favorite number is " + favNumber);

// Question 2
let favoriteFoods = ["Burger", "Pizza", "Tacos", "Ice Cream"];

console.log(favoriteFoods[1]);

favoriteFoods.push("Sushi");

console.log(favoriteFoods);

// Question 3
for (let i = 0; i < favoriteFoods.length; i++) {
    console.log(favoriteFoods[i]);
}

// Question 4
for (let i = 0; i < favoriteFoods.length; i++) {
    if (favoriteFoods[i] !== favoriteFoods[1]) {
        console.log(favoriteFoods[i]);
    }
}

// Question 5
let book ={
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    yearPublichsed: 1925,
    isAvailable: true,
}

console.log(book.title);
console.log(book.author);

if (book.isAvailable===true) {
    console.log("The book is available.");
} else {
    console.log("The book is not available.");
}

// Question 6
let x = 1;
while (x <= 20) {
    if (x % 2 === 0) {
        console.log(x);
    }
    x++;
}

// Question 7
let randomNumber = Math.floor(Math.random() * 6) + 1;
console.log(randomNumber);