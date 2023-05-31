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
				dishCard.setAttribute("onclick", "addIngredientsToGroceriesList(this)");
				dishCard.setAttribute("data-pressed", "0");

				let dishLink = document.createElement("a");
				dishLink.setAttribute("href", dish.link);
				dishLink.setAttribute("target", "_blank");
				dishLink.innerHTML = "&nbsp;";

				let dishPhoto = document.createElement("img");
				dishPhoto.setAttribute("src", dish.photo);

				let dishName = document.createElement("h3");
				dishName.innerHTML = dish.name;

				let dishIngredients = document.createElement("ul");
				dishIngredients.classList.add("display-none");

				dishCard.appendChild(dishPhoto);
				dishCard.appendChild(dishName);
				// This line make dish card as a link
				// dishCard.appendChild(dishLink);

				dishesList.appendChild(dishCard);

				for (let j = 0; j < dish.ingredients.length; j++) {
					let groceriesListItem = document.createElement("li");
					groceriesListItem.innerHTML = dish.ingredients[j];
					dishIngredients.appendChild(groceriesListItem);
				}

				dishCard.appendChild(dishIngredients);
			}
		});
}

function addIngredientsToGroceriesList(el) {
	let dataPressed = Number(el.getAttribute("data-pressed"));
	if (dataPressed === 0) {
		el.setAttribute("data-pressed", "1");
		let allListItems = el.querySelector(".display-none").innerHTML;
		groceriesList.innerHTML += allListItems;
	}
}
