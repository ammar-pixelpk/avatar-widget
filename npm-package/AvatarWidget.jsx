import React, { useEffect, useRef } from 'react';
import 'avatar-widget-embed/dist/ai-avatar.css';

const AvatarWidget = ({ 
    knowledgeID = '68e604b9028f2f5066e31678',
    avatarId = 'Tyler-insuit-20220721',
    openingMessage = 'Hello! How can I help you today?',
    position = 'bottom-right'
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
            id={`avatar-widget-${Date.now()}`}
            style={{
                position: 'fixed',
                ...positionStyles[position],
                zIndex: 9999
            }}
        />
    );
};

export default AvatarWidget;