let swiper = new Swiper(".slider", {
  loop: true,
  direction: 'vertical',
  mousewheel: true,
  spaceBetween: 5,
  navigation:{
    nextEl: ".down",
    prevEl: ".up",
  },
  on: {
    slideChange: function () {
      // Pause all videos
      document.querySelectorAll("video").forEach((video) => {
        video.pause();
        video.currentTime = 0;
      });

      // Wait a bit to ensure Swiper updates active index correctly
      setTimeout(() => {
        const activeSlide = document.querySelector(".swiper-slide-active");
        const video = activeSlide.querySelector("video");
        if (video) {
          video.play().catch(err => console.log("Autoplay failed:", err));
        }
      }, 100);
    }
  }
});

