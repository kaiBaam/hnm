// ================== WINDOW LOAD ==================
window.onload = function() {

  // ================== THEME SWITCHER ==================
  const switchButton = document.getElementById("switchButton");
  const letterboxdLink = document.getElementById("letterboxdLink");

  if (switchButton && letterboxdLink) {
    switchButton.addEventListener("click", function() {
      document.body.classList.toggle("hilary-theme");
      if (document.body.classList.contains("hilary-theme")) {
        this.textContent = "Switch to H&W";
        document.querySelector(".title").textContent = "W&H Movie Reviews";
        letterboxdLink.href = "https://letterboxd.com/kaiBaam/";
      } else {
        this.textContent = "Switch to W&H";
        document.querySelector(".title").textContent = "H&W Movie Reviews";
        letterboxdLink.href = "https://letterboxd.com/jorgiina/";
      }
    });
  }

  // ================== SEARCH BAR TOGGLE ==================
  function showSearch() {
    const searchText = document.getElementById("searchText");
    const searchInput = document.getElementById("searchInput");

    if (searchText && searchInput) {
      if (searchInput.style.display === 'none') {
        searchText.style.display = 'none';
        searchInput.style.display = 'inline';
        searchInput.focus();
      } else {
        searchInput.style.display = 'none';
        searchText.style.display = 'inline';
      }
    }
  }

  window.showSearch = showSearch; // Make globally available

  // ================== SEARCH SUBMISSION ==================
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", function(e) {
      if (e.key === 'Enter') {
        const movieName = this.value.trim();
        if (movieName) {
          window.location.href = `results.html?search=${encodeURIComponent(movieName)}`;
        }
      }
    });
  }

  // ================== LATEST REVIEWS IMAGE SWITCHER ==================
  const titles = document.querySelectorAll('.right-titles li');
  const mainImage = document.getElementById('mainImage');
  const imageLink = document.getElementById('imageLink');

  if (titles.length > 0 && mainImage && imageLink) {
    titles.forEach(title => {
      title.addEventListener('mouseenter', () => {
        const newImage = title.getAttribute('data-image');
        const newLink = title.getAttribute('data-link');
        mainImage.src = newImage;
        imageLink.href = newLink;
      });
    });
  }

  // ================== RANDOMIZE STARTING SIDE ==================
  if (letterboxdLink && switchButton) {
    if (Math.random() < 0.5) {
      document.body.classList.add("hilary-theme");
      switchButton.textContent = "Switch to H&W";
      document.querySelector(".title").textContent = "W&H Movie Reviews";
      letterboxdLink.href = "https://letterboxd.com/kaiBaam/";
    } else {
      switchButton.textContent = "Switch to W&H";
      document.querySelector(".title").textContent = "H&W Movie Reviews";
      letterboxdLink.href = "https://letterboxd.com/jorgiina/";
    }
  }

};

