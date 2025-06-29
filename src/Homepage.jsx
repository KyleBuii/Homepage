import { memo, useEffect, useState } from 'react';
import './Homepage.scss';
import { FaGithub, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail, IoMdOpen } from 'react-icons/io';

function Homepage() {
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [linkGithub, setLinkGithub] = useState('');
    const [linkLinkedIn, setLinkLinkedIn] = useState('');
    const [projects, setProjects] = useState({});

    useEffect(() => {
        setDescription("Hi, I'm Kyle — a frontend developer with a strong focus on performance, accessibility, and interactive design. I enjoy building responsive web apps using modern frameworks like React and Vite, and I pay close attention to clean UI/UX and scalable architecture. I also work on games in Phaser.js and love solving creative technical challenges.");
        setName('Kyle Bui');
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
        });
    }, []);

    return (
        <div className='flex-col'>
            <section className='flex-row no-gap'>
                <div className='container-picture'>
                    <span>{name}</span>
                </div>
                <div className='container-about-me'>
                    <h2>About Me</h2>
                    <span>{description}</span>
                    <span>TL;DR: code fun.</span>
                    <div className='flex-row flex-end'>
                        <a href={`${linkGithub}`}>
                            <FaGithub color='black'/>
                        </a>
                        <a href={`${linkLinkedIn}`}>
                            <FaLinkedin color='black'/>
                        </a>
                    </div>
                </div>
            </section>
            <section>
                <h2 style={{ marginBottom: '1rem' }}>My Work</h2>
                <div className='container-projects'>
                    {Object.keys(projects).map((project) => {
                        let projectInformation = projects[project];
                        let projectNameFormatted = project.replace(/[A-Z]/g, (char) => char.toLowerCase()).replace(/\s/g, '_');
                        return <div className='project'>
                            <div className='image-wrapper'>
                                <img src={`./assets/${projectNameFormatted}.webp`}
                                    alt={project}/>
                            </div>
                            <div>
                                <div className='flex-row'>
                                    <span>{project}</span>
                                    <div className='flex-row'>
                                        <a href={`${projectInformation.github}`}>
                                            <FaGithub color='black'/>
                                        </a>
                                        <a href={`${projectInformation.website}`}>
                                            <IoMdOpen color='black'/>
                                        </a>
                                    </div>
                                </div>
                                <span>{projectInformation.description}</span>
                            </div>
                        </div>
                    })}
                </div>
            </section>
            <section className='container-contact-me'>
                <div>
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
                </div>
                <img src='./assets/picture_2.webp'
                    alt='Contact Me'/>
            </section>
        </div>
    );
};

export default memo(Homepage);