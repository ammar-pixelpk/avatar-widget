// AvatarWidget Integration
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
        container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999;';
        document.body.appendChild(container);
    }

    // Render the widget
    window.renderAvatarWidget('ai-chat', {
        knowledgeID: '68e604b9028f2f5066e31678',
        avatarId: 'Tyler-insuit-20220721',
        openingMessage: 'Hello! How can I help you today?'
    });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAvatarWidget);
} else {
    initAvatarWidget();
}

export { initAvatarWidget };