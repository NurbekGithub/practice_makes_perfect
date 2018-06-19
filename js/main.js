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
    banner.addEventListener('animationend', e => {
      if(e.animationName.match(/slideOut(left|right)/gi)) {
        banner.classList.remove('show', 'slideOutLeft', 'slideOutRight');
      }
      if(e.animationName.match(/slide(left|right)/gi)) {
        banner.classList.remove('slideInLeft', 'slideInRight');
      }
    });
  });

  function showSlide(curr, next, type='next') {
    if(next >= banners.length) {
      slideIndex = 0;
      showSlide(banners.length - 1, slideIndex);
      return;
    } else if (next < 0) {
      slideIndex = banners.length - 1;
      showSlide(0, slideIndex, 'prev');
      return;
    }
    if(type === 'next') {
      banners[next].classList.add('show', 'slideInLeft');
      if(banners[curr].classList.contains('show')) banners[curr].classList.add('slideOutLeft');
    } else {
      banners[next].classList.add('show', 'slideInRight');
      if(banners[curr].classList.contains('show')) banners[curr].classList.add('slideOutRight');
    }
  }

  prevButton.addEventListener('click', () => showSlide(slideIndex, --slideIndex, 'prev'), true);
  nextButton.addEventListener('click', () => showSlide(slideIndex, ++slideIndex, 'next'), true);

  if(bannerSection.dataset.autoslide !== 'false') {
    const autoSlide = setInterval(() => showSlide(slideIndex, ++slideIndex), 5000)
  }

  showSlide(banners.length - 1, slideIndex);
}

function activateModal() {
  const modalWrapper = document.querySelector('.modal-wrapper');
  const modalBox = modalWrapper.querySelector('.modal-box');
  const openBtn = document.querySelector('.about-btn');
  const closeBtn = modalWrapper.querySelector('.close');


  function openModal() {
    const openBtnPos = openBtn.getBoundingClientRect();
    const posStart = {
      left: `${openBtnPos.left}px`,
      top: `${openBtnPos.top}px`,
      width: `${openBtnPos.width}px`,
      height: `${openBtnPos.height}px`,
      transform: 'none'
    }
    
    Object.assign(modalBox.style, {...posStart, opacity: .6});
    modalWrapper.style.display = 'block';
    setTimeout(() => {
      const posEnd = {
        left: '50%',
        top: '50%',
        width: '80%',
        height: 'auto',
        transform: 'translate(-50%, -50%)'
      }
      Object.assign(modalBox.style, {...posEnd, opacity: 1});
    },10)
  }

  function closeModal() {    
    modalWrapper.style.display = 'none';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
}

function activateServicesCarousel() {
  //don't need this
}

activateServicesCarousel();
activateModal();
activateCarousel();
activateScroll();
activateToggleNav();