import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Paperclip, Mic, Globe, Cpu, MoreHorizontal, Bot, User, Zap, FileText } from 'lucide-react';

const MediSynthChat = ({ setPage }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Hello. I am Medi-Synth. I have analyzed the latest patient data streams. 98.4% of claims from the last batch have been auto-verified. How can I assist you with the remaining exceptions?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newUserMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: inputValue
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponses = [
                "Processing that request through the neural core...",
                "Accessing HIPAA-compliant database shard 4...",
                "I've updated the claim parameters. Re-submitting for payer approval.",
                "Analysis complete. The discrepancy was due to a mismatched CPT code modifier.",
                "Optimizing revenue cycle loop. Stand by."
            ];
            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

            setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'ai',
                text: randomResponse
            }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="medi-chat-container">
            {/* Header */}
            <header className="medi-header">
                <div className="medi-header-left">
                    <button
                        onClick={() => setPage('home')}
                        className="medi-btn-tool"
                        title="Return to Home"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="medi-logo-box">
                        <Bot size={20} />
                    </div>
                    <div className="medi-title-group">
                        <h1 className="medi-app-title">
                            MEDI-SYNTH <span className="pro-badge">PRO</span>
                        </h1>
                        <div className="medi-status">
                            <span className="status-dot"></span>
                            <span>Neural Net Online</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="medi-btn-tool">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="medi-main">
                <div className="medi-bg-glow"></div>

                <div className="medi-chat-area">
                    <div className="medi-messages-list">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`medi-message-row ${msg.sender}`}
                            >
                                {msg.sender === 'ai' && (
                                    <div className="medi-avatar ai">
                                        <Bot size={16} />
                                    </div>
                                )}
                                <div className={`medi-message-bubble ${msg.sender}`}>
                                    <span className="medi-sender-name">
                                        {msg.sender === 'ai' ? 'MEDI-SYNTH' : 'YOU'}
                                    </span>
                                    <p>{msg.text}</p>
                                </div>
                                {msg.sender === 'user' && (
                                    <div className="medi-avatar user">
                                        <User size={16} />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="medi-message-row ai">
                                <div className="medi-avatar ai">
                                    <Bot size={16} />
                                </div>
                                <div className="medi-message-bubble ai">
                                    <div className="medi-typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Grok-style Floating Input */}
                    <div className="medi-input-wrapper">
                        <div className="medi-input-box">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask Medi-Synth about claims, patients, or anomalies..."
                                className="medi-textarea"
                            />
                            <div className="medi-input-footer">
                                <div className="medi-tools">
                                    <button className="medi-btn-tool" title="Attach">
                                        <Paperclip size={18} />
                                    </button>
                                    <button className="medi-btn-tool" title="Search Web">
                                        <Globe size={18} />
                                    </button>
                                </div>
                                <div className="medi-send-area">
                                    <span className="char-count">
                                        {inputValue.length} / 2000
                                    </span>
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim()}
                                        className={`medi-btn-send ${inputValue.trim() ? 'active' : ''}`}
                                    >
                                        <ArrowLeft size={18} style={{ transform: 'rotate(90deg)' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="medi-disclaimer">
                            Medi-Synth can make mistakes. Verify critical medical data manually.
                        </p>
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="medi-sidebar">
                    <h3>Live Metrics</h3>

                    <div className="medi-metric-card">
                        <div className="metric-row">
                            <span className="metric-label">System Load</span>
                            <span className="metric-val text-cyan">32%</span>
                        </div>
                        <div className="metric-bar">
                            <div className="metric-fill bg-cyan" style={{ width: '32%' }}></div>
                        </div>
                    </div>

                    <div className="medi-metric-card">
                        <div className="metric-row">
                            <span className="metric-label">Verification Rate</span>
                            <span className="metric-val text-green">98.4%</span>
                        </div>
                        <div className="metric-bar">
                            <div className="metric-fill bg-green" style={{ width: '98.4%' }}></div>
                        </div>
                    </div>

                    <h3>Recent Analyses</h3>
                    <div style={{ paddingBottom: '1rem' }}>
                        {[
                            "Batch #4920-A Discrepancies",
                            "Q3 Revenue Projection",
                            "Patient ID #882201 Audit",
                            "Compliance Update v2.1"
                        ].map((item, i) => (
                            <button key={i} className="list-btn">
                                <FileText size={14} className="text-cyan" />
                                <span>{item}</span>
                            </button>
                        ))}
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default MediSynthChat;
