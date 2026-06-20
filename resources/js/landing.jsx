import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import Plasma from './components/Plasma';

const SplitText = ({ text, className, delay = 0 }) => {
    // A simplified split text effect inspired by React Bits
    const lines = text.split('\n');
    
    return (
        <h1 className={className}>
            {lines.map((line, lineIndex) => (
                <div key={lineIndex} style={{ overflow: 'hidden', display: 'block' }}>
                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            delay: delay + lineIndex * 0.15,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                    >
                        {line.split(' ').map((word, i) => (
                            <span key={i} style={{ display: 'inline-block', paddingRight: '0.25em' }}>
                                {word === 'coaches.' ? (
                                    <em style={{ fontStyle: 'normal', color: 'var(--lime)' }}>{word}</em>
                                ) : (
                                    word
                                )}
                            </span>
                        ))}
                    </motion.div>
                </div>
            ))}
        </h1>
    );
};

// Mount the animated title
const titleRoot = document.getElementById('react-hero-title');
if (titleRoot) {
    const root = createRoot(titleRoot);
    root.render(
        <SplitText 
            text={"Book courts.\nFind coaches.\nPlay more."} 
            className="display display-xl hero-title" 
            delay={0.2}
        />
    );
}

// Mount Plasma background
const bgRoot = document.getElementById('react-hero-bg');
if (bgRoot) {
    const root = createRoot(bgRoot);
    root.render(
        <Plasma 
            color="#CAFF00" // using the lime color for the plasma
            speed={1}
            direction="forward"
            scale={1}
            opacity={0.3} // keeping it subtle since it's a background
            mouseInteractive={false}
        />
    );
}
