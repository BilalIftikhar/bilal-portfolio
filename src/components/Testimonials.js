'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiStar } from 'react-icons/fi';

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'CEO, TechStart Inc.',
            content: 'Bilal delivered exceptional results on our e-commerce platform. His expertise in Laravel and Next.js helped us scale to 10x our user base. Professional, reliable, and highly skilled.',
            rating: 5,
        },
        {
            name: 'Michael Chen',
            role: 'CTO, AV Leads',
            content: 'Working with Bilal has been a game-changer. He built our entire platform from scratch with clean architecture and best practices. The code quality is outstanding.',
            rating: 5,
        },
        {
            name: 'Emily Rodriguez',
            role: 'Product Manager, PoolStore',
            content: 'Bilal transformed our online presence with a beautiful, performant e-commerce solution. His attention to detail and communication throughout the project was excellent.',
            rating: 5,
        },
        {
            name: 'David Thompson',
            role: 'Founder, IGIVU',
            content: 'Bilal\'s work on our XR platform was exceptional. He handled complex integrations and delivered a robust system that serves thousands of organizations. Highly recommended!',
            rating: 5,
        },
    ];

    return (
        <section id="testimonials" className="section-padding bg-black relative overflow-hidden section-bg">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
                <div
                    ref={ref}
                    data-aos="fade-up"
                    className="text-center mb-16"
                >
                    <span
                        data-aos="fade-down"
                        data-aos-delay="100"
                        className="text-[#FF6B35] uppercase text-sm tracking-[2px] font-semibold mb-4 block"
                    >
                        TESTIMONIALS
                    </span>
                    <h2
                        data-aos="zoom-in"
                        data-aos-delay="200"
                        className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
                    >
                        <motion.span 
                            className="text-white block"
                            whileHover={{ scale: 1.05, x: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            What Clients
                        </motion.span>
                        <br />
                        <motion.span 
                            className="orange-text block"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Say About Me
                        </motion.span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            data-aos="flip-left"
                            data-aos-delay={300 + index * 100}
                            initial={{ opacity: 0, y: 50, rotateY: 20 }}
                            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 + index * 0.1, type: "spring" }}
                            className="bg-[#111111] border border-gray-900 rounded-2xl p-8 hover:border-[#FF6B35]/30 transition-all duration-300"
                            whileHover={{ 
                                y: -10, 
                                rotateY: 5,
                                scale: 1.02,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <FiStar key={i} className="text-[#FF6B35] fill-[#FF6B35]" />
                                ))}
                            </div>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-light">
                                &quot;{testimonial.content}&quot;
                            </p>
                            <div>
                                <h4 className="text-white font-semibold text-lg mb-1">
                                    {testimonial.name}
                                </h4>
                                <p className="text-gray-400 text-sm">
                                    {testimonial.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
