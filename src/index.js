document.addEventListener('DOMContentLoaded', main);
 

function main() {
  displayRamens();
  addSubmitListener();
}


function displayRamens () {
  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.innerHTML = '';

   fetch('http://localhost:3000/ramens')
   .then(Response => {
     return Response.json();
   })

   .then(ramens => {
     ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);
      
     });
   })
   .catch(error => {
     console.error('error fetching ramens:', error);
   });
   
} 

function handleClick(ramen) {
  const ramenDetail = document.getElementById('ramen-detail');
  const detailImage = ramenDetail.querySelector('.detail-image');
  const nameElement = ramenDetail.querySelector('.name');
  const restaurantElement = ramenDetail.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  nameElement.textContent = ramen.name;
  restaurantElement.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
}

function addSubmitListener(){
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit',(event) => {
    event.preventDefault();
  
    const newName = document.getElementById('new-name').value;
        const newRestaurant = document.getElementById('new-restaurant').value;
        const newImage = document.getElementById('new-image').value;
        const newRating = document.getElementById('new-rating').value;
        const newComment = document.getElementById('new-comment').value;

        const newRamen = {
          name: newName,
          restaurant: newRestaurant,
          image: newImage,
          rating: newRating,
          comment: newComment
    };

    addRamenToMenu(newRamen);

    form.reset();

  });

}


function addRamenToMenu(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');
  
  const img = document.createElement('img');
  img.src = ramen.image; 
  img.alt = ramen.name; 
  img.addEventListener('click', () => handleClick(ramen)); 
  
  ramenMenu.appendChild(img);
}

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
