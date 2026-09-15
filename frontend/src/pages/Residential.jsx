import { useEffect } from 'react';
import './Residential.css';

export default function Residential() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.res-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('res-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const html = `
    <section class="res-hero">
      <div class="res-hero-inner res-reveal">
        <p class="eyebrow">Residential</p>
        <h1>Residential</h1>
        <p>Thoughtfully crafted spaces, designed around the way you live.</p>
        <div class="actions">
          <a href="#res-work" class="btn-primary">View Our Work <span style="font-size:1.1rem;">→</span></a>
          <a href="#/contact" class="btn-outline">Start a Project <span style="font-size:1.1rem;">→</span></a>
        </div>
      </div>
    </section>

    <section class="res-intro">
      <div class="container res-intro-grid">
        <div class="res-reveal">
          <img src="/images/IMG_9687.jpg" alt="Refined residential interior" loading="lazy" decoding="async">
        </div>
        <div class="res-reveal">
          <h2>Spaces made for living.</h2>
          <p>We create residential spaces where thoughtful design, quality craftsmanship, and everyday functionality come together. Every project is shaped by how a home is actually used, not just how it looks.</p>
        </div>
      </div>
    </section>

    <section class="res-services">
      <div class="container">
        <div class="head res-reveal">
          <h2>What We Do</h2>
          <div class="line"></div>
        </div>
        <div class="res-services-grid">
          <article class="res-service res-reveal">
            <p class="num">01 — Kitchens</p>
            <h3>Kitchens</h3>
            <p>Renovations, backsplashes, and custom finishes.</p>
          </article>
          <article class="res-service res-reveal">
            <p class="num">02 — Bathrooms</p>
            <h3>Bathrooms</h3>
            <p>Bathroom upgrades, custom showers, and detailed tile work.</p>
          </article>
          <article class="res-service res-reveal">
            <p class="num">03 — Tile &amp; Flooring</p>
            <h3>Tile &amp; Flooring</h3>
            <p>Precise installation across a range of formats and materials.</p>
          </article>
          <article class="res-service res-reveal">
            <p class="num">04 — Waterproofing</p>
            <h3>Waterproofing</h3>
            <p>Professional waterproofing for durable, reliable spaces.</p>
          </article>
          <article class="res-service res-reveal">
            <p class="num">05 — Home Renovations</p>
            <h3>Home Renovations</h3>
            <p>Thoughtful improvements tailored to your home.</p>
          </article>
          <article class="res-service res-reveal">
            <p class="num">06 — Custom Details</p>
            <h3>Custom Details</h3>
            <p>Fireplaces, feature walls, 45° angles, and other custom finishes.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="res-work" id="res-work">
      <div class="container">
        <div class="head res-reveal">
          <h2>Residential Work</h2>
          <div class="line"></div>
        </div>
        <div class="res-work-grid">
          <article class="res-work-item res-reveal">
            <img src="/images/IMG_0308.jpg" alt="Kitchen" loading="lazy" decoding="async">
            <div class="res-work-info">
              <h3>Kitchen</h3>
            </div>
          </article>
          <article class="res-work-item res-reveal">
            <img src="/images/IMG_0447.jpg" alt="Bathroom" loading="lazy" decoding="async">
            <div class="res-work-info">
              <h3>Bathroom</h3>
            </div>
          </article>
          <article class="res-work-item res-reveal">
            <img src="/images/IMG_0460.jpg" alt="Custom Shower" loading="lazy" decoding="async">
            <div class="res-work-info">
              <h3>Custom Shower</h3>
            </div>
          </article>
          <article class="res-work-item res-reveal">
            <img src="/images/IMG_9687.jpg" alt="Living Space" loading="lazy" decoding="async">
            <div class="res-work-info">
              <h3>Living Space</h3>
            </div>
          </article>
        </div>
        <div class="res-reveal" style="text-align:center; margin-top:2.5rem;">
          <a href="#/residential" class="res-work-link">View All Projects <span style="font-size:1.1rem;">→</span></a>
        </div>
      </div>
    </section>

    <section class="res-statement">
      <div class="res-statement-inner res-reveal">
        <h2>Details make the difference.</h2>
        <p>From material selection to the final installation, every detail is considered.</p>
      </div>
    </section>

    <section class="res-cta">
      <div class="container res-reveal">
        <h2>Ready to transform your home?</h2>
        <p>Let's turn your ideas into a space that feels uniquely yours.</p>
        <div class="actions">
          <a href="#/contact" class="btn-primary">Start a Project <span style="font-size:1.1rem;">→</span></a>
          <a href="#/contact" class="btn-outline">Contact Us <span style="font-size:1.1rem;">→</span></a>
        </div>
      </div>
    </section>
  `;

  return <div className="residential-page" dangerouslySetInnerHTML={{ __html: html }} />;
}
