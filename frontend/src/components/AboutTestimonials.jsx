import { useEffect, useRef, useState, useCallback } from 'react';
import { useContent, imageUrl } from '../hooks/useContent.js';
import './AboutTestimonials.css';

export default function AboutTestimonials() {
  const { data: testimonials, loading } = useContent('testimonials');
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const sectionRef = useRef(null);

  // Responsive: determine how many cards to show
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 768) setPerView(1);
      else if (w <= 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.abt-test-reveal');
    if (!reveals) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('abt-test-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [testimonials, loading]);

  const maxIndex = testimonials ? Math.max(0, testimonials.length - perView) : 0;

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, maxIndex)), [maxIndex]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  // Reset index if testimonials change or perView changes
  useEffect(() => { if (index > maxIndex) setIndex(maxIndex); }, [maxIndex, index]);

  // Autoplay — advance every 5 seconds, pause on hover/touch
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!testimonials || testimonials.length <= perView || paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [testimonials, perView, paused, maxIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (!sectionRef.current?.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  if (loading || !testimonials || testimonials.length === 0) return null;

  const pages = Math.ceil(testimonials.length / perView);
  const currentDot = Math.floor(index / perView);

  return (
    <section className="abt-testimonials" ref={sectionRef}>
      <div className="container">
        <div className="abt-test-head abt-test-reveal">
          <p className="abt-test-label">Client Stories</p>
          <h2>What Our Clients Say</h2>
          <div className="abt-test-line"></div>
          <p className="abt-test-sub">Real experiences from homeowners and businesses across Edmonton.</p>
        </div>

        <div className="abt-test-slider-wrap abt-test-reveal">
          {/* Slider track */}
          <div
            className="abt-test-track"
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => { setPaused(true); setTouchStart(e.touches[0].clientX); }}
            onTouchEnd={(e) => {
              if (touchStart === null) return;
              const diff = touchStart - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
              setTouchStart(null);
              setPaused(false);
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={t.id || i}
                className={`abt-test-card ${i >= index && i < index + perView ? 'active' : ''}`}
                style={{ flex: `0 0 ${100 / perView}%` }}
              >
                <div className="abt-test-card-inner">
                  <span className="abt-test-quote" aria-hidden="true">"</span>
                  <div className="abt-test-stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} className={s < (t.rating || 5) ? 'filled' : ''}>★</span>
                    ))}
                  </div>
                  <p className="abt-test-text">{t.text}</p>
                  <div className="abt-test-divider"></div>
                  <div className="abt-test-author">
                    {t.image ? (
                      <img src={imageUrl(t.image)} alt={t.name} loading="lazy" />
                    ) : (
                      <div className="abt-test-avatar">{(t.name || '?').charAt(0).toUpperCase()}</div>
                    )}
                    <div className="abt-test-meta">
                      <strong>{t.name}</strong>
                      {t.designation && <span>{t.designation}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="abt-test-nav abt-test-reveal">
          <button
            className="abt-test-arrow"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous testimonials"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M6 1L1 7L6 13M1 7H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="abt-test-dots">
            {Array.from({ length: pages }).map((_, d) => (
              <button
                key={d}
                className={`abt-test-dot ${d === currentDot ? 'active' : ''}`}
                onClick={() => setIndex(d * perView)}
                aria-label={`Go to page ${d + 1}`}
              />
            ))}
          </div>

          <button
            className="abt-test-arrow"
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Next testimonials"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M14 1L19 7L14 13M19 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
