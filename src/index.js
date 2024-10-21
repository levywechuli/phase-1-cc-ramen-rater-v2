document.addEventListener('DOMContentLoaded', main());


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
      img.src = ramen.imageUrl;
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
  ramenDetail.innerHTML = '';

  const name = document.createElement('h2');
  name.textContent = ramen.name;

  const img = document.createElement('img');
  img.src = ramen.imageUrl;
  img.alt = ramen.name;

  const description = document.createElement('p');
  description.textContent = ramen.description;

  const rating = document.createElement('p');
  rating.textContent = `Rating: ${ramen.rating}`;

  const comment = document.createElement('p');
  comment.textContent = `comment ${ramen.comment}`;


  ramenDetail.appendChild(name);
  ramenDetail.appendChild(img);
  ramenDetail.appendChild(description);
  ramenDetail.appendChild(rating);
  ramenDetail.appendChild(comment);

}

function addSubmitListener(){
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit',(event) => {
    event.preventDefault();

    const  ramenName = form.querySelector('input[name="name"]').value;
    const  ramenImageUrl = form.querySelector('input[name="imageUrl"]').value;
    const  ramenDescrition = form.querySelector('input[name="description"]').value;
    const  ramenRating = form.querySelector('input[name="rating"]').value;
    const  ramenComment = form.querySelector('input[name="comment"]').value;


    const newRamen = {
      name:ramenName,
      imageUrl:ramenImageUrl,
      description:ramenDescrition,
      rating:ramenRating,
      comment:ramenComment,

    };

    addRamenToMenu(newRamen);

    form.reset();

  });

}


function addRamenToMenu(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');
  
  const img = document.createElement('img');
  img.src = ramen.imageUrl; 
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
