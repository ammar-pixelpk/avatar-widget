/**
 * AI Avatar Widget - npm Package Entry Point
 * Easy integration for React and Node.js projects
 */

// Main widget loader function
function loadAvatarWidget(containerId, config = {}) {
  // Default configuration
  const defaultConfig = {
    knowledgeID: '68e604b9028f2f5066e31678',
    avatarId: 'Tyler-insuit-20220721',
    openingMessage: 'Hello! How can I help you today?',
    position: 'bottom-right'
  };

  const finalConfig = { ...defaultConfig, ...config };

  // Load CSS if not already loaded
  if (!document.querySelector('link[href*="ai-avatar.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = new URL('./dist/ai-avatar.css', import.meta.url).href;
    document.head.appendChild(link);
  }

  // Load and initialize widget
  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const initWidget = async () => {
    try {
      // Load React if not available
      if (!window.React) {
        await loadScript('https://unpkg.com/react@18/umd/react.production.min.js');
      }
      if (!window.ReactDOM) {
        await loadScript('https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
      }

      // Load widget script if not available
      if (!window.renderAvatarWidget) {
        const widgetUrl = new URL('./dist/avatar-widget.umd.js', import.meta.url).href;
        await loadScript(widgetUrl);
      }

      // Initialize widget
      if (window.renderAvatarWidget) {
        window.renderAvatarWidget(containerId, finalConfig);
        console.log('AvatarWidget initialized successfully');
      }
    } catch (error) {
      console.error('Failed to load AvatarWidget:', error);
    }
  };

  // Wait for DOM if needed
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
}

// React Hook for easy integration
function useAvatarWidget(containerId, config) {
  if (typeof window !== 'undefined' && window.React) {
    const { useEffect } = window.React;
    
    useEffect(() => {
      loadAvatarWidget(containerId, config);
    }, [containerId, config]);
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS
  module.exports = { loadAvatarWidget, useAvatarWidget };
} else if (typeof define === 'function' && define.amd) {
  // AMD
  define(() => ({ loadAvatarWidget, useAvatarWidget }));
} else {
  // Browser globals
  window.AvatarWidget = { loadAvatarWidget, useAvatarWidget };
}