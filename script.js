let dishesList = document.querySelector(".dishes-list");
let groceriesList = document.querySelector(".groceries ul");

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

	fetch("dishes.json")
		.then((results) => results.json())
		.then((data) => {
			for (let i = 0; i < data.length; i++) {
				dish.id = data[i].id;
				dish.name = data[i].name;
				dish.photo = data[i].photo;
				dish.link = data[i].link;
				dish.ingredients = data[i].ingredients;

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

				let dishIngredients = document.createElement("ul");
				dishIngredients.classList.add("display-none");

				for (let j = 0; j < dish.ingredients.length; j++) {
					let groceriesListItem = document.createElement("li");
					groceriesListItem.innerHTML = dish.ingredients[j];
					dishIngredients.appendChild(groceriesListItem);
				}

				dishCard.appendChild(dishPhoto);
				dishCard.appendChild(dishName);
				dishCard.appendChild(dishLink);
				dishCard.appendChild(addIngredientsButton);
				dishCard.appendChild(dishIngredients);

				dishesList.appendChild(dishCard);
			}
		});
}

function addIngredientsToGroceriesList(el) {
	let parent = el.closest(".dish-card");
	let dataPressed = Number(parent.getAttribute("data-pressed"));
	if (dataPressed === 0) {
		parent.setAttribute("data-pressed", "1");
		let allListItems = parent.querySelector(".display-none").innerHTML;
		groceriesList.innerHTML += allListItems;
	}
}

function clearList() {
	groceriesList.innerHTML = "";
	let dataPressedElements = document.querySelectorAll("[data-pressed]");
	dataPressedElements.forEach((el) => {
		el.setAttribute("data-pressed", "0");
	});
}
