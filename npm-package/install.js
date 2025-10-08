#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🤖 AvatarWidget NPM Installation Wizard\n');
console.log('This will help you set up the AvatarWidget in your project.\n');

const questions = [
    {
        key: 'knowledgeId',
        question: 'Enter your Knowledge Base ID: ',
        default: '68e604b9028f2f5066e31678'
    },
    {
        key: 'avatarId',
        question: 'Choose avatar (Tyler-insuit-20220721, Anna_public_3_20240108, Susan_public_2_20240328): ',
        default: 'Tyler-insuit-20220721'
    },
    {
        key: 'openingMessage',
        question: 'Enter opening message: ',
        default: 'Hello! How can I help you today?'
    },
    {
        key: 'position',
        question: 'Widget position (bottom-right, bottom-left, top-right, top-left): ',
        default: 'bottom-right'
    }
];

const config = {};
let currentQuestion = 0;

function askQuestion() {
    if (currentQuestion >= questions.length) {
        generateFiles();
        return;
    }

    const q = questions[currentQuestion];
    rl.question(`${q.question}[${q.default}] `, (answer) => {
        config[q.key] = answer.trim() || q.default;
        currentQuestion++;
        askQuestion();
    });
}

function generateFiles() {
    console.log('\n📝 Generating integration files...\n');

    // Generate HTML integration example
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AvatarWidget Integration</title>
    <!-- Widget styles -->
    <link rel="stylesheet" href="./node_modules/avatar-widget-embed/dist/ai-avatar.css">
</head>
<body>
    <h1>My Website</h1>
    <p>Your content here...</p>

    <!-- Widget container -->
    <div id="ai-chat" style="position: fixed; ${getPositionCSS()}; z-index: 9999;"></div>

    <!-- React dependencies -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Widget bundle -->
    <script src="./node_modules/avatar-widget-embed/dist/avatar-widget.umd.js"></script>
    
    <!-- Initialize widget -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            window.renderAvatarWidget('ai-chat', {
                knowledgeID: '${config.knowledgeId}',
                avatarId: '${config.avatarId}',
                openingMessage: '${config.openingMessage}'
            });
        });
    </script>
</body>
</html>`;

    // Generate JavaScript integration example
    const jsContent = `// AvatarWidget Integration
// Import styles in your CSS or add to your build process
// @import 'avatar-widget-embed/dist/ai-avatar.css';

// Initialize the widget
function initAvatarWidget() {
    // Ensure React is loaded
    if (typeof window.React === 'undefined' || typeof window.ReactDOM === 'undefined') {
        console.error('AvatarWidget requires React and ReactDOM to be loaded first');
        return;
    }

    // Create container if it doesn't exist
    let container = document.getElementById('ai-chat');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ai-chat';
        container.style.cssText = 'position: fixed; ${getPositionCSS()}; z-index: 9999;';
        document.body.appendChild(container);
    }

    // Render the widget
    window.renderAvatarWidget('ai-chat', {
        knowledgeID: '${config.knowledgeId}',
        avatarId: '${config.avatarId}',
        openingMessage: '${config.openingMessage}'
    });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAvatarWidget);
} else {
    initAvatarWidget();
}

export { initAvatarWidget };`;

    // Generate React component example
    const reactContent = `import React, { useEffect, useRef } from 'react';
import 'avatar-widget-embed/dist/ai-avatar.css';

const AvatarWidget = ({ 
    knowledgeID = '${config.knowledgeId}',
    avatarId = '${config.avatarId}',
    openingMessage = '${config.openingMessage}',
    position = '${config.position}'
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Load the widget script if not already loaded
        if (!window.renderAvatarWidget) {
            const script = document.createElement('script');
            script.src = '/node_modules/avatar-widget-embed/dist/avatar-widget.umd.js';
            script.onload = () => {
                if (containerRef.current && window.renderAvatarWidget) {
                    window.renderAvatarWidget(containerRef.current.id, {
                        knowledgeID,
                        avatarId,
                        openingMessage
                    });
                }
            };
            document.head.appendChild(script);
        } else if (containerRef.current) {
            window.renderAvatarWidget(containerRef.current.id, {
                knowledgeID,
                avatarId,
                openingMessage
            });
        }
    }, [knowledgeID, avatarId, openingMessage]);

    const positionStyles = {
        'bottom-right': { bottom: '20px', right: '20px' },
        'bottom-left': { bottom: '20px', left: '20px' },
        'top-right': { top: '20px', right: '20px' },
        'top-left': { top: '20px', left: '20px' }
    };

    return (
        <div
            ref={containerRef}
            id={\`avatar-widget-\${Date.now()}\`}
            style={{
                position: 'fixed',
                ...positionStyles[position],
                zIndex: 9999
            }}
        />
    );
};

export default AvatarWidget;`;

    // Write files
    const outputDir = process.cwd();
    
    fs.writeFileSync(path.join(outputDir, 'avatar-widget-example.html'), htmlContent);
    fs.writeFileSync(path.join(outputDir, 'avatar-widget-integration.js'), jsContent);
    fs.writeFileSync(path.join(outputDir, 'AvatarWidget.jsx'), reactContent);

    console.log('✅ Integration files generated successfully!\n');
    console.log('📁 Files created:');
    console.log('  • avatar-widget-example.html - HTML integration example');
    console.log('  • avatar-widget-integration.js - JavaScript integration');
    console.log('  • AvatarWidget.jsx - React component\n');
    
    console.log('🚀 Next steps:');
    console.log('  1. Copy the widget files to your project');
    console.log('  2. Use one of the generated integration files');
    console.log('  3. Make sure React and ReactDOM are loaded');
    console.log('  4. Test your integration\n');
    
    console.log('📖 For more help, visit: https://github.com/your-username/avatar-widget\n');

    rl.close();
}

function getPositionCSS() {
    const positions = {
        'bottom-right': 'bottom: 20px; right: 20px',
        'bottom-left': 'bottom: 20px; left: 20px',
        'top-right': 'top: 20px; right: 20px',
        'top-left': 'top: 20px; left: 20px'
    };
    return positions[config.position] || positions['bottom-right'];
}

// Start the wizard
askQuestion();