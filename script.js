let dishesList = document.querySelector(".dishes-list");
let groceriesList = document.querySelector(".groceries form");
let burgerIcon = document.querySelector(".burger-icon");

burgerIcon.addEventListener('click', function(){
	let mobileMenu = document.querySelector(".mobile-menu");
	mobileMenu.classList.toggle("display-none");
});



fetchAllDishes();

function fetchAllDishes() {
	let dish = {
		id: 0,
		name: "name",
		photo: "photo",
		link: "link",
		country: "Country",
		ingredients: [],
		haveMeat: false,
	};

	let k = 0;

	fetch("dishes.json")
		.then((results) => results.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				dish.id = data[i].id;
				dish.name = data[i].name;
				dish.photo = data[i].photo;
				dish.link = data[i].link;
				dish.ingredients = data[i].ingredients;
				dish.haveMeat = data[i].haveMeat;

				let dishCard = document.createElement("div");
				dishCard.classList.add("dish-card");
				dishCard.setAttribute("data-pressed", "0");

				let dishLink = document.createElement("a");
				dishLink.setAttribute("href", dish.link);
				dishLink.setAttribute("target", "_blank");
				dishLink.innerHTML = "Receptas";

				let addIngredientsButton = document.createElement("a");
				addIngredientsButton.setAttribute("onclick", "addIngredientsToGroceriesList(this)");
				addIngredientsButton.setAttribute("href", "javascript:void(0)");
				addIngredientsButton.innerHTML = "Pridėti į sąrašą";

				let dishPhoto = document.createElement("img");
				dishPhoto.setAttribute("src", dish.photo);

				let dishName = document.createElement("h3");
				dishName.innerHTML = dish.name;

				let haveMeatLogo = document.createElement("img");
				haveMeatLogo.setAttribute("src", "media\\no_meat_icon_134822.png");
				haveMeatLogo.classList.add("have-meat-logo");

				if (dish.haveMeat === true) {
					haveMeatLogo.classList.add("display-none");
				}

				let dishIngredients = document.createElement("form");
				dishIngredients.classList.add("display-none-ingredients");

				for (let j = 0; j < dish.ingredients.length; j++, k++) {
					let groceriesListItem = document.createElement("input");
					groceriesListItem.setAttribute("type", "checkbox");
					groceriesListItem.setAttribute("id", `ingredient-${k}`);
					

					let groceriesListItemLabel = document.createElement("label");
					groceriesListItemLabel.setAttribute("for", `ingredient-${k}`);

					groceriesListItemLabel.appendChild(groceriesListItem);

					groceriesListItemLabel.innerHTML += dish.ingredients[j];

					dishIngredients.appendChild(groceriesListItemLabel);
				}

				dishCard.appendChild(dishPhoto);
				dishCard.appendChild(dishName);
				dishCard.appendChild(dishLink);
				dishCard.appendChild(addIngredientsButton);
				dishCard.appendChild(dishIngredients);
				dishCard.appendChild(haveMeatLogo);

				dishesList.appendChild(dishCard);
			}
		});
}

function addIngredientsToGroceriesList(el) {
	let parent = el.closest(".dish-card");
	let dataPressed = Number(parent.getAttribute("data-pressed"));
	if (dataPressed === 0) {
		parent.setAttribute("data-pressed", "1");
		let allListItems = parent.querySelector(".display-none-ingredients").innerHTML;
		groceriesList.innerHTML += allListItems;
	}

	let groceriesListInputs = document.querySelectorAll(".groceries form input");

console.log(groceriesListInputs);

groceriesListInputs.forEach(item => {
	item.addEventListener('change', function() {
		let parent = item.closest("label");
		parent.classList.toggle("crossed");
		console.log("toggling");
	})
})

}

function clearList() {
	groceriesList.innerHTML = "";
	let dataPressedElements = document.querySelectorAll("[data-pressed]");
	dataPressedElements.forEach((el) => {
		el.setAttribute("data-pressed", "0");
	});
}
