// script.js - Additional Functionality
// 8. Holographic Modal System
const initHolographicModal = () => {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.holographic-modal');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modal;
            const modal = document.getElementById(modalId);
            modals.forEach(m => m.classList.remove('active'));
            modal.classList.add('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('holographic-modal')) {
            modals.forEach(m => m.classList.remove('active'));
        }
    });
};

// 9. Voice Command Interface
const initVoiceCommands = () => {
    const voiceButton = document.querySelector('.voice-interface');
    if (!voiceButton) return;

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    voiceButton.addEventListener('click', () => {
        recognition.start();
        voiceButton.style.animation = 'voiceActive 1s infinite';
    });

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
    };

    recognition.onend = () => {
        voiceButton.style.animation = 'voicePulse 2s infinite';
    };
};

// 10. Dynamic Neural Connections
const createNeuralConnections = () => {
    const connectionPoints = document.querySelectorAll('.neural-node');
    connectionPoints.forEach(point => {
        const rect = point.getBoundingClientRect();
        const connections = point.dataset.connections.split(',');
        
        connections.forEach(targetId => {
            const target = document.getElementById(targetId);
            if (target) {
                const targetRect = target.getBoundingClientRect();
                const connection = document.createElement('div');
                connection.className = 'neural-connection';
                
                const length = Math.hypot(
                    targetRect.left - rect.left,
                    targetRect.top - rect.top
                );
                
                connection.style.width = `${length}px`;
                connection.style.transform = `rotate(${Math.atan2(
                    targetRect.top - rect.top,
                    targetRect.left - rect.left
                )}rad)`;
                
                connection.style.left = `${rect.left + rect.width/2}px`;
                connection.style.top = `${rect.top + rect.height/2}px`;
                
                document.body.appendChild(connection);
            }
        });
    });
};

// 11. AI Chat Assistant
const initAIAssistant = () => {
    const aiButton = document.querySelector('.ai-assistant');
    const aiChat = document.querySelector('.ai-chat');

    aiButton.addEventListener('click', () => {
        aiChat.style.display = aiChat.style.display === 'block' ? 'none' : 'block';
    });

    // Sample AI Responses
    const aiResponses = [
        "SYSTEM: Processing request...",
        "NETWORK: Secure connection established",
        "AI: How can I assist you today?",
        "WARNING: Unauthorized access attempt detected",
        "DATA: Retrieving encrypted information..."
    ];

    setInterval(() => {
        if (aiChat.style.display === 'block') {
            const message = document.createElement('div');
            message.className = 'ai-message';
            message.textContent = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            aiChat.appendChild(message);
            aiChat.scrollTop = aiChat.scrollHeight;
        }
    }, 5000);
};

// Initialize All Components
document.addEventListener('DOMContentLoaded', () => {
    // Existing initializations
    initCursor();
    initThemeToggle();
    initNavigation();
    initButtonEffects();
    initTerminalTyping();
    initMatrixRain();
    
    // New initializations
    initHolographicModal();
    initVoiceCommands();
    createNeuralConnections();
    initAIAssistant();
});

// Voice Command Handler
function handleVoiceCommand(command) {
    const actions = {
        'open projects': () => document.getElementById('projects').click(),
        'toggle theme': () => document.querySelector('.theme-toggle').click(),
        'enable security': () => console.log('Security protocols activated'),
        'contact mode': () => document.getElementById('contact').click(),
        'download cv': () => document.querySelector('.download-cv').click()
    };

    if (actions[command]) {
        actions[command]();
    } else {
        console.log(`Command not recognized: ${command}`);
    }
}
