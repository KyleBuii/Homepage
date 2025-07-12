import { memo, useEffect, useMemo, useState } from 'react';
import { FaGithub, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail, IoMdOpen } from 'react-icons/io';
import './Homepage.scss';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function Homepage() {
    const [init, setInit] = useState(false);
    const [description, setDescription] = useState('');
    const [linkGithub, setLinkGithub] = useState('');
    const [linkLinkedIn, setLinkLinkedIn] = useState('');
    const [projects, setProjects] = useState({});
    const options = useMemo(
        () => ({
            fpsLimit: 60,
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        area: 800,
                    },
                },
                color: {
                    value: "#ffffff",
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: { min: 0.1, max: 0.5 },
                    animation: {
                        enable: true,
                        speed: 0.5,
                        minimumValue: 0.1,
                        sync: false,
                    },
                },
                size: {
                    value: { min: 6, max: 20 },
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 4,
                        sync: false,
                    },
                },
                move: {
                    enable: true,
                    direction: "top",
                    speed: { min: 1, max: 2 },
                    outModes: {
                        default: "out",
                    },
                },
            },
            detectRetina: true,
        }),
        []
    );

    useEffect(() => {
        setDescription("Hi, I'm Kyle Bui — a frontend developer with a strong focus on performance, accessibility, and interactive design. I enjoy building responsive web apps using modern frameworks like React and Vite, and I pay close attention to clean UI/UX and scalable architecture. I also work on games in Phaser.js and love solving creative technical challenges.");
        setLinkGithub('https://github.com/KyleBuii/');
        setLinkLinkedIn('https://www.linkedin.com/in/kylebuii/');
        setProjects({
            'Widget Hell': {
                github: 'https://github.com/KyleBuii/Widget-Hell',
                website: 'https://widget-hell.vercel.app/',
                description: 'Web application featuring a versatile array of draggable widgets! EX: Randomly generate quotes, translate or modify text, calculate computations, check the weather, play games, and more! You can display what widgets you want and move them however you will!',
            },
            'Gachapon': {
                github: 'https://github.com/KyleBuii/Gachapon',
                website: 'https://gachapon-pon.vercel.app/',
                description: 'Dive into the world of gacha with an ultimate pull simulator! Experience the thrill of pulling characters and weapons from your favorite games like Genshin Impact. Perfect for gacha enthusiasts!',
            },
            'Library of Myralith': {
                github: 'https://github.com/KyleBuii/Library-of-Myralith',
                website: 'https://kylebuii.github.io/Library-of-Myralith/',
                description: 'Simple library web application concept made with HTML/JS.',
            },
            'CV Builder': {
                github: 'https://github.com/KyleBuii/CV-Builder',
                website: 'https://cv-builder-alpha-jet.vercel.app/',
                description: 'A simple tool to build your resume fast with one clean style. Just fill in your info and download your CV hassle-free!',
            },
            'Moe Memory': {
                github: 'https://github.com/KyleBuii/Moe-Memory',
                website: 'https://kylebuii.github.io/Moe-Memory/',
                description: 'Moe Memory is a fun and addictive anime-themed memory card game where you click unique waifu cards. Each successful guess increases your score — but beware, clicking the same card twice ends the game! Challenge your memory, enjoy charming anime art, and see how far you can go!',
            },
            'ShapeDepot': {
                github: 'https://github.com/KyleBuii/ShapeDepot/',
                website: 'https://shape-depot.vercel.app/',
                description: 'ShapeDepot is a fun and simple app where you can buy shapes, keep them in your inventory, and freely move them around to play. Explore and experiment with various shapes!',
            },
        });

        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    useEffect(() => {
        document.querySelectorAll('.project.bubble').forEach((parent) => {
            const squiggle = randomBubbleSquiggle();
            applyBubbleAnimation(parent, squiggle);

            const child = parent.querySelector('.project-information.bubble');
            if (child) {
                applyBubbleAnimation(child, squiggle);
            };
        });

        document.querySelectorAll('.bubble').forEach((bubble) => {
            if (bubble.closest('.project.bubble')) return;

            applyBubbleAnimation(bubble);
        });
    }, [projects]);

    function applyBubbleAnimation(element, squiggle = null) {
        const duration = (Math.random() * 6) + 3;
        const delay = Math.random() * 4;
        const directions = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
        const direction = directions[Math.floor(Math.random() * directions.length)];

        element.style.animation = `sway ${duration}s ease-in-out ${delay}s infinite ${direction}`;

        const bubbleSquiggle = squiggle || randomBubbleSquiggle();
        element.style.setProperty('--bubble-squiggle', bubbleSquiggle);
    };

    function randomBubbleSquiggle() {
        const variation = 10;

        const randomDeviation = () => {
            return Math.floor(Math.random() * (variation * 2 + 1)) - variation;
        };

        const base = 50;

        const h1 = base + randomDeviation();
        const h2 = 100 - h1;
        const h3 = base + randomDeviation();
        const h4 = 100 - h3;

        const v1 = base + randomDeviation();
        const v2 = 100 - v1;
        const v3 = base + randomDeviation();
        const v4 = 100 - v3;

        return `${h1}% ${h2}% ${h3}% ${h4}% / ${v1}% ${v2}% ${v3}% ${v4}%`;
    };

    const handleClickProject = (event) => {
        const elementProject = event.currentTarget;
        const elementProjectInfo = event.currentTarget.firstChild;
        if (elementProject.classList.contains('active')) {
            elementProject.classList.remove('active');
            elementProjectInfo.classList.remove('active');
        } else {
            elementProject.classList.add('active');
            elementProjectInfo.classList.add('active');
        };
    };

    return (
        <div className='flex-col'>
            <section className='flex-row'>
                <div className='picture bubble'></div>
                <div className='about-me bubble flex-col'>
                    <h2>About Me</h2>
                    <span>{description}</span>
                    <div className='flex-row'>
                        <span>TL;DR: code fun.</span>
                        <div className='flex-row'>
                            <a href={`${linkGithub}`}>
                                <FaGithub color='white'/>
                            </a>
                            <a href={`${linkLinkedIn}`}>
                                <FaLinkedin color='white'/>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h2 className='bubble title'>My Work</h2>
                <div className='flex-row'>
                    {Object.keys(projects).map((project) => {
                        let projectInformation = projects[project];
                        let projectNameFormatted = project.replace(/[A-Z]/g, (char) => char.toLowerCase()).replace(/\s/g, '_');
                        return <div className='project bubble'
                            onClick={(event) => handleClickProject(event)}
                            style={{ backgroundImage: `url(./assets/${projectNameFormatted}.webp)` }}
                            key={project}>
                            <div className='project-information bubble flex-col'>
                                <div className='flex-row'>
                                    <span>{project}</span>
                                    <div className='flex-row'>
                                        <a href={`${projectInformation.github}`}>
                                            <FaGithub color='white'/>
                                        </a>
                                        <a href={`${projectInformation.website}`}>
                                            <IoMdOpen color='white'/>
                                        </a>
                                    </div>
                                </div>
                                <span>{projectInformation.description}</span>
                            </div>
                        </div>
                    })}
                </div>
            </section>
            <section className='contact-me flex-col bubble'>
                <h2>Contact Me</h2>
                <span>Please get in touch if you think my work could be mutually beneficial!</span>
                <span className='flex-row'>
                    <FaPhoneAlt color='white'/>
                    <span>+1 240-883-2126</span>
                </span>
                <span className='flex-row'>
                    <IoMdMail color='white'/>
                    <span>buikyle12@gmail.com</span>
                </span>
                <div className='flex-row'>
                    <a href={`${linkGithub}`}>
                        <FaGithub color='white'/>
                    </a>
                    <a href={`${linkLinkedIn}`}>
                        <FaLinkedin color='white'/>
                    </a>
                </div>
            </section>
            {(init) && <Particles options={options}/>}
        </div>
    );
};

export default memo(Homepage);