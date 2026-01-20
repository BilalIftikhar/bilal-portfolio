'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    SiLaravel,
    SiPhp,
    SiReact,
    SiNextdotjs,
    SiVuedotjs,
    SiTailwindcss,
    SiMysql,
    SiMongodb,
    SiJavascript,
    SiTypescript,
    SiNodedotjs,
    SiGit,
    SiDocker,
    SiAmazonwebservices,
    SiPostgresql,
    SiRedis,
} from 'react-icons/si';

export default function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const skillCategories = [
        {
            title: 'Backend',
            skills: [
                { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
                { name: 'PHP', icon: SiPhp, color: '#777BB4' },
                { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
                { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
                { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
                { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
                { name: 'Redis', icon: SiRedis, color: '#DC382D' },
            ],
        },
        {
            title: 'Frontend',
            skills: [
                { name: 'React', icon: SiReact, color: '#61DAFB' },
                { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
                { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
                { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
                { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
                { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
            ],
        },
        {
            title: 'E-Commerce & Tools',
            skills: [
                { name: 'Git', icon: SiGit, color: '#F05032' },
                { name: 'Docker', icon: SiDocker, color: '#2496ED' },
                { name: 'AWS', icon: SiAmazonwebservices, color: '#FF9900' },
                { name: 'Vercel', icon: SiGit, color: '#000000' },
            ],
        },
    ];

    return (
        <section id="skills" className="section-padding bg-black relative overflow-hidden section-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    ref={ref}
                    data-aos="fade-up"
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 uppercase tracking-tight">
                        <motion.span
                            whileHover={{ scale: 1.05, x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            My
                        </motion.span>{' '}
                        <motion.span 
                            className="orange-text"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Skills
                        </motion.span>
                    </h2>
                    <div className="w-20 h-1 bg-[#FF6B35] mx-auto mb-6"></div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Technologies and tools I use to bring ideas to life
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            data-aos="fade-up"
                            data-aos-delay={categoryIndex * 100}
                            className="card"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-center orange-text uppercase tracking-wide">
                                {category.title}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{
                                            duration: 0.4,
                                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                                        }}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="flex flex-col items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                                    >
                                        <skill.icon
                                            className="text-4xl transition-colors duration-300"
                                            style={{ color: skill.color }}
                                        />
                                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Skills */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-12 text-center"
                >
                    <div className="card inline-block">
                        <h4 className="text-xl font-semibold mb-4">Other Skills</h4>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {[
                                'RESTful APIs',
                                'GraphQL',
                                'Microservices',
                                'CI/CD',
                                'Agile/Scrum',
                                'TDD',
                                'Responsive Design',
                                'Performance Optimization',
                            ].map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 260,
                                        damping: 20,
                                        delay: 1 + index * 0.05,
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    className="px-4 py-2 bg-[#FF6B35]/10 border border-[#FF6B35]/20 rounded-full text-sm font-medium hover:bg-[#FF6B35]/20 hover:border-[#FF6B35]/40 transition-all cursor-default text-gray-300 hover:text-white"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
