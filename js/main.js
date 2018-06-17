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
}

activateScroll();