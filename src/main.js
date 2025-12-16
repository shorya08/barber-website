import { businessDetails, services, galleryItems, testimonials } from './data.js';

// --- Mobile Navigation Toggle ---
const navToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-navigation');

if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    const isVisible = primaryNav.getAttribute('data-visible') === 'true';
    primaryNav.setAttribute('data-visible', !isVisible);
    navToggle.setAttribute('aria-expanded', !isVisible);
    document.body.style.overflow = !isVisible ? 'hidden' : '';
  });
}

primaryNav?.addEventListener('click', (e) => {
  if (e.target.tagName === "A") {
    primaryNav.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  }
});

// --- Dynamic Content Rendering ---
function renderServices() {
  const container = document.getElementById('services-container');
  if (!container) return;

  container.innerHTML = services.map(category => `
    <div class="service-category">
      <h3 class="category-title">${category.category}</h3>
      <div class="service-list grid grid-2">
        ${category.items.map(item => `
          <div class="service-card">
            <div class="service-header">
              <h4 class="service-name">${item.name}</h4>
              <span class="service-price">${item.price}</span>
            </div>
            <p class="service-desc">${item.description}</p>
            <span class="service-duration"><span class="icon">⏱</span> ${item.duration}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderGallery() {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  container.innerHTML = galleryItems.map(item => {
    if (item.type === 'instagram') {
      return `
        <div class="gallery-item instagram-embed">
          <iframe src="${item.src}" width="100%" height="400" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
        </div>
      `;
    }
    return `
      <div class="gallery-item">
        <img src="${item.src}" alt="${item.alt}" loading="lazy">
      </div>
    `;
  }).join('');
}

function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  container.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="stars">${"★".repeat(t.rating)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <p class="testimonial-author">- ${t.name}</p>
    </div>
  `).join('');
}

// --- Booking Logic ---
function initBooking() {
  const form = document.getElementById('booking-form');
  const serviceSelect = document.getElementById('service-select');

  if (!form || !serviceSelect) return;

  // Populate services in dropdown
  services.forEach(category => {
    const group = document.createElement('optgroup');
    group.label = category.category;
    category.items.forEach(item => {
      const option = document.createElement('option');
      option.value = item.name;
      option.textContent = `${item.name} (${item.price})`;
      group.appendChild(option);
    });
    serviceSelect.appendChild(group);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const message = `*New Booking Request*%0A%0A` +
      `Name: ${data.name}%0A` +
      `Service: ${data.service}%0A` +
      `Date: ${data.date}%0A` +
      `Time: ${data.time}`;

    const waUrl = `${businessDetails.social.whatsapp}?text=${message}`;
    window.open(waUrl, '_blank');
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  renderGallery();
  renderTestimonials();
  initBooking();
});
