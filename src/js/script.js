const images = [
    'https://acre-image-collections.s3.amazonaws.com/image-6578722caea701702392364_medium.jpg', 
    'https://acre-images.s3.amazonaws.com/image-5ac62b9e561041522936734_medium.jpeg', 
    'https://acre-images.s3.amazonaws.com/image-5acac631504581523238449_medium.jpeg', 
    'https://acre-image-collections.s3.amazonaws.com/image-65787222618211702392354_medium.jpg',
    'https://acre-image-collections.s3.amazonaws.com/image-657872175b22e1702392343_medium.jpg', 
    'https://acre-image-collections.s3.amazonaws.com/image-657871ff7d8401702392319_medium.jpg',
    'https://acre-image-collections.s3.amazonaws.com/image-6576286c7c4b61702242412_medium.jpg',
    'https://acre-image-collections.s3.amazonaws.com/image-6578af5f9af671702408031_medium.jpg',
    'https://acre-images.s3.amazonaws.com/image-5b01cdf4b2e9a1526844916.jpg',
  ];

  document.addEventListener("DOMContentLoaded", function() {
    createGrid();
    
    const checkboxImage = document.querySelectorAll(".checkbox-image");

    const lazyLoad = function(target) {
      const io = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const src = element.getAttribute("data-src");

            if (element.tagName === "LABEL") {
              const backgroundImage = `url('${src}')`;
              element.style.backgroundImage = backgroundImage;
            } else if (element.tagName === "IMG") {
              element.src = src;
            }

            observer.unobserve(element);
          }
        });
      });

      target.forEach(element => {
        io.observe(element);
      });
    };

    lazyLoad(checkboxImage);
});


  function createGrid() {
    for (let i = 0; i < 20; i++) {
      const index = Math.floor(Math.random() * images.length);
      const checkboxId = `checkbox-${i}`;

      const imageUrl = images[index];

      const gridItem = document.createElement('div');
      gridItem.classList.add('col-12', 'col-md-6', 'col-lg-3');

      const checkboxLabel = document.createElement('label');
      checkboxLabel.classList.add('checkbox-image', 'mx-auto');
      checkboxLabel.setAttribute('data-src', imageUrl);
      checkboxLabel.setAttribute('for', checkboxId);

      const hiddenCheckbox = document.createElement('input');
      hiddenCheckbox.type = 'checkbox';
      hiddenCheckbox.id = checkboxId;

      const checkbox = document.createElement('div');
      checkbox.classList.add('red-checkbox');

      checkboxLabel.appendChild(checkbox);

      gridItem.appendChild(hiddenCheckbox);
      gridItem.appendChild(checkboxLabel);
      
      document.getElementById('imageContainer').appendChild(gridItem);
    }
  }
