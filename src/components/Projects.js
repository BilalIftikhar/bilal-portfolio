'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import Image from 'next/image';

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const projects = [
        {
            title: 'IGIVU',
            description:
                'End-to-end XR solutions platform delivering VR, AR, and MR experiences to over 3,000 organizations including Stanford. Provides VR event rentals, content creation, XR provisioning, and immersive training solutions with synchronized multi-user experiences.',
            image: '/projects/igivu.png',
            tech: ['Laravel', 'Vue.js', 'MySQL', 'AWS', 'WebGL', 'Unity'],
            link: 'https://igivu.com/',
            role: 'Full Stack Developer',
            highlights: [
                'Built VR content management system serving 3,000+ organizations',
                'Implemented synchronized VR show features for large-scale events',
                'Developed custom XR provisioning and rental management system',
            ],
        },
        {
            title: 'AV Leads',
            description:
                'Professional networking platform connecting live event organizers with top-tier AV engineers and technicians. Streamlines the hiring process for audio-visual professionals in the events industry with advanced matching algorithms.',
            image: '/projects/avleads.png',
            tech: ['Laravel', 'React', 'MySQL', 'Redis', 'AWS'],
            link: 'https://avleads.com/',
            role: 'Full Stack Developer',
            highlights: [
                'Built professional networking and matching system',
                'Developed real-time job posting and application features',
                'Implemented advanced search and filtering for talent discovery',
            ],
        },
        {
            title: 'PoolStore',
            description:
                'UK\'s leading online retailer for pool and spa supplies. Comprehensive e-commerce platform offering swimming pool equipment, chemicals, accessories, and maintenance products with seamless shopping experience and expert customer support.',
            image: '/projects/poolstore.png',
            tech: ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'AWS'],
            link: 'https://poolstore.co.uk/',
            role: 'Full Stack Developer',
            highlights: [
                'Developed complete e-commerce solution for pool supplies',
                'Integrated payment processing and inventory management',
                'Built product catalog with advanced filtering and search',
            ],
        },
        {
            title: 'SevenLift',
            description:
                'Enterprise-grade heavy equipment rental platform for UAE. Provides forklift rental, mobile crane, telehandler, and man lift services with 24/7 availability across Dubai, Abu Dhabi, and Northern Emirates with real-time tracking.',
            image: '/projects/sevenlift.png',
            tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
            link: 'https://www.sevenlift.net/',
            role: 'Lead Developer',
            highlights: [
                'Developed complete rental management system',
                'Built real-time equipment availability tracking',
                'Implemented multi-region service coverage and booking',
            ],
        },
        {
            title: 'Logistivo',
            description:
                'Modern logistics platform with responsive web interface built from Figma designs. Comprehensive shipping and delivery management system with real-time tracking, route optimization, and automated workflow management.',
            image: '/projects/analytics.png',
            tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Figma'],
            link: 'https://logistivo.com/',
            role: 'Frontend Developer',
            highlights: [
                'Built responsive web interface from Figma designs',
                'Implemented real-time shipment tracking features',
                'Developed logistics dashboard with route optimization',
            ],
        },
        {
            title: 'The Little Mate',
            description:
                'E-commerce platform for baby clothes, toys, and essentials. Crafted for comfort and quality with a seamless shopping experience, featuring product catalog, cart management, and secure checkout.',
            image: '/projects/ecommerce.png',
            tech: ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'Shopify'],
            link: 'https://thelittlemate.pk/',
            role: 'Full Stack Developer',
            highlights: [
                'Developed complete e-commerce solution for baby products',
                'Integrated payment processing and inventory management',
                'Built responsive product catalog with filtering and search',
            ],
        },
    ];

    return (
        <section id="projects" className="section-padding bg-black relative overflow-hidden section-bg">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div className="lg:max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-[#FF6B35] uppercase text-sm tracking-[2px] font-semibold mb-4 block"
                            >
                                THE ARCHIVES
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
                            >
                                <motion.span 
                                    className="text-white block"
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    PROVEN
                                </motion.span>
                                <br />
                                <motion.span 
                                    className="text-white block"
                                    whileHover={{ scale: 1.05, x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    TECHNICAL
                                </motion.span>
                                <br />
                                <motion.span 
                                    className="orange-text block"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    MASTERY.
                                </motion.span>
                            </motion.h2>
                        </div>
                        <motion.a
                            href="#projects"
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 rounded-lg text-white hover:border-[#FF6B35] hover:bg-[#FF6B35]/10 transition-all duration-300 uppercase text-sm tracking-[1.5px] font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            VIEW FULL ARCHIVE
                            <span className="text-xl">→</span>
                        </motion.a>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            initial={{ opacity: 0, y: 50, rotateX: 10 }}
                            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 100 }}
                            className="bg-[#111111] border border-gray-900 rounded-2xl overflow-hidden group hover:border-[#FF6B35]/30 transition-all duration-300"
                            whileHover={{ 
                                y: -10, 
                                rotateY: 2,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        >
                            {/* Project Image */}
                            <div className="relative h-64 overflow-hidden bg-[#FF6B35]/10">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary inline-flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                    >
                                        <FiExternalLink />
                                        View Project
                                    </a>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-white group-hover:text-[#FF6B35] transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="text-xs px-3 py-1 bg-[#FF6B35]/20 text-[#FF6B35] rounded-full uppercase tracking-wide">
                                        {project.role}
                                    </span>
                                </div>

                                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>

                                {/* Highlights */}
                                <ul className="space-y-2">
                                    {project.highlights.map((highlight, i) => (
                                        <li key={i} className="text-xs text-gray-500 flex items-start gap-2">
                                            <span className="orange-text mt-1">▸</span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-gray-900 text-gray-400 rounded text-xs font-medium hover:bg-[#FF6B35]/20 hover:text-[#FF6B35] transition-colors"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
