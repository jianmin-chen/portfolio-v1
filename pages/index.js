import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { faCodepen, faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { useEffect } from "react";
import space from "../public/assets/space.svg";

export default function Index() {
    useEffect(() => {
        let container = document.getElementById("circles");
        let circles = [];

        const isCollision = (newCircle) => {
            let currentCircle;
            let deltaX, deltaY;
            let dist;

            for (let i = 0, len = circles.length; i < len; i++) {
                currentCircle = circles[i];
                deltaX = newCircle.coords.x - currentCircle.coords.x;
                deltaY = newCircle.coords.y - currentCircle.coords.y;
                dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                if (dist < newCircle.radius + currentCircle.radius) {
                    return true;
                }
            }

            return false;
        };

        const findPos = (radius) => {
            let minDist;
            let deltaAngle = 1;
            let dist = 0;
            let x, y;

            for (let angle = 0; angle < 360; angle += deltaAngle) {
                dist = 0;
                x = Math.cos(angle) * dist;
                y = Math.sin(angle) * dist;

                while (isCollision({
                    coords: {
                        x: x,
                        y: y
                    },
                    radius: radius
                })) {
                    dist++;
                    x = Math.cos(angle) * dist;
                    y = Math.sin(angle) * dist;
                }

                if (angle === 0 || dist < minDist.distance) {
                    minDist = {
                        distance: dist,
                        coords: {
                            x: x,
                            y: y
                        }
                    };
                }
            }

            return {
                x: minDist.coords.x,
                y: minDist.coords.y
            }
        };

        const addCircle = (radius, word, info) => {
            let coords = findPos(radius);
            circles.push({
                coords: {
                    x: coords.x,
                    y: coords.y
                },
                radius: radius
            });

            let circle = document.createElement("div");
            circle.style.width = `${radius * 2}px`;
            circle.style.height = `${radius * 2}px`;
            circle.style.top = `${coords.y - radius}px`;
            circle.style.left = `${coords.x - radius}px`;
            circle.className = "circle";
            circle.innerHTML = word;
            circle.addEventListener("mouseenter", (event) => event.target.setAttribute("data-before", info));
            container.appendChild(circle);
        };

        const words = {
            "Python": "My first programming language, and by far my favorite!",
            "Next.js": "Currently learning how to use this with React to build full-stack web apps.",
            "HTML": 'The first web-based "programming" language I learned.',
            "Figma": "My design tool of choice. Personally, I prefer directly using CSS (since we have libraries like TailwindCSS), but if I have to use a design tool, I typically go with Figma.",
            "SQL": "I typically use SQL for my Flask apps. However, I prefer NoSQL databases since relationships between data are more intuitive.",
            "CSS": "Of course, the de-facto design language of the web. I'm fond of design and happen to be a perfectionist, so you can trust me with any design.",
            "TailwindCSS": "Even though I just started using this, it's my far my favorite CSS libary. In fact, this portfolio was created with Next.js + TailwindCSS!",
            "JavaScript": "The language I've grown most accustomed to using since I mostly do web development.",
            "Jekyll": "Ruby-based tool I use for my blog. I've also designed a theme for it, listed in the projects below.",
            "React": "I mostly write JavaScript using React nowadays because it makes it so much more easier to interact with the DOM. Plus, it's helped me learned a lot about how the Node + NPM ecosystem works.",
            "MongoDB": "A NoSQL database I typically use for my Express apps.",
            "Sass": "Sass, along with TailwindCSS, makes it 10x easier to write CSS. I'm currently trying to figure out how to merge them to get the best experience.",
            "Flask": "The first web framework I learned (through CS50, of course) that allowed me to create full-stack web apps and opened up a whole new world for me.",
            "Express": "Similar to Flask, but in JavaScript.",
            "Bootstrap": "The CSS library I used before I switched over to TailwindCSS."
        };
        for (let [word, info] of Object.entries(words)) {
            addCircle(word.length * 8, word, info);
        }
    }, []);

    return (
        <div className="overflow-hidden relative lg:p-10">
            <style jsx global>{`
                .circle {
                    align-items: center;
                    border: 1px solid;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    opacity: 0.4;
                    position: absolute;
                    padding: 10px;
                    transition: all .2s ease-out;
                }

                .circle:hover {
                    opacity: 1;
                }

                .circle:hover::before {
                    background-color: #374151;
                    border-radius: 0.375rem;
                    content: attr(data-before);
                    padding: 10px;
                    position: absolute;
                    top: 0; left: -305px;
                    width: 300px;
                    z-index: 2;
                }
            `}</style>
            <div className="bg-slate-800 shadow-2xl">
                <div className="border-b-8 border-double p-2 md:p-10 relative rounded-b-full h-screen">
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-sans md:font-display font-extrabold lowercase relative text-8xl lg:text-9xl z-10" data-aos="fade-up" data-aos-delay="200">Hi, I&apos;m Jianmin Chen</h1>
                    <Image data-aos="fade-up-left" data-aos-delay="200" layout="fill" objectFit="cover" src={space}/>
                </div>
                <div className="py-10">
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500 font-extrabold pb-2 px-1 md:px-0 text-5xl text-center" data-aos="fade-up">I&apos;m a high school student with a passion for building things.</h1>
                    <div className="md:grid grid-cols-2 gap-2 mb-10 p-3 md:p-10 2xl:px-96">
                        <div className="prose prose-md prose-invert" data-aos="fade-right">
                            <p>I discovered programming at the age of ten when I discovered a book by accident at my local library called <i>Python for Kids</i>. Since then, I’ve learned about web development entirely by myself through the Internet, taking the well-known <a className="underline" href="https://cs50.harvard.edu/">CS50</a> course to learn Flask and researching and learning how to use various web frameworks and databases.</p>
                            <p>While web development is my main focus, I&apos;m excited by all aspects computer, whether that be hardware or software. At school, I&apos;m in a program where we study IT and regularly build computers and cables as well as set up routers and switches to learn more about the inner workings of computer hardware.</p>
                            <p>Currently, I&apos;m learning more about Blockchains and hackathons. <i>Hint: Hover on the circles if you&apos;re on desktop!</i></p>
                        </div>
                        <div className="relative w-full h-full" data-aos="fade-left" id="circle-container">
                            <div className="md:absolute inset-60 2xl:top-52" id="circles"></div>
                        </div>
                    </div>
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500 font-extrabold pb-2 px-1 md:px-0 text-5xl text-center" data-aos="zoom-in">These are (just) some of my projects.</h1>
                    <div className="mb-10 prose prose-invert px-2 md:px-10 max-w-none" data-aos="zoom-in">
                        <p className="lead text-center">Take a look at them and let me know your thoughts! (Plus, I&apos;ve got a few top-secret projects I&apos;m currently working on that are nearly done, and smaller projects that can be found on the social media links below.)</p>
                        <div className="cards md:grid grid-cols-3 gap-4 md:py-10">
                            <div className="mb-4 md:mb-0 space-y-4">
                                <div className="bg-gray-700 rounded-md p-8">
                                    <h2>OfficeHours</h2>
                                    <p>It&apos;s as simple as it sounds: office hours for inboxes. Users can choose a time, and people will only be able to message them during this time.</p>
                                    <a href="https://officehrs.herokuapp.com/">View web app &rarr;</a>
                                </div>
                                <div className="bg-gray-700 rounded-md p-8">
                                    <h2>Inkling</h2>
                                    <p>A chatroom application where you can create chatrooms and message people! I created this in order to learn Flask, and while it&apos;s not the most efficient (it doesn&apos;t use sockets), it worked and is definitely something I&apos;m proud of.</p>
                                    <a href="https://inkling-chat.herokuapp.com/">View web app &rarr;</a>
                                </div>
                            </div>
                            <div className="mb-4 md:mb-0 space-y-4">
                                <div className="bg-gray-700 rounded-md p-8">
                                    <h2>VolunteerPedia</h2>
                                    <p>A proof-of-concept I&apos;m hoping to build upon. Basically, the concept behind it is this: gamify the volunteering experience to make it fun for those who don&apos;t typically volunteer!</p>
                                    <a href="https://volunteerpedia.herokuapp.com/">View web app &rarr;</a>
                                </div>
                                <div className="bg-gray-700 rounded-md p-8">
                                    <h2>Eloquent</h2>
                                    <p>Eloquent is a Typora theme designed for writing technical books. It&apos;s minimal and easy to use, and actually based on a book I read on JavaScript called <i>Eloquent JavaScript</i>. (Typora is a desktop Markdown editor that I commonly use.)</p>
                                    <a href="https://theme.typora.io/theme/Eloquent/">View theme page &rarr;</a>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gray-700 rounded-md p-8">
                                    <h2>SoupJS</h2>
                                    <p>JavaScript library for simple web scraping. through this project, I learned a lot about how JavaScript <code>async</code> functions work, as well as what <code>Promise</code>s do. This was actually my final project for CS50!</p>
                                    <a href="https://jianmin-chen.github.io/soupjs-docs/">View library documentation &rarr;</a>
                                </div>
                                <div className="bg-gray-700 rounded-md p-8">
                                    <h2>TechDoc</h2>
                                    <p>TechDoc is a Jekyll theme designed for writing technical documentation! It&apos;s quick and easy to set up, and has over 10,000 downloads. (Jekyll is a blogging tool written in Ruby.)</p>
                                    <a href="https://rubygems.org/gems/TechDoc-jekyll-theme">View library on RubyGems.org &rarr;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500 font-extrabold pb-2 px-1 md:px-0 text-5xl text-center" data-aos="fade-down">Interested in contacting me?</h1>
                    <div className="content-center md:grid grid-cols-2 gap-5 justify-center p-3 md:p-10 2xl:px-96 space-y-4">
                        <form action="https://formspree.io/f/xyybngwn" className="flex flex-col gap-3" data-aos="fade-up" method="post">
                            <input autoComplete="off" className="bg-gray-700 border-none block mt-1 px-5 py-3 rounded-md w-full focus:border-none focus:ring-0" name="name" placeholder="Name..." required type="text"/>
                            <input autoComplete="off" className="bg-gray-700 border-none block mt-1 px-5 py-3 rounded-md w-full focus:border-none focus:ring-0" name="email" placeholder="Email..." required type="email"/>
                            <textarea autoComplete="off" className="bg-gray-700 border-none block mt-1 px-5 py-3 resize-none rounded-md w-full focus:border-none focus:ring-0" name="info" placeholder="What's your question?" required rows="5"/>
                            <button className="bg-gray-600 font-semibold py-2 px-3 rounded-md text-white focus:outline-none">Shoot me a message!</button>
                        </form>
                        <div className="prose prose-md prose-invert" data-aos="fade-left">
                            <p>Let me know your name, email, and question and I&apos;ll get back to you right away! I can also be found through the following social media:</p>
                            <div className="flex flex-wrap gap-3">
                                <a className="bg-slate-700 font-semibold py-2 px-3 no-underline rounded-md text-white focus:outline-none" href="https://codepen.io/JianminChen">
                                    <FontAwesomeIcon className="mr-1" icon={faCodepen}/>
                                    Codepen (find my smaller projects here)
                                </a>
                                <a className="bg-slate-700 font-semibold py-2 px-3 no-underline rounded-md text-white focus:outline-none" href="https://github.com/jianmin-chen">
                                    <FontAwesomeIcon className="mr-1" icon={faGithub}/>
                                    GitHub
                                </a>
                                <a className="bg-slate-700 font-semibold py-2 px-3 no-underline rounded-md text-white focus:outline-none" href="https://stackoverflow.com/users/12561168/jianmin-chen">
                                    <FontAwesomeIcon className="mr-1" icon={faStackOverflow}/>
                                    Stack Overflow
                                </a>
                                <a className="bg-slate-700 font-semibold py-2 px-3 no-underline rounded-md text-white focus:outline-none" href="https://jianminchen.com">
                                    <FontAwesomeIcon className="mr-1" icon={faBlog}/>
                                    Blog
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
