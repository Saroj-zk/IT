import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Send, Paperclip, Plus, Bot, Zap, Code2,
    Terminal, Fingerprint, Image, Sparkles, LayoutGrid, MessageSquare
} from 'lucide-react';
import './ai-suite.css';

// --- Configuration ---
const MODELS = [
    {
        id: 'enterprise-ai',
        name: 'Enterprise AI Core',
        desc: 'Optimized for high-reasoning business logic, workflow automation, and predictive analytics. Best for complex decision trees.',
        tags: ['Reasoning', 'Pipelines', 'Auto-Agents'],
        icon: <Bot size={24} className="text-purple-400" />,
        starterPrompts: [
            { icon: <Zap size={16} />, text: "Optimize current workflow" },
            { icon: <Code2 size={16} />, text: "Audit system logs" }
        ]
    },
    {
        id: 'medi-synth',
        name: 'Medi-Synth Pro',
        desc: 'HIPAA-compliant medical data synthesis and claims verification engine. Trained on 50M+ patient records.',
        tags: ['Medical', 'Secure', 'Vision'],
        icon: <Sparkles size={24} className="text-cyan-400" />,
        starterPrompts: [
            { icon: <Fingerprint size={16} />, text: "Verify claim batch #902" },
            { icon: <MessageSquare size={16} />, text: "Summarize patient history" }
        ]
    },
    {
        id: 'web3-bridge',
        name: 'Cross-Chain Bridge',
        desc: 'Specialized in smart contract auditing, solidity generation, and cross-chain liquidity tracking.',
        tags: ['Blockchain', 'Solidity', 'DeFi'],
        icon: <LayoutGrid size={24} className="text-green-400" />,
        starterPrompts: [
            { icon: <Terminal size={16} />, text: "Check gas fees" },
            { icon: <Code2 size={16} />, text: "Audit smart contract" }
        ]
    },
    {
        id: 'smart-know',
        name: 'Smart Knowledge',
        desc: 'Semantic search engine for retrieving internal technical documentation and legacy codebases instantly.',
        tags: ['RAG', 'Search', 'Vector DB'],
        icon: <Terminal size={24} className="text-orange-400" />,
        starterPrompts: [
            { icon: <Zap size={16} />, text: "Find API documentation" },
            { icon: <LayoutGrid size={16} />, text: "Explain legacy module" }
        ]
    }
];

const ModelSelection = ({ onSelect }) => {
    return (
        <div className="model-select-container">
            <h1 className="model-page-title">Select AI Model</h1>
            <div className="models-grid">
                {MODELS.map((model) => (
                    <div
                        key={model.id}
                        className="model-card"
                        onClick={() => onSelect(model)}
                    >
                        <div className="model-card-header">
                            <div className="model-name">{model.name}</div>
                            <div className="model-desc">{model.desc}</div>
                        </div>
                        <div className="model-tags">
                            {model.tags.map(tag => (
                                <span key={tag} className="model-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ChatInterface = ({ model, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Response
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                role: 'ai',
                content: `[${model.name}] Processing request: "${text}". \nAnalysis complete. Here is the synthesized output based on your parameters.`
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1200);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-interface-wrapper" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {messages.length === 0 ? (
                <div className="chat-screen">
                    <div className="chat-welcome">
                        <h2>How can I help today?</h2>
                        <p>Connected to <strong>{model.name}</strong></p>
                    </div>

                    <div className="chat-input-container">
                        <textarea
                            className="chat-textarea"
                            placeholder={`Ask ${model.name} a question...`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="chat-actions-row">
                            <div className="action-buttons">
                                <button className="icon-btn"><Paperclip size={18} /></button>
                                <button className="icon-btn"><Image size={18} /></button>
                            </div>
                            <button
                                className="send-btn"
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                            >
                                <Send size={16} /> Send
                            </button>
                        </div>
                    </div>

                    <div className="starter-chips">
                        {model.starterPrompts.map((prompt, i) => (
                            <button
                                key={i}
                                className="chip-btn"
                                onClick={() => handleSend(prompt.text)}
                            >
                                {prompt.icon} {prompt.text}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="active-chat-container">
                    <div className="model-select-container" style={{ paddingTop: '2rem' }}>
                        {messages.map((msg) => (
                            <div key={msg.id} className="chat-message">
                                <div className={`avatar ${msg.role}`}>
                                    {msg.role === 'ai' ? <Bot size={20} /> : <div style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '2px' }}></div>}
                                </div>
                                <div className="message-content">
                                    <div style={{ fontWeight: 600, marginBottom: '4px', color: '#888' }}>
                                        {msg.role === 'ai' ? model.name : 'You'}
                                    </div>
                                    <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="chat-message">
                                <div className="avatar ai"><Bot size={20} /></div>
                                <div className="message-content" style={{ color: '#666' }}>Thinking...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="fixed-chat-input">
                        <div className="chat-input-container">
                            <textarea
                                className="chat-textarea"
                                placeholder="Type a follow-up..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="chat-actions-row">
                                <div className="action-buttons">
                                    <button className="icon-btn"><Paperclip size={18} /></button>
                                </div>
                                <button
                                    className="send-btn"
                                    onClick={() => handleSend()}
                                    disabled={!input.trim()}
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AIModelSuite = ({ setPage }) => {
    const [selectedModel, setSelectedModel] = useState(null);

    return (
        <div className="ai-layout-container">
            <header className="ai-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {selectedModel && (
                        <button className="ai-back-btn" onClick={() => setSelectedModel(null)}>
                            <ArrowLeft size={16} /> Back
                        </button>
                    )}
                    {!selectedModel && (
                        <button className="ai-back-btn" onClick={() => setPage('home')}>
                            <ArrowLeft size={16} /> Exit
                        </button>
                    )}
                </div>
                <div>
                    <span style={{ fontWeight: 600, color: '#fff' }}>ANTIGRAVITY</span>
                    <span style={{ color: '#666', marginLeft: '0.5rem' }}>/ AI SUITE</span>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {!selectedModel ? (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ width: '100%' }}
                    >
                        <ModelSelection onSelect={setSelectedModel} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <ChatInterface model={selectedModel} onBack={() => setSelectedModel(null)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIModelSuite;
