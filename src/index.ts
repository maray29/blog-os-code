import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  // Blog OS code
  const asteriskIcon = document.querySelector('[am-element="asterisk-icon"]');

  gsap.to(asteriskIcon, {
    rotation: 360,
    scrollTrigger: {
      trigger: asteriskIcon,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
      // markers: true,
    },
  });

  // Toggle Animation
  const toggle = document.querySelector('[am-element="toggle"]');
  const toggleFill = document.querySelector('[am-element="toggle-fill"]');
  const moon = document.querySelector('[am-element="moon"]');
  const sun = document.querySelector('[am-element="sun"]');

  console.log('running');

  // toggle?.addEventListener('click', () => {
  //   toggleTl.to(toggleFill, {
  //     xPercent: 100,
  //   });
  // });

  // Timeline created and paused
  const toggleTl = gsap.timeline({ defaults: { ease: 'none' }, paused: true });

  toggleTl.set(sun, {
    opacity: 1,
  });

  toggleTl
    .to(toggleFill, {
      xPercent: 100,
      duration: 0.5,
    })
    .to(
      moon,
      {
        // yPercent: 150,
        // opacity: 0,
        duration: 0.5,
      },
      '<'
    )
    .to(
      sun,
      {
        // opacity: 1,
        duration: 0.5,
      },
      '<'
    );

  toggle?.addEventListener('click', () => {
    if (toggleTl.progress() === 0) {
      gsap.to(toggleTl, { time: toggleTl.duration(), ease: 'power3.out' });
    } else {
      gsap.to(toggleTl, { time: 0, ease: 'power4.out', overwrite: true });
    }
  });

  if (sessionStorage.getItem('visited') === null) {
    document.documentElement.classList.add('show-loader');
  }
  if (localStorage.getItem('dark-mode') !== null) {
    document.documentElement.classList.add('light-mode');
  }

  sessionStorage.setItem('visited', 'true');

  let myTimeout;
  $('.toggle').on('click', function () {
    clearTimeout(myTimeout);
    $('html').addClass('transition');
    myTimeout = setTimeout(() => {
      $('html').removeClass('transition');
    }, 600);
    $('body').toggleClass('light-mode');
    if ($('body').hasClass('light-mode')) {
      localStorage.setItem('light-mode', 'true');
    } else {
      localStorage.removeItem('light-mode');
    }
  });

  // Blog OS Homepage header animation

  const squareElement = document.querySelector('[am-element="square-element"]');
  const headerH1 = document.querySelector('[am-element="home-header_heading"]');
  const message = document.querySelector('[am-element="message-element"]');

  // Split heading into lines.
  const text = SplitType.create(headerH1);
  // Animate lines.

  gsap.to(squareElement, {
    scrollTrigger: {
      trigger: squareElement,
      start: 'top 20%',
      end: 'bottom -10%',
      scrub: 1.5,
      // markers: true,
    },
    yPercent: 40,
    immediateRender: false,
  });

  gsap.to(message, {
    yPercent: 40,
    scrollTrigger: {
      trigger: message,
      start: 'top 80%',
      end: 'bottom -10%',
      scrub: 1.5,
      // markers: true,
    },
  });

  // gsap.to(text.lines, {
  //   scrollTrigger: {
  //     trigger: headerH1,
  //     start: 'top 20%',
  //     end: 'bottom -20%',
  //     scrub: 1.5,
  //     markers: true,
  //   },
  //   yPercent: -200,
  //   immediateRender: false,
  //   stagger: 0.01,
  // });
  let speed = 400;

  text.lines?.forEach((target) => {
    speed -= 80;
    gsap.to(target, {
      yPercent: speed * -1,
      // ease: 'none',
      stagger: 0.1,
      scrollTrigger: {
        trigger: headerH1,
        start: 'top 20%',
        end: 'bottom -50%',
        // markers: true,
        scrub: 1,
      },
    });
  });

  console.log(text.lines);

  // Lazy.so rebuild code
  // const fadeInElements = gsap.utils.toArray('[am-element="fade-in"]');
  // const sphere = document.querySelector('[am-element="sphere"]');
  // const light = document.querySelector('[am-element="light-beam"]');
  // const textCursor = document.querySelector('[am-element="text-cursor"]');
  // const captureButton = document.querySelector('[am-element=capture-button');
  // const tooltip = document.querySelector('[am-element=ui-tooltip');

  // const tl = gsap.timeline();

  // tl.from(sphere, {
  //   y: 300,
  //   x: 300,
  //   opacity: 0,
  //   duration: 1,
  // });
  // tl.to(sphere, {
  //   rotate: 360,
  //   duration: 2,
  // });
  // tl.to(
  //   sphere,
  //   {
  //     scale: 1.15,
  //     delay: 1.25,
  //     duration: 1.5,
  //   },
  //   '<'
  // );

  // tl.from(
  //   fadeInElements,
  //   {
  //     y: 200,
  //     opacity: 0,
  //     ease: 'power4.out',
  //     duration: 2,
  //     stagger: 0.2,
  //   },
  //   '<'
  // );

  // tl.from(
  //   light,
  //   {
  //     opacity: 0,
  //     scale: 0.95,
  //     ease: 'power4.out',
  //     duration: 0.75,
  //     delay: 1.5,
  //   },
  //   '<'
  // );

  // gsap.to(sphere, {
  //   scrollTrigger: {
  //     trigger: sphere,
  //     start: '-30% top',
  //     end: '50%',
  //     scrub: 1,
  //     // markers: true,
  //   },
  //   duration: 2,
  //   yPercent: 50,
  //   immediateRender: false,
  // });

  // if (!captureButton) {
  //   return;
  // }

  // const tooltipTl = gsap.timeline();
  // tooltipTl.to(tooltip, { opacity: 1, duration: 0.35 });
  // tooltipTl.pause();

  // captureButton.addEventListener('mouseenter', () => {
  //   tooltipTl.play();
  // });
  // captureButton.addEventListener('mouseleave', () => {
  //   tooltipTl.reverse();
  // });
});
