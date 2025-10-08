# @pixelpk/avatar-widget

Easy-to-integrate AI avatar widget for websites. Add intelligent chat support to your site with just a few lines of code.

## 🚀 Quick Start

### Installation

```bash
npm install @pixelpk/avatar-widget
```

### Usage

#### Option 1: HTML Integration

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="./node_modules/@pixelpk/avatar-widget/dist/widget.css">
</head>
<body>
    <div id="ai-chat" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;"></div>

    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="./node_modules/@pixelpk/avatar-widget/dist/widget.umd.js"></script>
    
    <script>
        window.renderAvatarWidget('ai-chat', {
            knowledgeID: 'your-knowledge-id',
            avatarId: 'Tyler-insuit-20220721',
            openingMessage: 'Hello! How can I help you?'
        });
    </script>
</body>
</html>
```

#### Option 2: React Component

```jsx
import React from 'react';
import AvatarWidget from 'avatar-widget-embed/react';
import 'avatar-widget-embed/dist/ai-avatar.css';

function App() {
    return (
        <div>
            <h1>My Website</h1>
            <AvatarWidget 
                knowledgeID="your-knowledge-id"
                avatarId="Tyler-insuit-20220721"
                openingMessage="Hello! How can I help you?"
                position="bottom-right"
            />
        </div>
    );
}
```

#### Option 3: JavaScript Module

```javascript
import { initAvatarWidget } from 'avatar-widget-embed';
import 'avatar-widget-embed/dist/ai-avatar.css';

// Initialize with default settings
initAvatarWidget({
    knowledgeID: 'your-knowledge-id',
    avatarId: 'Tyler-insuit-20220721',
    openingMessage: 'Hello! How can I help you?'
});
```

## 🛠 Interactive Setup

Run the installation wizard for guided setup:

```bash
npm run install-widget
```

This will:
- Ask for your configuration preferences
- Generate integration files for your project
- Provide customized code examples

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `knowledgeID` | string | Required | Your AI knowledge base ID |
| `avatarId` | string | `"Tyler-insuit-20220721"` | Avatar character to use |
| `openingMessage` | string | `"Hello! How can I help you today?"` | Initial greeting |
| `position` | string | `"bottom-right"` | Widget position on screen |
| `theme` | string | `"light"` | Color theme (light/dark) |
| `size` | string | `"medium"` | Widget size (small/medium/large) |

### Available Avatars

- `Tyler-insuit-20220721` - Professional business avatar
- `Anna_public_3_20240108` - Friendly customer service
- `Susan_public_2_20240328` - Expert technical support

### Position Options

- `bottom-right` - Bottom right corner (recommended)
- `bottom-left` - Bottom left corner
- `top-right` - Top right corner
- `top-left` - Top left corner

## 📦 Bundle Contents

- `dist/avatar-widget.umd.js` - Main widget bundle (610KB)
- `dist/ai-avatar.css` - Required styles (82KB)
- `dist/avatar-widget.es.js` - ES module version
- `react/index.jsx` - React component
- `install.js` - Interactive setup wizard

## 🔧 Advanced Usage

### Custom Styling

```css
/* Override widget colors */
.avatar-widget-container {
    --primary-color: #your-brand-color;
    --background-color: #your-bg-color;
}
```

### Event Handling

```javascript
// Listen for widget events
window.addEventListener('avatarWidgetReady', () => {
    console.log('Avatar widget is ready!');
});

window.addEventListener('avatarWidgetMessage', (event) => {
    console.log('New message:', event.detail);
});
```

### Dynamic Configuration

```javascript
// Update widget configuration
window.updateAvatarWidget({
    openingMessage: 'Welcome back!',
    theme: 'dark'
});
```

## 🧪 Testing Your Integration

1. **Install the package**: `npm install avatar-widget-embed`
2. **Run setup wizard**: `npm run install-widget`
3. **Use generated files**: Copy integration code to your project
4. **Test locally**: Serve your site via HTTP (not file://)
5. **Check console**: Look for any JavaScript errors

## 🆘 Troubleshooting

**Widget not appearing?**
- Ensure React and ReactDOM are loaded before the widget
- Check that CSS file is included
- Verify your knowledge ID is correct
- Use browser dev tools to check for errors

**Styling issues?**
- Make sure the CSS file is loaded
- Check for CSS conflicts with your existing styles
- Verify z-index is high enough (9999 recommended)

**Performance concerns?**
- Widget loads asynchronously to avoid blocking your page
- Uses CDN for React dependencies for better caching
- Lazy loads avatar resources only when needed

## 📖 Documentation

- [Full Documentation](https://github.com/your-username/avatar-widget/wiki)
- [API Reference](https://github.com/your-username/avatar-widget/blob/main/API.md)
- [Examples](https://github.com/your-username/avatar-widget/tree/main/examples)

## 🐛 Issues & Support

- [Report Issues](https://github.com/your-username/avatar-widget/issues)
- [Feature Requests](https://github.com/your-username/avatar-widget/discussions)
- [Community Support](https://discord.gg/your-discord)

## 📄 License

MIT © [Your Company](https://github.com/your-username)