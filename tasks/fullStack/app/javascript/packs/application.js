// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

function fetchPages(page, productId) {
  const url = new URL(`/reviews/${productId}/update_reviews`, window.location.origin);
  url.searchParams.set('page', page);

  fetch(url, {
    method: 'GET',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'text/javascript',
    }
  })
    .then(response => response.text())
    .then(data => {
      eval(data);
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
}

document.addEventListener("turbolinks:load", function () {
  document.querySelectorAll('nav.pagination-nav a.page-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const productId = this.dataset.productId;
      const page = this.dataset.page;

      fetchPages(page, productId);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const productSelect = document.getElementById('product-select');

  if (!productSelect) {
    return;
  }

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search for a product';
  searchInput.id = 'product-search';
  productSelect.parentNode.insertBefore(searchInput, productSelect);

  let timeout = null;

  searchInput.addEventListener('input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      const query = searchInput.value.trim();
      if (query.length > 4) {
        fetch(`/products/search?q=${encodeURIComponent(query)}`)
          .then(response => response.json())
          .then(data => {
            productSelect.innerHTML = '<option value="">Select a Product</option>';
            data.items.forEach(product => {
              const option = document.createElement('option');
              option.value = product.id;
              option.textContent = product.title;
              productSelect.appendChild(option);
            });
          })
          .catch(error => console.error('Error fetching products:', error));
      } else {
        productSelect.innerHTML = '<option value="">Select a Product</option>';
      }
    }, 300);
  });
});
