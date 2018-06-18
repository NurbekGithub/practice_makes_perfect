function activateScroll() {
  const aboutBodyContainer = document.querySelector('.about-body-container');
  const scrollContainer = document.querySelector('.scroll-container');
  const figure = scrollContainer.querySelector('figure');
  const aboutBodys = document.querySelectorAll('.about-body');
  let isDown = false;
  let startX;
  let scrollLeft;
  
  figure.style.width = 100 / aboutBodys.length + '%';
  function handleMouseDown(e) {
    isDown = true;
    startX = e.pageX - aboutBodyContainer.offsetLeft;
    scrollLeft = aboutBodyContainer.scrollLeft;
  }

  function handleMouseUp(e) {
    isDown = false;
  }

  function handleMouseLeave(e) {
    isDown = false;
  }

  function handleMouseMove(e) {
    e.preventDefault();
    if(!isDown) return;
    const mouseMove = (e.pageX - aboutBodyContainer.offsetLeft) - startX; 
    aboutBodyContainer.scrollLeft = scrollLeft - 1.3*mouseMove;
    console.log()
    if((scrollLeft - 1.3*mouseMove)/aboutBodys.length > 0 && 
      scrollContainer.offsetWidth - figure.offsetWidth > (scrollLeft - 1.3*mouseMove)/aboutBodys.length) {
        figure.style.left = (scrollLeft - 1.3*mouseMove)/aboutBodys.length + 'px';
      } else if((scrollLeft - 1.3*mouseMove)/aboutBodys.length <= 0){
        figure.style.left = '0px';
      } else {
        figure.style.left = scrollContainer.offsetWidth - figure.offsetWidth + 'px';
      }
  }

  aboutBodyContainer.addEventListener('mousedown', handleMouseDown);
  aboutBodyContainer.addEventListener('mouseup', handleMouseUp);
  aboutBodyContainer.addEventListener('mousemove', handleMouseMove);
  aboutBodyContainer.addEventListener('mouseleave', handleMouseLeave);
};

function activateToggleNav() {
  const toggleBtn = document.querySelector('.nav-toggle button');
  const toggledNav = document.querySelector('.nav-toggle ul');

  function toggleNav(e) {
    if(toggledNav.style.display === 'none') {
      toggledNav.style.display = 'block';
    } else {
      toggledNav.style.display = 'none';
    }
  }

  //close toggledNav after any click
  document.addEventListener('click', () => {
    if(toggledNav.style.display !== 'none') {
      toggledNav.style.display = 'none';
    }
  }, true)
  toggleBtn.addEventListener('click', toggleNav, false);


}

function activateCarousel() {
  const bannerSection = document.querySelector('#banner');
  const banners = bannerSection.querySelectorAll('.banner');
  const prevButton = bannerSection.querySelector('.prev');
  const nextButton = bannerSection.querySelector('.next');
  let slideIndex = 0;

  banners.forEach(banner => {
    banner.style.display = 'none'
  });

  function showSlide(n) {
    console.log(n);
    banners.forEach(banner => {
      banner.style.display = 'none'
    });

    if(n >= banners.length) {
      slideIndex = 0;
      showSlide(slideIndex);
      return;
    } else if (n < 0) {
      slideIndex = banners.length - 1;
      showSlide(slideIndex);
      return;
    }
    banners[n].style.display = 'flex';
  }

  prevButton.addEventListener('click', () => showSlide(--slideIndex), true);
  nextButton.addEventListener('click', () => showSlide(++slideIndex), true);

  if(bannerSection.dataset.autoslide !== 'false') {
    const autoSlide = setInterval(() => showSlide(slideIndex++), 5000)
  }

  showSlide(slideIndex);
}

activateCarousel();
activateScroll();
activateToggleNav();