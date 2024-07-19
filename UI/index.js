var searchRes='';
document.addEventListener('DOMContentLoaded', function () {
    const restaurantContainer =document.querySelector('.row');
    const searchVal=document.getElementById('searching');
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click',()=>{
        searchRes=searchVal.value.trim().toLowerCase();
        console.log(searchRes);
        fetchRestaurants();
    })
    function fetchRestaurants() {
        fetch(`http://localhost:3000/zomato/restaurants/all`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data fetched successfully:', data);
                restaurantContainer.innerHTML = '';
                const restaurants=data.flat();
                console.log(restaurants);
                searchResults(restaurants,searchRes);
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
                restaurantContainer.innerHTML = '<p>Error fetching restaurants. Please try again later.</p>';
            });
    }
    //fetchRestaurants();    //All the data of restaurants is fetched

    function createRestaurantCard(restaurant) {    //Used to create a card of each restaurant
        const card = document.createElement('div'); //div element is created
        card.classList.add('col-md-4', 'mb-4'); // Bootstrap classes for column and margin
        card.innerHTML = `
            <div style="display:flex; border:2px solid black; border-radius:8px; box-shadow: 10px 5px 5px red;">
                <img src="Image.jpeg" class="card-img-top" alt="Restaurant Image" style="width:50px">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h4 style="display:flex;" onclick="Navigate(${restaurant.Restaurant_ID})" >${restaurant.Restaurant_Name} </h4>
            </div>
        `;
        return card;
    }
    function searchResults(restaurants,searchRes){        //Display results based on search
        restaurantContainer.innerHTML='';
        if(searchRes===''){
            restaurants.forEach(restaurant=>{
                const card=createRestaurantCard(restaurant);
                restaurantContainer.appendChild(card);
            });
        }
        else{
            const filterResults=restaurants.filter(restaurant=>{
                if(searchRes===restaurant.City.toLowerCase()){
                    return true;
                }
                 return false;
        });
            
            console.log(filterResults);
            if(filterResults.length>0){
                filterResults.forEach(restaurant=>{
                    const card=createRestaurantCard(restaurant);
                    restaurantContainer.appendChild(card);
                });
            }
            else{
                restaurantContainer.innerHTML='<p>No results found</p>';
            }
        }
    }
});

function Navigate(restaurantId) {
    window.location.href = `display.html?id=${restaurantId}`;
}


