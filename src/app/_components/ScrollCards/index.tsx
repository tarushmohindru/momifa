'use client'
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollCards.module.scss';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Free Shipping',
    description: 'Free shipping for order above $150',
    gif: '/gif/free-shipping.gif'
  },
  {
    title: 'Money Guarantee',
    description: 'Within 30 days for an exchange',
    gif: '/gif/money-guarantee.gif',
  },
  {
    title: 'Online Support',
    description: '24 hours a day, 7 days a week',
    gif: '/gif/online-support.gif',
  },
  {
    title: 'Flexible Payment',
    description: 'Pay with multiple credit cards',
    gif: '/gif/flexible-payment.gif',
  },
];

const backgroundColors = ['#80024c', '#dfa0f0', '#4e2b9b', '#01d9fa'];
const textColors = ['#ffffff', '#000000'];
const HorizontalScroll = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const pin = gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: `-${services.length * 100}vw`,
          ease: 'none',
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: () => `+=${window.innerWidth * services.length}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            snap: {
              snapTo: 1 / services.length,
              duration: { min: 0.2, max: 0.3 },
              delay: 0,
              ease: 'power1.inOut',
            },
          },
        }
      );
      return () => {
        pin.kill();
      };
    }
  }, [isMobile]);

  return (
    <section className={styles.scrollSectionOuter} ref={triggerRef}>
      <div ref={sectionRef} className={styles.scrollSectionInner}>
        <div className={`${styles.scrollSection} ${styles.introSection}`}>
          <h1>Why Choose Momifa?</h1>
        </div>
        {services.map((service, index) => (
          <div key={index} className={styles.scrollSection}>
            <div className={styles.card}>
              <div className={styles.cardContent} style={{ backgroundColor: backgroundColors[index] }}>
               <div className={styles.cardHeading}>
               <h2 style={{ color: textColors[index % textColors.length] }}>{service.title}</h2>
               <p>{service.description}</p>
               </div>
                <div>
                <img
                  src={service.gif}
                  alt={`${service.title} GIF`}
                  className={styles.cardGif}
                />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;