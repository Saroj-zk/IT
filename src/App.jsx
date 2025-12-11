import React, { useState, useEffect, useRef } from 'react';
import AIModelSuite from './AIModelSuite';
import './medi-chat.css';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    Brain,
    Blocks,
    Stethoscope,
    FileText,
    ArrowRight,
    ShieldCheck,
    Zap,
    Globe,
    Users,
    Gamepad2,
    Play,
    Terminal,
    CheckCircle2,
    Loader2,
    Send,
    Database,
    Cpu,
    Layers,
    Code2,
    ArrowLeft,
    ChevronRight,
} from 'lucide-react';

// --- Data ---
const services = [
    {
        id: 'ai',
        title: 'Enterprise AI',
        icon: <Brain size={28} />,
        desc: 'Automating complex workflows with custom neural networks.',
        features: ['Predictive Analytics', 'Auto-Agents', 'NLP/Chatbots', 'Computer Vision']
    },
    {
        id: 'web3',
        title: 'Blockchain',
        icon: <Blocks size={28} />,
        desc: 'Secure decentralized infra for financial & data apps.',
        features: ['Smart Contracts', 'DeFi Protocols', 'Tokenization', 'dApp Arch']
    },
    {
        id: 'game-dev',
        title: '3D & Immersive',
        icon: <Gamepad2 size={28} />,
        desc: 'High-fidelity simulations for training & engagement.',
        features: ['Unreal Engine 5', 'Digital Twins', 'VR/AR', 'Metaverse']
    },
    {
        id: 'medical',
        title: 'HealthTech',
        icon: <Stethoscope size={28} />,
        desc: 'HIPAA-compliant automation for revenue management.',
        features: ['Auto-Coding', 'Claims Proc', 'Patient Data', 'Security']
    },
    {
        id: 'data',
        title: 'Data Eng',
        icon: <FileText size={28} />,
        desc: 'Pipelines that render info usable and accessible.',
        features: ['Warehousing', 'Knowledge Graphs', 'ETL', 'Semantic Search']
    }
];

const caseStudies = [
    { title: 'AI Automation Core', category: 'Artificial Intelligence', result: '400% Efficiency Boost' },
    { title: 'DeFi Liquidity Protocol', category: 'Web3 / Blockchain', result: '$50M TVL Secured' },
    { title: 'HealthSystem RCM', category: 'Medical Billing', result: '98% Claims Acceptance' },
    { title: 'TechCorp Documentation', category: 'Editorial', result: 'Zero-Ambiguity Manuals' },
];

const faqData = [
    { q: "How does your AI integrate with our existing software?", a: "We build custom middleware and API wrappers that allow our AI tools to connect seamlessly with your current ERP, CRM, and database systems. No need to replace your existing setup." },
    { q: "Is our data secure?", a: "Absolutely. We follow a zero-trust architecture and strict encryption protocols. For sensitive industries, we can deploy local models that run entirely within your secure infrastructure." },
    { q: "Can you handle high-volume applications?", a: "Yes. Our solutions are built to scale. Whether it's blockchain transactions or customer service requests, we design for high throughput and low latency." },
    { q: "What is the typical ROI?", a: "While it varies by project, our clients typically see a significant reduction in operational costs (40-60%) within the first 6 months through process automation and reduced error rates." }
];

// --- Components ---

const Navbar = ({ page, setPage }) => (
    <nav className="navbar">
        <div className="container navbar-content">
            <div className="logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
                ANTIGRAVITY<span>.</span>
            </div>
            <div className="nav-links">
                {page === 'home' ? (
                    <>
                        <a href="#services">Services</a>
                        <a href="#process">Solutions</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </>
                ) : (
                    <>
                        <a onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>Home</a>
                        <a href="#latest">Latest</a>
                        <a href="#archive">Archive</a>
                    </>
                )}
            </div>
            <button className="btn-primary" onClick={() => setPage('contact')}>
                {page === 'home' ? 'Build Now' : 'Subscribe'}
            </button>
        </div>
    </nav>
);

