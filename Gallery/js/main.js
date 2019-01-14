/*** Making XHR call to access the local json file due to CORS in chrome ***/

var request;
  if(window.XMLHttpRequest){
    request = new XMLHttpRequest();
  } else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  request.open('GET','dogs.json');
  request.onreadystatechange = function(){
    if((request.readyState===4) && (request.status===200)){
      var items = JSON.parse(request.responseText);
      console.log(items);
         items.dogs.forEach( function(obj) {
         
            function createListView(){
             var listView=document.createElement('div');
             listView.setAttribute("class", "column column-block");
             var listViewItem=document.createElement('a');
             listViewItem.setAttribute("href", "#");
             listViewItem.setAttribute("data-toggle", "galleryModal");
             var img = new Image();
             img.src = obj.image;
             img.setAttribute("class", "banner-img lazy");
             img.setAttribute("id", "bann-img");
             img.setAttribute("data-src", obj.image);
             img.setAttribute("alt", "effy");
             listViewItem.appendChild(img);
             listView.appendChild(listViewItem);
            return listView;
        };
        document.getElementById("img-container").appendChild(createListView());
        document.getElementById("bann-img").className +=  " lazy";
       });
     (function() {
      'use strict';

    // Create object literal with project variables
    const galleryVariables = {
      galleryAuthor: document.querySelector('.js-modal-author'),
      galleryButton: document.querySelector('.js-close-button'),
      galleryLinks: document.querySelectorAll('a[data-toggle="galleryModal"]'),
      galleryModal: document.querySelector('.js-gallery-reveal'),
      galleryOverlay: document.querySelector('.js-gallery-overlay'),
      galleryPreview: document.querySelector('.js-modal-preview'),
      galleryPreviewAuthor: document.querySelector('.js-modal-author')
    }

    // Fade in function
    const fadeIn = function(element)  {
      // Create variable with initial opacity
      let elementOpacity = 0.1;

      // Create timer for fadeIn function
      let timer = setInterval(function()  {
        if (elementOpacity >= 1) {
          // Reset interval
          clearInterval(timer);
        }

        // Set element opacity to elementOpacity
        element.style.opacity = elementOpacity;

        // Increase value of elementOpacity
        elementOpacity += elementOpacity * 0.1;

        // Show element
        element.style.display = 'block';
      }, 15);
    }

    // Fade out function
    const fadeOut = function(element)  {
      // Create variable with initial opacity
      let elementOpacity = 1;

      // Create timer for fadeOut function
      let timer = setInterval(function() {
        if (elementOpacity <= 0.1) {
          // Reset interval
          clearInterval(timer);

          // Hide element
          element.style.display = 'none';
        }

        // Set element opacity to elementOpacity
        element.style.opacity = elementOpacity;

        // Decrease value of elementOpacity
        elementOpacity -= elementOpacity * 0.1;
      }, 15);
    }

    // Open reveal dialog by clicking on images
    for (let x = 0, y = galleryVariables.galleryLinks.length; x < y; x++) {
      // Add event listener for image containers
      galleryVariables.galleryLinks[x].addEventListener('click', function(e) {
        e.preventDefault();

        // Get clicked image
        let image = e.target;

        // Get src of the image
        let imageSrc = image.getAttribute('src');

        // Get alt of the image
        let imageAlt = image.getAttribute('alt');

        // Set alt attribute of preview image to clicked image
        galleryVariables.galleryPreview.setAttribute('alt', imageAlt);

        // Set src attribute of preview image to clicked image
        galleryVariables.galleryPreview.setAttribute('src', imageSrc);

        // Set preview headline to alt of clicked phot
        galleryVariables.galleryPreviewAuthor.textContent = imageAlt;
        
        // Avoid openning modal unless its content is loaded
        if (galleryVariables.galleryPreview.getAttribute('src').length > 0 && galleryVariables.galleryPreview.getAttribute('alt').length > 0 && galleryVariables.galleryPreviewAuthor.textContent.length > 0) {
          // Add Foundation class to hide overflow
          document.body.classList.add('is-reveal-open');

          // Show modal dialog
          galleryVariables.galleryModal.style.display = 'block';

          // Show modal overlay (fade it in)
          fadeIn(galleryVariables.galleryOverlay);
        }
      });
    }

    // Close reveal dialog 
    galleryVariables.galleryButton.addEventListener('click', function(e) {
      e.preventDefault();

      // Hide modal overlay (fade it out)
      fadeOut(galleryVariables.galleryOverlay);
      
      // Wait before overlay fades out
      setTimeout(function() {
        // Hide modal dialog
        galleryVariables.galleryModal.style.display = 'none';
        
        // Reset alt attribute of preview image
        galleryVariables.galleryPreview.setAttribute('alt', '');

        // Reset src attribute of preview image
        galleryVariables.galleryPreview.setAttribute('src', '');

        // Reset text for preview headline
        galleryVariables.galleryPreviewAuthor.textContent = '';

        // Remove Foundation class to hide overflow
        document.body.classList.remove('is-reveal-open');
      }, 250);
    });
  })();
  }
  }
  request.send();


/*** Lazy loading the images  after few static images load ***/


registerListener('load', setLazy);
registerListener('load', lazyLoad);
registerListener('scroll', lazyLoad);

var lazy = [];

function setLazy(){
    lazy = document.getElementsByClassName('lazy');
    console.log('Found ' + lazy.length + ' lazy images');
} 

function lazyLoad(){
    for(var i=0; i<lazy.length; i++){
        if(isInViewport(lazy[i])){
            if (lazy[i].getAttribute('data-src')){
                lazy[i].src = lazy[i].getAttribute('data-src');
                lazy[i].removeAttribute('data-src');
            }
        }
    }
    
    cleanLazy();
}

function cleanLazy(){
    lazy = Array.prototype.filter.call(lazy, function(l){ return l.getAttribute('data-src');});
}

function isInViewport(el){
    var rect = el.getBoundingClientRect();
    
    return (
        rect.bottom >= 0 && 
        rect.right >= 0 && 
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
     );
}

function registerListener(event, func) {
    if (window.addEventListener) {
        window.addEventListener(event, func)
    } else {
        window.attachEvent('on' + event, func)
    }
}