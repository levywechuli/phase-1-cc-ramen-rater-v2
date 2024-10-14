document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
  displayRamens();
  addSubmitListener();
}

// Callbacks
function handleClick(ramen) {
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant || "N/A"; 
  document.querySelector('.detail-image').src = ramen.image;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment || "No comments yet"; 
}

function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById('new-name').value,
      image: document.getElementById('new-image').value,
      restaurant: document.getElementById('new-restaurant').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value,
    };

    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
    ramenMenu.appendChild(img);

    form.reset(); 
  });
}

const displayRamens = () => {
  fetch("URL_TO_YOUR_RAMEN_DATA")
  .then(Response=>Response.json())
  .then(data=>{
    const ramenMenu = document.getElementById("ramen-menu")
    ramenMenu.innerHTML = ""


    data.forEach(ramen => {
      const img = document.createElement("img");
      img.src = ramen.image;
      img.alt = ramen.name;
     ramenMenu.appendChild(img);  
    });
  })
  .catch(error=>console.error("error fetching ramen", error));
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
