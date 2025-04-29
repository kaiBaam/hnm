// script.js

window.onload = function() {
  // Switch theme when button is clicked
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

  // Show the search input when clicking the search text
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
  window.showSearch = showSearch; // make it global

  // Logic for search submissions
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

  // Latest Reviews section image switcher
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

  // Randomize which side is displayed on initial load
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

  // Fetch and display blog posts from Strapi
  fetch('http://localhost:1337/api/posts?populate=*')
    .then(response => response.json())
    .then(data => {
      const posts = data.data;
      const postsGrid = document.getElementById('postsGrid');

      if (postsGrid) {
        posts.forEach(post => {
          const attributes = post.attributes;
          const title = attributes.Title || "Untitled";
          const body = attributes.Body || "";
          const date = attributes.Date || "";
          const genre = attributes.Genre || "Review";

          let imageUrl = "";
          if (attributes.Poster?.data?.attributes?.url) {
            imageUrl = attributes.Poster.data.attributes.url;
            if (imageUrl.startsWith('/')) {
              imageUrl = `http://localhost:1337${imageUrl}`;
            }
          }

          const article = document.createElement('article');
          article.className = 'tease-post';
          article.innerHTML = `
            <div class="post-meta">
              <time datetime="${date}">${date}</time>
              <span class="post-tag">${genre}</span>
            </div>
            <div class="post-content">
              <h3><a href="#">${title}</a></h3>
              <p>${body.substring(0, 100)}...</p>
            </div>
            <hr>
          `;
          postsGrid.appendChild(article);
        });
      }
    })
    .catch(err => console.error('Error loading posts:', err));
};
