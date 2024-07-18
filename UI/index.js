document.addEventListener('DOMContentLoaded', function () {
    const restaurantContainer = document.querySelector('.row');
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
                data.forEach(restaurant => {
                    const restaurantCard = createRestaurantCard(restaurant);
                    restaurantContainer.appendChild(restaurantCard);
                });
            })
            .catch(error => {
                console.error('Error fetching restaurants:', error);
                restaurantContainer.innerHTML = '<p>Error fetching restaurants. Please try again later.</p>';
            });
    }
    fetchRestaurants();

    function createRestaurantCard(restaurant) {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4'); // Bootstrap classes for column and margin
        card.innerHTML = `
            <div style="display:flex;">
                <img src="Image.jpeg" class="card-img-top" alt="Restaurant Image" style="width:50px">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h4 style="display:flex;" onclick="Navigate(${restaurant.Restaurant_ID})" >${restaurant.Restaurant_Name} </h4>
            </div>
        `;
        return card;
    }
});

function Navigate(restaurantId) {
    window.location.href = `display.html?id=${restaurantId}`;
}


