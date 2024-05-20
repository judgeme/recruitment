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
