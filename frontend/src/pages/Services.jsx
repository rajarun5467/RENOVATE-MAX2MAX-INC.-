import { useEffect } from 'react';
import './Services.css';

export default function Services() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.ser-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('ser-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const html = `
    <section class="ser-hero">
      <div class="ser-hero-inner ser-reveal">
        <p class="eyebrow">Services</p>
        <h1>Services</h1>
        <p>Craftsmanship, precision, and thoughtful solutions for every space.</p>
        <a href="#/contact" class="btn-primary">Start a Project <span style="font-size:1.1rem;">→</span></a>
      </div>
    </section>

    <section class="ser-intro">
      <div class="container ser-intro-grid">
        <div class="ser-reveal">
          <img src="/images/IMG_0308.jpg" alt="Modern kitchen interior" loading="lazy" decoding="async">
        </div>
        <div class="ser-reveal">
          <h2>Built around quality.</h2>
          <p>From detailed tile installation to complete home improvements, we bring careful planning, quality materials, and precise craftsmanship to every project.</p>
        </div>
      </div>
    </section>

    <section class="ser-main">
      <div class="container">
        <div class="head ser-reveal">
          <h2>What We Do</h2>
          <div class="line"></div>
        </div>
        <div class="ser-services-grid">
          <article class="ser-service ser-reveal">
            <p class="num">01 — Tile &amp; Flooring</p>
            <h3>Tile &amp; Flooring</h3>
            <p>Professional installation for all tile formats and flooring applications.</p>
          </article>
          <article class="ser-service ser-reveal">
            <p class="num">02 — Bathroom Upgrades</p>
            <h3>Bathroom Upgrades</h3>
            <p>Complete bathroom improvements with quality finishes and detailed execution.</p>
          </article>
          <article class="ser-service ser-reveal">
            <p class="num">03 — Kitchen Backsplash</p>
            <h3>Kitchen Backsplash</h3>
            <p>Custom backsplash installation designed to complement your kitchen.</p>
          </article>
          <article class="ser-service ser-reveal">
            <p class="num">04 — Custom Showers</p>
            <h3>Custom Showers</h3>
            <p>Custom shower installations with detailed tile work and waterproofing.</p>
          </article>
          <article class="ser-service ser-reveal">
            <p class="num">05 — Waterproofing</p>
            <h3>Waterproofing</h3>
            <p>Reliable waterproofing solutions designed for long-lasting performance.</p>
          </article>
          <article class="ser-service ser-reveal">
            <p class="num">06 — Fireplace</p>
            <h3>Fireplace</h3>
            <p>Custom fireplace tile work and feature installations.</p>
          </article>
          <article class="ser-service ser-reveal">
            <p class="num">07 — Home Repairs</p>
            <h3>Home Repairs</h3>
            <p>Practical repairs and improvements for residential spaces.</p>
          </article>
          <article class="ser-service ser-reveal">
            <p class="num">08 — Appliance Installations</p>
            <h3>Appliance Installations</h3>
            <p>Professional appliance installation and related home improvements.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="ser-specialty">
      <div class="container">
        <div class="head ser-reveal">
          <h2>The Details Matter.</h2>
          <div class="line"></div>
        </div>
        <div class="ser-specialty-grid">
          <article class="ser-specialty-card ser-reveal">
            <div class="thumb">
              <img src="/images/IMG_9381.jpg" alt="45 degree tile cuts" loading="lazy" decoding="async">
            </div>
            <div class="body">
              <h3>45° Angles</h3>
              <p>Precise cuts and professional finishing.</p>
            </div>
          </article>
          <article class="ser-specialty-card ser-reveal">
            <div class="thumb">
              <img src="/images/IMG_9389.jpg" alt="Different tile formats" loading="lazy" decoding="async">
            </div>
            <div class="body">
              <h3>All Tile Formats</h3>
              <p>Experience with different tile sizes, shapes, and formats.</p>
            </div>
          </article>
          <article class="ser-specialty-card ser-reveal">
            <div class="thumb">
              <img src="/images/IMG_9446.jpg" alt="Custom fireplace finish" loading="lazy" decoding="async">
            </div>
            <div class="body">
              <h3>Custom Finishes</h3>
              <p>Detailed solutions tailored to each project.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="ser-areas">
      <div class="container ser-areas-grid">
        <a href="#/residential" class="ser-area ser-reveal">
          <img src="/images/IMG_9687.jpg" alt="Residential space" loading="lazy" decoding="async">
          <div class="ser-area-content">
            <h3>Residential</h3>
            <p>Homes, renovations, bathrooms, kitchens, flooring, and custom spaces.</p>
            <span>Explore Residential →</span>
          </div>
        </a>
        <a href="#/" class="ser-area ser-reveal">
          <img src="/images/IMG_0212.jpg" alt="Commercial space" loading="lazy" decoding="async">
          <div class="ser-area-content">
            <h3>Commercial</h3>
            <p>Professional tile, flooring, repairs, and installation solutions.</p>
            <span>Explore Commercial →</span>
          </div>
        </a>
      </div>
    </section>

    <section class="ser-cta">
      <div class="container ser-reveal">
        <h2>Have a project in mind?</h2>
        <p>Tell us what you're planning. Let's create a space built with precision and care.</p>
        <div class="actions">
          <a href="#/contact" class="btn-primary">Start a Project <span style="font-size:1.1rem;">→</span></a>
          <a href="#/contact" class="btn-outline">Contact Us <span style="font-size:1.1rem;">→</span></a>
        </div>
      </div>
    </section>
  `;

  return <div className="services-page" dangerouslySetInnerHTML={{ __html: html }} />;
}
