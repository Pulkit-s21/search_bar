const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container");
const searchInput = document.querySelector("[data-search]");

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    // we want to check this for each user
    users.forEach(user => {
        // here we are checking if the user input is in either the name or the email and convering it to lowercase to avoid errors
        const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        // here we check if user is visible if yes then we pass in false skipping the class hide else we add in the class hide
        user.element.classList.toggle("hide", !isVisible);
    })
});

let users = [] // created an empty array for users (users object)

// js promise
fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()).then(data => {
    
    // here what we are saying is the card will return a docuemnt fragment and then copy the content of the userTemplate in the card and then clone everything inside it and then get the first child in that which is the card div

    // user for loop cz we want to do this process for every user in the API
    // data.forEach(user => {
    //     const card = userCardTemplate.content.cloneNode(true).children[0];

    //     const header = card.querySelector("[data-header]"); // if we use data-attr in querySelector we need to put them in [] 

    //     const body = card.querySelector("[data-body"); // if we use data-attr in querySelector we need to put them in []

    //     header.innerText = user.name;
    //     body.innerText = user.email;

    //     userCardContainer.appendChild(card);
    // });

    // settings user to whtever we return here and to return we need to use map so thats why we chngd from forEach to map
    
    users = data.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0];

        const header = card.querySelector("[data-header]"); // if we use data-attr in querySelector we need to put them in [] 

        const body = card.querySelector("[data-body"); // if we use data-attr in querySelector we need to put them in []

        header.innerText = user.name;
        body.innerText = user.email;

        userCardContainer.appendChild(card);

        return {name: user.name, email:user.email, element:card}
    });
});