const Clients = () => {
    const clients = [
        "Flipkart", "OpenLedger", "Sony", "Polygon", "Aptos", "Near", "Binance", "Eigen Layer"
    ];

    // Duplicate list for seamless infinite scroll
    const marqueeClients = [...clients, ...clients, ...clients];

    return (
        <section className="clients-section">
            <p className="clients-label">TRUSTED BY INNOVATORS</p>
            <div className="marquee-container">
                <div className="marquee-track">
                    {marqueeClients.map((client, i) => (
                        <div key={i} className="client-item">
                            <span className="client-text">{client}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Interactive Background Component ---
const InteractiveBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let waves = [];

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            waves = [];
            // Create multiple wave layers
            for (let i = 0; i < 5; i++) {
                waves.push({
                    y: height / 2 + (i * 20 - 40),
                    length: 0.01 + i * 0.002,
                    amplitude: 50 + i * 15,
                    speed: 0.02 + i * 0.005,
                    offset: i * 2,
                    color: i % 2 === 0 ? 'rgba(0, 240, 255, 0.15)' : 'rgba(112, 0, 255, 0.15)'
                });
            }
        };

        const draw = (time) => {
            ctx.clearRect(0, 0, width, height);

            // Subtle cursor interaction
            const targetX = mouseRef.current.x;
            const targetY = mouseRef.current.y / height; // Normalized 0-1

            waves.forEach((wave, i) => {
                ctx.beginPath();
                ctx.moveTo(0, height / 2);

                for (let x = 0; x < width; x += 10) {
                    // Combine sine wave time-based movement with mouse distortion
                    const distToMouse = Math.abs(x - targetX);
                    const mouseEffect = Math.max(0, 1000 - distToMouse) / 1000 * 50 * targetY;

                    const sineY = Math.sin(x * wave.length + time * wave.speed + wave.offset) * wave.amplitude;

                    ctx.lineTo(x, wave.y + sineY + mouseEffect);
                }

                ctx.strokeStyle = wave.color;
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            animationFrameId = requestAnimationFrame((t) => draw(t * 0.001));
        };

        const handleResize = () => init();
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        init();
        draw(0);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="interactive-canvas" />;
};

// --- Matrix Background Component ---
const MatrixBackground = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const gridRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const fontSize = 16;
        const spacing = 30; // Spacing between characters
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@&%<>";
        const lightRadius = 150; // Radius of the flashlight effect

        let width = window.innerWidth;
        let height = window.innerHeight;

        const initGrid = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            const cols = Math.ceil(width / spacing);
            const rows = Math.ceil(height / spacing);

            gridRef.current = [];
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    gridRef.current.push({
                        x: i * spacing,
                        y: j * spacing,
                        char: chars[Math.floor(Math.random() * chars.length)],
                        color: 'rgba(0, 50, 20, 0.1)' // Very dim base color
                    });
                }
            }
        };

        const draw = () => {
            // Dark background clearing
            ctx.fillStyle = '#050510';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;

            gridRef.current.forEach(point => {
                const dx = point.x - mouseX;
                const dy = point.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                let color;

                if (distance < lightRadius) {
                    const intensity = 1 - (distance / lightRadius);
                    const opacity = 0.1 + (intensity * 0.9);

                    if (intensity > 0.8) {
                        color = `rgba(220, 255, 230, ${opacity})`;
                    } else {
                        color = `rgba(0, 255, 128, ${opacity})`;
                    }
                } else {
                    color = 'rgba(0, 50, 20, 0.1)';
                }

                ctx.fillStyle = color;
                ctx.fillText(point.char, point.x, point.y);
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => initGrid();
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        initGrid();
        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="interactive-canvas" />;
};

const Hero = () => {
    return (
        <section className="hero-section hero-ai">
            <MatrixBackground />

            <div className="container hero-content-ai">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="ai-badge"
                >
                    <div className="status-dot pulsating"></div>
                    <span>AI-DRIVEN SOLUTIONS</span>
                </motion.div>

                <motion.h1
                    className="hero-title-ai"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    Future-Proof<br />
                    <span className="text-hollow">Your Business</span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle-ai"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    We build intelligent software that automates operations, reduces costs, and drives scalable growth.
                </motion.p>

                <motion.div
                    className="hero-cta-group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <button className="btn-primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                        Build Now <ChevronRight size={18} />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

const About = () => (
    <section id="about" className="about-section">
        <div className="container about-content">
            <motion.div
                className="about-left"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="mission-card-wrapper">
                    <div className="sleek-glass-card">
                        <div className="card-gradient-overlay"></div>
                        <h3>Our Mission</h3>
                        <p>
                            To empower businesses with technology that simplifies the complex. We believe AI should be an accessible multiplier for human potential, not a replacement.
                        </p>
                        <div className="corner-accent top-left"></div>
                        <div className="corner-accent bottom-right"></div>
                    </div>
                    <div className="card-backdrop-glow"></div>
                </div>
            </motion.div>
            <motion.div
                className="about-right"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <h2>Engineering <span className="text-gradient-cyan">Efficiency</span> & <span className="text-gradient-purple">Growth</span></h2>
                <p className="about-desc">
                    In today's fast-paced digital landscape, efficiency is your competitive edge. Antigravity delivers tailored software solutions that handle your heavy lifting. From automating backend processes to creating stunning user experiences, we build the infrastructure that helps you scale without boundaries.
                </p>
                <div className="values-grid">
                    {['Technical Excellence', 'Data Security', 'Scalable Architecture', 'Seamless Integration'].map((val, index) => (
                        <motion.div
                            key={val}
                            className="value-item"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (index * 0.1) }}
                            viewport={{ once: true }}
                        >
                            <div className="dot"></div>
                            {val}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

const Services = () => (
    <section id="services" className="services-section">
        <div className="container">
            <div className="section-header">
                <h2>Our Capabilities</h2>
                <p>Comprehensive technology services to modernize your enterprise.</p>
            </div>

            <div className="services-flex-wrapper">
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        className="glass-card service-card service-card-ai"
                        whileHover={{ y: -10, borderColor: 'rgba(0, 240, 255, 0.5)' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-header">
                            <div className="service-icon-ai">
                                {service.icon}
                            </div>
                            <span className="card-index">0{idx + 1}</span>
                        </div>
                        <h3>{service.title}</h3>
                        <p className="service-desc">{service.desc}</p>
                        <ul className="feature-list">
                            {service.features.map((f, i) => (
                                <li key={i}>
                                    <div className="bullet-point"></div> {f}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// --- Architecture Diagram Component ---
const ArchitectureDiagram = () => {
    return (
        <section id="process" className="architecture-section">
            <div className="container">
                <div className="section-header">
                    <h2>System Architecture</h2>
                    <p>How we disassemble complexity and reassemble it into intelligence.</p>
                </div>

                <div className="arch-diagram-wrapper">
                    {/* Input Layer */}
                    <motion.div
                        className="arch-layer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="layer-label">DATA INGESTION</div>
                        <div className="layer-content">
                            <div className="arch-node"><Database size={20} /> SQL/NoSQL</div>
                            <div className="arch-node"><Globe size={20} /> API Streams</div>
                            <div className="arch-node"><FileText size={20} /> Unstructured</div>
                        </div>
                    </motion.div>

                    <div className="arch-connector">
                        <div className="connector-line"></div>
                        <div className="connector-arrow">▼</div>
                    </div>

                    {/* Processing Layer */}
                    <motion.div
                        className="arch-layer highlight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="layer-label">NEURAL CORE</div>
                        <div className="layer-content">
                            <div className="arch-box">
                                <span className="box-title">Validation</span>
                                <ShieldCheck size={18} />
                            </div>
                            <div className="arch-box main">
                                <span className="box-title">AI Engine</span>
                                <Brain size={24} />
                            </div>
                            <div className="arch-box">
                                <span className="box-title">Optimization</span>
                                <Zap size={18} />
                            </div>
                        </div>
                    </motion.div>

                    <div className="arch-connector">
                        <div className="connector-line"></div>
                        <div className="connector-arrow">▼</div>
                    </div>

                    {/* Output Layer */}
                    <motion.div
                        className="arch-layer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="layer-label">ACTIONABLE OUTPUT</div>
                        <div className="layer-content">
                            <div className="arch-node"><Terminal size={20} /> Auto-Execution</div>
                            <div className="arch-node"><Layers size={20} /> Dashboards</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const VideoDemo = () => (
    <section className="video-section">
        <motion.div
            className="container video-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <div className="section-header">
                <h2>Automation in Action</h2>
                <p>See how our systems handle complex workflows in real-time.</p>
            </div>

            <div className="video-wrapper glass-card">
                {/* Placeholder for actual video file */}
                <div className="video-placeholder">
                    <div className="video-overlay">
                        <div className="play-button">
                            <Play fill="white" size={32} />
                        </div>
                    </div>
                    <div className="mock-ui">
                        <div className="mock-sidebar">
                            <div className="mock-line w-3/4"></div>
                            <div className="mock-line w-1/2"></div>
                            <div className="mock-line w-2/3"></div>
                        </div>
                        <div className="mock-content">
                            <div className="mock-header">
                                <div className="mock-tag">Claim #49201</div>
                                <div className="mock-status">Processing...</div>
                            </div>
                            <div className="mock-body">
                                <div className="typing-effect">Analyzing CPT Codes...</div>
                                <div className="typing-effect delay-1">Verifying Insurance Eligibility...</div>
                                <div className="typing-effect delay-2">Detecting Compliance Errors...</div>
                                <div className="typing-effect delay-3 text-cyan">Validation Complete. Confidence: 99.8%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </section>
);

const Process = () => {
    const steps = [
        {
            num: "01",
            title: "Discovery",
            desc: "We start by understanding your business model, pain points, and operational goals to find the best automation opportunities."
        },
        {
            num: "02",
            title: "Strategy",
            desc: "We design a tailored roadmap, selecting the right technologies and models to solve your specific challenges."
        },
        {
            num: "03",
            title: "Development",
            desc: "Our engineers build your custom solution, ensuring it integrates smoothly with your existing software stack."
        },
        {
            num: "04",
            title: "Quality Assurance",
            desc: "Rigorous testing to ensure reliability, security, and performance before we go live."
        },
        {
            num: "05",
            title: "Deployment & Scale",
            desc: "Smooth launch and ongoing support to ensure your system adapts and grows with your business."
        }
    ];

    return (
        <section className="process-section">
            <div className="container">
                <div className="section-header">
                    <h2>How We Work</h2>
                    <p>From concept to reality in five structured steps.</p>
                </div>

                <div className="process-timeline">
                    <div className="timeline-line"></div>
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="process-node"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="node-marker">
                                <div className="node-dot"></div>
                                <div className="node-pulse"></div>
                            </div>
                            <div className="process-card glass-card">
                                <span className="process-num">{step.num}</span>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Portfolio = ({ setPage }) => {
    const projects = [
        {
            title: 'ENTERPRISE AI CORE',
            id: 'PROJ-01',
            category: 'Automation',
            result: '+400% EFFICIENCY',
            desc: 'Custom AI agent swarm optimized for workflow automation.',
            status: 'LIVE'
        },
        {
            title: 'CROSS-CHAIN BRIDGE',
            id: 'PROJ-02',
            category: 'Web3 / Blockchain',
            result: '$50M SECURED',
            desc: 'High-security liquidity aggregation protocol.',
            status: 'ACTIVE'
        },
        {
            title: 'MEDI-SYNTH AI',
            id: 'PROJ-03',
            category: 'HealthTech',
            result: '98% ACCURACY',
            desc: 'Automated claims processing and patient data analysis.',
            status: 'DEPLOYED'
        },
        {
            title: 'SMART KNOWLEDGE',
            id: 'PROJ-04',
            category: 'Data Systems',
            result: 'INSTANT ACCESS',
            desc: 'Semantic search engine for internal technical documentation.',
            status: 'ONLINE'
        },
    ];

    return (
        <section id="work" className="portfolio-section">
            <div className="container">
                <div className="section-header">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="header-badge"
                    >
                        // CASE STUDIES
                    </motion.div>
                    <h2>Success Stories</h2>
                    <p>Real-world results from our client deployments.</p>
                </div>

                <div className="neural-grid-layout">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            className="neural-node-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="node-border-frame"></div>
                            <div className="node-content">
                                <div className="node-header">
                                    <span className="node-id">{project.id}</span>
                                    <div className="node-status">
                                        <span className="status-dot blink"></span>
                                        {project.status}
                                    </div>
                                </div>
                                <div className="node-body">
                                    <h3 className="glitch-text">{project.title}</h3>
                                    <div className="node-category">{project.category}</div>
                                    <p>{project.desc}</p>
                                </div>
                                <div className="node-footer">
                                    <div className="node-metric">
                                        <span className="metric-label">IMPACT_METRIC</span>
                                        <span className="metric-value">{project.result}</span>
                                    </div>
                                    <div
                                        className="node-action"
                                        onClick={() => setPage('ai-suite')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                            <div className="scan-line"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Insights = ({ setPage }) => {
    const posts = [
        {
            title: " The Rise of Agentic Workflows",
            date: "OCT.12.2025",
            readTime: "5 MIN READ",
            desc: "Why static automation is dead and autonomous agents are the future."
        },
        {
            title: "Zero-Knowledge Proofs in Supply Chain",
            date: "SEP.28.2025",
            readTime: "8 MIN READ",
            desc: "Leveraging zk-SNARKs for transparent yet private verification."
        },
        {
            title: "Optimizing LLMs for Medical Coding",
            date: "SEP.15.2025",
            readTime: "6 MIN READ",
            desc: "Fine-tuning techniques to reduce hallucination in CPT classification."
        }
    ];

    return (
        <section className="insights-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2>Intelligence Stream</h2>
                    <p>Analysis and engineering notes from our labs.</p>
                </motion.div>
                <div className="insights-grid">
                    {posts.map((post, i) => (
                        <motion.div
                            key={i}
                            className="glass-card insight-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="insight-meta">
                                <span>{post.date}</span>
                                <span className="dot-divider"></span>
                                <span>{post.readTime}</span>
                            </div>
                            <h3>{post.title}</h3>
                            <p>{post.desc}</p>
                            <button className="read-more btn-text" onClick={() => setPage('blog')}>
                                Read Analysis <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhyChooseUs = () => (
    <section className="why-us-section">
        <div className="container">
            <motion.div
                className="advantage-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="glowing-top-border"></div>
                <div className="card-bg-mesh"></div>

                <h2>The Antigravity Advantage</h2>

                <div className="pills-grid">
                    {[
                        { icon: <Globe size={28} />, title: "Holistic Engineering", desc: "Seamless integration of AI, Web3, and Legacy Ops." },
                        { icon: <ShieldCheck size={28} />, title: "Enterprise Grade", desc: "SOC2 Type II compliant standards and Zero-Trust." },
                        { icon: <Users size={28} />, title: "Rapid Deployment", desc: "From concept to production in weeks, not months." }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="pill-item"
                            whileHover={{ y: -5 }}
                        >
                            <div className="pill-icon-wrapper">
                                <div className="pill-icon-ring"></div>
                                <div className="pill-icon">
                                    {item.icon}
                                </div>
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

const FAQ = () => (
    <section className="faq-section">
        <motion.div
            className="container faq-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="title-center">Frequently Asked Questions</h2>
            <div className="faq-list">
                {faqData.map((item, i) => (
                    <motion.div
                        key={i}
                        className="glass-card faq-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <details>
                            <summary>
                                <span>{item.q}</span>
                                <span className="arrow-icon">
                                    <ChevronRight />
                                </span>
                            </summary>
                            <p className="faq-answer">
                                {item.a}
                            </p>
                        </details>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </section>
);

const Team = () => {
    const members = [
        { name: "Unit Alpha", role: "Systems Architect", handle: "@alpha_arch", status: "ONLINE" },
        { name: "Unit Beta", role: "Neural Networks", handle: "@beta_net", status: "PROCESSING" },
        { name: "Unit Gamma", role: "Security Ops", handle: "@gamma_sec", status: "GUARDING" },
        { name: "Unit Delta", role: "Deployments", handle: "@delta_ops", status: "ACTIVE" },
        { name: "Unit Epsilon", role: "Interface Design", handle: "@eps_ui", status: "RENDERING" },
        { name: "Unit Zeta", role: "Data Streams", handle: "@zeta_flow", status: "STREAMING" },
        { name: "Unit Omega", role: "Core Intelligence", handle: "@omega_core", status: "ONLINE" }
    ];

    return (
        <section className="team-section-cyber">
            <div className="container">
                <div className="section-header">
                    <h2><span className="text-gradient">The Collective</span></h2>
                    <p>Orchestrating intelligence behind the scenes.</p>
                </div>
                <div className="team-track-container">
                    <div className="team-track">
                        {members.map((member, i) => (
                            <motion.div
                                key={i}
                                className="cyber-member-card"
                                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="cyber-avatar-frame">
                                    <div className="scan-line-vertical"></div>
                                    <img
                                        src={`https://robohash.org/${member.name}?set=set1&bgset=bg2&size=150x150`}
                                        alt={member.name}
                                        className="cyber-avatar-img"
                                    />
                                    <div className="corner-brackets"></div>
                                </div>

                                <div className="cyber-info">
                                    <div className="status-indicator">
                                        <span className={`status-led ${member.status === 'ONLINE' ? 'green' : 'orange'}`}></span>
                                        {member.status}
                                    </div>
                                    <h3>{member.name}</h3>
                                    <span className="cyber-role">{member.role}</span>

                                    <a href={`https://twitter.com/${member.handle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="cyber-social-link">
                                        <span className="bracket">[</span> {member.handle} <span className="bracket">]</span>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Contact = () => (
    <section id="contact" className="contact-section">
        <div className="container">
            <div className="contact-wrapper">
                <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2>Let's Get Started</h2>
                    <p>
                        Ready to transform your business? Schedule a consultation with our team to discuss your needs.
                    </p>
                    <div className="contact-details">
                        <div className="contact-row">
                            <div className="icon-circle cyan">@</div>
                            <span>hello@antigravity.corp</span>
                        </div>
                        <div className="contact-row">
                            <div className="icon-circle purple">#</div>
                            <span>+1 (800) 555-0101</span>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className="contact-form-wrapper glass-card"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <form className="contact-form">
                        <div className="form-row">
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Corporate Email" />
                        </div>
                        <input type="text" placeholder="Organization" />
                        <select>
                            <option>Select Protocol</option>
                            <option>Cognitive Enterprise (AI)</option>
                            <option>Decentralized Infrastructure (Web3)</option>
                            <option>Healthcare Intelligence</option>
                            <option>Knowledge Engineering</option>
                        </select>
                        <textarea placeholder="Brief Operational Overview" rows="4"></textarea>
                        <button className="btn-primary full-width">Request Intelligence Audit</button>
                    </form>
                </motion.div>
            </div>
        </div>
    </section>
);

const Footer = () => (
    <footer className="footer-section">
        <div className="container footer-content">
            <div className="copyright">
                &copy; 2025 Antigravity Services. All rights reserved.
            </div>
            <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Linkedin</a>
                <a href="#">Twitter</a>
            </div>
        </div>
    </footer>
);

// --- Blog Page Component ---
const BlogPage = ({ setPage }) => (
    <div className="blog-page">
        <div className="container" style={{ paddingTop: '120px' }}>
            <button className="back-btn" onClick={() => setPage('home')}>
                <ArrowLeft size={16} /> Return to Base
            </button>

            <motion.article
                className="blog-main-article"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="article-header">
                    <span className="blog-tag">INTELLIGENCE REPORT</span>
                    <h1>The Rise of Agentic Workflows</h1>
                    <div className="blog-meta">
                        <span>OCT.12.2025</span> • <span>5 MIN READ</span> • <span>BY ARCHITECT_01</span>
                    </div>
                </div>

                <div className="article-content">
                    <p className="lead">
                        Static automation is dead. The future belongs to autonomous agents that can perceive, reason, and act without constant human oversight.
                    </p>
                    <hr className="divider" />
                    <p>
                        Traditional automation (RPA) was a revolution in its time, but it was brittle. It required rigid rules. If a button moved 5 pixels, the bot broke.
                    </p>
                    <p>
                        <strong>Enter Agentic AI.</strong>
                    </p>
                    <p>
                        We are now deploying LLM-driven agents that understand context. They don't just follow scripts; they understand goals. If an invoice format changes, the agent adapts. If a server API returns an error, the agent retries or finds an alternative route.
                    </p>
                    <h3>The Dissection of an Agent</h3>
                    <ul>
                        <li><strong>Perception:</strong> Reading screens, parsing APIs, understanding natural language.</li>
                        <li><strong>Memory:</strong> Long-term vector storage to remember past interactions.</li>
                        <li><strong>Action:</strong> Tool use—clicking buttons, sending emails, executing code.</li>
                    </ul>
                    <p>
                        This is not just efficiency; it is the birth of the self-healing enterprise.
                    </p>
                </div>
            </motion.article>
        </div>
    </div>
);

function App() {
    const [page, setPage] = useState('home');

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="app-container">
            <Navbar page={page} setPage={setPage} />
            <main>
                <AnimatePresence mode="wait">
                    {page === 'home' ? (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Hero />
                            <Clients />
                            <About />
                            <ArchitectureDiagram />
                            <Services />
                            <VideoDemo />
                            <Process />
                            <Portfolio setPage={setPage} />
                            <Insights setPage={setPage} />
                            <Team />
                            <WhyChooseUs />
                            <FAQ />
                            <Contact />
                        </motion.div>
                    ) : page === 'ai-suite' ? (
                        <motion.div
                            key="suite"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ position: 'relative', zIndex: 9999 }}
                        >
                            <AIModelSuite setPage={setPage} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="blog"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <BlogPage setPage={setPage} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    )
}

export default App
