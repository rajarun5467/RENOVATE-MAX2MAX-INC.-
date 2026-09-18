import { useEffect, useRef } from 'react';
import { useContent, imageUrl } from '../hooks/useContent.js';
import './Testimonials.css';

export default function Testimonials() {
  const { data: testimonials, loading } = useContent('testimonials');
  const sectionRef = useRef(null);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.test-reveal');
    if (!reveals) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('test-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [testimonials, loading]);

  if (loading || !testimonials || testimonials.length === 0) return null;

  return (
    <section className="test-section" ref={sectionRef}>
      <div className="container">
        <div className="head test-reveal">
          <h2>What Our Clients Say</h2>
          <div className="line"></div>
        </div>
        <div className="test-grid">
          {testimonials.map((t, i) => (
            <article className="test-card test-reveal" key={t.id || i}>
              <div className="test-stars">
                {'★'.repeat(t.rating || 5)}{'☆'.repeat(5 - (t.rating || 5))}
              </div>
              <p className="test-text">"{t.text}"</p>
              <div className="test-author">
                {t.image && <img src={imageUrl(t.image)} alt={t.name} loading="lazy" />}
                <div>
                  <strong>{t.name}</strong>
                  {t.designation && <span>{t.designation}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
