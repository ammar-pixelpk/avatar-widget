/**
 * AvatarWidget Auto-Installer
 * One-line installation script for easy integration
 * 
 * Usage: <script src="https://your-cdn.com/installer.js" data-knowledge-id="your-id"></script>
 */

(function() {
    'use strict';
    
    // Get the current script element to read data attributes
    const currentScript = document.currentScript || document.querySelector('script[src*="installer.js"]');
    
    if (!currentScript) {
        console.error('AvatarWidget: Could not find installer script element');
        return;
    }
    
    // Configuration from data attributes
    const config = {
        knowledgeID: currentScript.getAttribute('data-knowledge-id') || '68e604b9028f2f5066e31678',
        avatarId: currentScript.getAttribute('data-avatar-id') || 'Tyler-insuit-20220721',
        openingMessage: currentScript.getAttribute('data-opening-message') || 'Hello! How can I help you today?',
        position: currentScript.getAttribute('data-position') || 'bottom-right',
        theme: currentScript.getAttribute('data-theme') || 'light',
        size: currentScript.getAttribute('data-size') || 'medium'
    };
    
    // CDN URLs - GitHub repository via JSDelivr
    // Version 1.0.2 - Fixed CDN paths and cache handling
    const CDN_BASE = 'https://cdn.jsdelivr.net/gh/ammar-pixelpk/avatar-widget@main';
    const CSS_URL = `${CDN_BASE}/assets/ai-avatar.css?v=1.0.2`;
    const WIDGET_URL = `${CDN_BASE}/assets/avatar-widget.umd.js?v=1.0.2`;
    const REACT_URL = 'https://unpkg.com/react@18/umd/react.production.min.js';
    const REACT_DOM_URL = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
    
    // Status tracking
    let loadedCount = 0;
    const totalFiles = 4; // CSS, React, ReactDOM, Widget
    
    // Create status indicator
    function createStatusIndicator() {
        const status = document.createElement('div');
        status.id = 'avatar-widget-status';
        status.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4299e1;
            color: white;
            padding: 10px 15px;
            border-radius: 25px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
        `;
        status.textContent = '🤖 Loading AI Assistant...';
        document.body.appendChild(status);
        return status;
    }
    
    // Update status
    function updateStatus(message, success = false) {
        const status = document.getElementById('avatar-widget-status');
        if (status) {
            status.textContent = message;
            if (success) {
                status.style.background = '#48bb78';
                setTimeout(() => {
                    status.style.opacity = '0';
                    setTimeout(() => status.remove(), 300);
                }, 3000);
            }
        }
    }
    
    // Position styles
    const positions = {
        'bottom-right': 'bottom: 20px; right: 20px;',
        'bottom-left': 'bottom: 20px; left: 20px;',
        'top-right': 'top: 20px; right: 20px;',
        'top-left': 'top: 20px; left: 20px;'
    };
    
    // Create widget container
    function createWidgetContainer() {
        const container = document.createElement('div');
        container.id = 'auto-avatar-widget';
        container.style.cssText = `
            position: fixed;
            ${positions[config.position] || positions['bottom-right']}
            z-index: 9999;
        `;
        document.body.appendChild(container);
        return container;
    }
    
    // Load CSS file
    function loadCSS() {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = CSS_URL;
            link.onload = () => {
                loadedCount++;
                updateStatus(`Loading... (${loadedCount}/${totalFiles})`);
                resolve();
            };
            link.onerror = () => reject(new Error('Failed to load CSS'));
            document.head.appendChild(link);
        });
    }
    
    // Load JavaScript file
    function loadScript(src, name) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.crossOrigin = 'anonymous';
            script.onload = () => {
                loadedCount++;
                updateStatus(`Loading... (${loadedCount}/${totalFiles})`);
                resolve();
            };
            script.onerror = () => reject(new Error(`Failed to load ${name}`));
            document.head.appendChild(script);
        });
    }
    
    // Initialize the widget
    function initializeWidget() {
        try {
            // Check if all dependencies are loaded
            if (typeof window.React === 'undefined') {
                throw new Error('React not loaded');
            }
            if (typeof window.ReactDOM === 'undefined') {
                throw new Error('ReactDOM not loaded');
            }
            if (typeof window.renderAvatarWidget !== 'function') {
                throw new Error('AvatarWidget not loaded');
            }
            
            // Create container if it doesn't exist
            let container = document.getElementById('auto-avatar-widget');
            if (!container) {
                container = createWidgetContainer();
            }
            
            // Render the widget
            window.renderAvatarWidget('auto-avatar-widget', config);
            
            updateStatus('✅ AI Assistant Ready!', true);
            
            console.log('AvatarWidget initialized successfully with config:', config);
            
        } catch (error) {
            console.error('AvatarWidget initialization failed:', error);
            updateStatus('❌ Failed to load AI Assistant');
        }
    }
    
    // Main loading sequence
    async function loadAvatarWidget() {
        try {
            // Create status indicator
            createStatusIndicator();
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            updateStatus('📦 Loading dependencies...');
            
            // Load all required files
            await Promise.all([
                loadCSS(),
                loadScript(REACT_URL, 'React'),
                loadScript(REACT_DOM_URL, 'ReactDOM'),
                loadScript(WIDGET_URL, 'AvatarWidget')
            ]);
            
            // Small delay to ensure all scripts are executed
            setTimeout(initializeWidget, 100);
            
        } catch (error) {
            console.error('AvatarWidget loading failed:', error);
            updateStatus('❌ Failed to load AI Assistant');
            
            // Show fallback message
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                position: fixed;
                ${positions[config.position] || positions['bottom-right']}
                background: #f56565;
                color: white;
                padding: 15px;
                border-radius: 8px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                z-index: 9999;
                max-width: 300px;
            `;
            fallback.innerHTML = `
                <strong>AI Assistant Error</strong><br>
                Failed to load. Please check your internet connection or contact support.
                <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: white; cursor: pointer; font-size: 18px;">×</button>
            `;
            document.body.appendChild(fallback);
        }
    }
    
    // Auto-start the loading process
    loadAvatarWidget();
    
})();