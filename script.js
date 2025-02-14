gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
const texts = ["No Expensive Courses. Just Free, Quality Learning.", "Tech is Fast. Learn Faster with Ujjwalit!", "Crack AI, Web Dev, and More—Without the Noise."];
let index = 0;
function changeText() {
  gsap.to(".dynamic-text", { 
    text: texts[index], 
    duration: 2, 
    ease: "power1.inOut",
    onComplete: () => {
      index = (index + 1) % texts.length;
      setTimeout(changeText, 2000); // Change every 2s
    }
  });
}
setTimeout(changeText, 3000);

function scrollTextHighlight(){
    const splitTypes = document.querySelectorAll('.scroll-highlight');
    splitTypes.forEach((char, i)=>{
        const text = new SplitType(char, {types: ['chars','words']});
        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: char,
                start: 'top 80%',
                end: 'top 10%',
                scrub: true,
                mobile: true,
            },
            opacity: 0.2,
            stagger: 0.5,
        })
    })
}
if (!window.matchMedia("(max-width: 768px)").matches) {
    scrollTextHighlight();
  } else {
    document.querySelectorAll('.scroll-highlight').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
  }

function navExplode(){
    const YPERCENT = 25;
    const YPERCENTRandomOffset = 15;
    const XPERCENT = 100;
    const RotationRandomOffset = 15;

    const animateAttr = `[wb-exploding-text="animated-text"]`;

    const getXPercent = (strLength, strIndex) => {
        return (XPERCENT * 2 * strIndex) / (strLength - 1) - XPERCENT;
    }

    const getYPercent = (strIndex) =>{
        const randomOffset = Math.floor(Math.random() * (2* YPERCENTRandomOffset + 1)) - YPERCENTRandomOffset;
    
        const Ypercent = strIndex % 2 === 0 ? YPERCENT * -1 : YPERCENT;
         return Ypercent + randomOffset;
    };

    const getRandomRotation = ()=>{
        return (Math.floor(Math.random() * (2 * RotationRandomOffset + 1)) - RotationRandomOffset)
    }

    const explode = () =>{
        const explodingElements = document.querySelectorAll(animateAttr); 
    
        if(!explodingElements.length){
            return; 
        }
    
        explodingElements.forEach((element) => {  
            const splittext = new SplitType(element);
            const chars = splittext.chars;
    
            element.addEventListener('mouseenter', () => { 
                if (!chars) return;
                for (let i = 0; i < chars.length; i++) {
                    let xPercent = getXPercent(chars.length, i);
                    let yPercent = getYPercent(i);
                    let rotateZ = getRandomRotation();
                    gsap.to(chars[i], {
                        xPercent,
                        yPercent,
                        rotateZ
                    });
                }
            });
    
            element.addEventListener("mouseleave", () => { 
                if (!chars) return;
                gsap.to(chars, {
                    xPercent: 0,
                    yPercent: 0,
                    rotateZ: 0,
                });
            });
        });
    };
    explode();
};

navExplode();

function cardGradient(){
    document.getElementById("cards").onmousemove = (e) =>{
        const cards = document.querySelectorAll(".cards");
        for (const card of cards) {
            const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
    
            card.style.setProperty("--mouse-x", (`${x}`)+ "px");
            card.style.setProperty("--mouse-y", (`${y}`)+ "px");
       
        }
    }
}
cardGradient();

function revealText(){
  const textElements = document.querySelectorAll(".reveal-text");
  textElements.forEach((el) => {
    const text = new SplitType(el, { types: "chars" });
    gsap.from(text.chars, { 
      y: 50, 
      opacity: 0, 
      stagger: {
         each: 0.05, 
         from: "left" }, 
      duration: 1.5, 
      delay: 1,
      ease: "elastic.out(1, 0.5)"
    });
  });
}
revealText();

const fadeInElements = document.querySelectorAll('.fade-in');

fadeInElements.forEach((element) => {
  gsap.from(element, {
    opacity: 0,  
    y: 50, 
    duration: 1.8,
    ease: "power2.out", 
    scrollTrigger: {
      trigger: element, 
      start: "top 80%",  
      toggleActions: "play none none none", 
    }
  });
});

