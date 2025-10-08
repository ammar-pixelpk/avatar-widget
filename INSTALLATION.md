# 🛠 AI Avatar Widget - Detailed Installation Guide

This comprehensive guide covers all installation methods for the AI Avatar Widget. Choose the method that best fits your technical level and website setup.

## 📋 Installation Methods Overview

| Method | Time | Difficulty | Best For |
|--------|------|------------|----------|
| [WordPress Plugin](#wordpress-plugin) | 2 min | ⭐ Easy | WordPress sites |
| [One-Line Installer](#one-line-installer) | 30 sec | ⭐ Easy | Any website |  
| [npm Package](#npm-package) | 5 min | ⭐⭐ Medium | React/Node apps |
| [Manual Integration](#manual-integration) | 15 min | ⭐⭐⭐ Advanced | Custom builds |

---

## 🌟 WordPress Plugin

Perfect for WordPress sites. Zero coding required.

### Prerequisites
- WordPress 5.0+ 
- Admin access to your WordPress site
- Basic familiarity with WordPress admin

### Step-by-Step Installation

#### Method 1: WordPress Admin Upload
1. **Download** the plugin:
   ```
   deployment-package/wordpress-plugin/ai-avatar-widget.zip
   ```

2. **Login** to your WordPress admin dashboard

3. **Navigate** to `Plugins → Add New`

4. **Click** "Upload Plugin" button

5. **Choose** the `ai-avatar-widget.zip` file

6. **Click** "Install Now"

7. **Activate** the plugin

8. **Configure** at `Settings → AI Avatar Widget`

#### Method 2: FTP Upload
1. **Extract** the zip file
2. **Upload** the `ai-avatar-widget` folder to `/wp-content/plugins/`
3. **Activate** in WordPress admin
4. **Configure** the settings

#### Method 3: WP-CLI
```bash
wp plugin install path/to/ai-avatar-widget.zip --activate
```

### Configuration

After activation, go to **Settings → AI Avatar Widget**:

#### Required Settings ⚠️
- **Enable Widget**: Check this box to show the widget
- **Knowledge Base ID**: Your AI's unique identifier (e.g., `68e604b9028f2f5066e31678`)

#### Optional Customization 🎨
- **Avatar Character**: Tyler, Anna, or Susan
- **Opening Message**: Custom greeting (default: "Hello! How can I help you today?")
- **Position**: Bottom-right, bottom-left, top-right, top-left
- **Theme**: Light or dark mode

#### Testing Your Setup ✅
1. **Save** your settings
2. **Visit** your website in a new tab
3. **Look** for the chat widget in your chosen corner
4. **Click** the widget to test functionality

### WordPress-Specific Features

#### Shortcode Support
Display widget in specific locations:
```php
[ai_avatar_widget]

// With custom parameters:
[ai_avatar_widget avatar="Anna_public_3_20240108" message="Welcome!"]
```

#### Conditional Display
Show widget only on certain pages:
```php
// Add to functions.php
add_filter('ai_avatar_widget_display', function($display) {
    return is_home() || is_front_page(); // Homepage only
    // return !is_page('contact'); // Hide on contact page
    // return is_user_logged_in(); // Logged-in users only
});
```

#### Custom Styling
Add to **Appearance → Customize → Additional CSS**:
```css
/* Customize widget button color */
.ai-avatar-widget-button {
    background-color: #your-brand-color !important;
}

/* Adjust widget size */
.ai-avatar-widget-container {
    transform: scale(0.9);
}
```

---

## ⚡ One-Line Installer

Fastest setup for any website. Single script tag.

### Prerequisites
- Any website with HTML access
- Ability to edit HTML files or templates
- Basic HTML knowledge

### Installation Steps

#### Step 1: Get Your Code
Add this single line to your HTML:

```html
<script 
  src="https://cdn.jsdelivr.net/gh/ammar-pixelpk/avatar-widget@main/dist/installer.js" 
  data-knowledge-id="your-knowledge-id"
  data-avatar="Tyler-insuit-20220721"
  data-position="bottom-right">
</script>
```

#### Step 2: Customize (Optional)
Available `data-*` attributes:

```html
<script 
  src="https://cdn.jsdelivr.net/gh/ammar-pixelpk/avatar-widget@main/dist/installer.js" 
  data-knowledge-id="68e604b9028f2f5066e31678"
  data-avatar="Anna_public_3_20240108"
  data-opening-message="Hi! I'm here to help you."
  data-position="bottom-left"
  data-theme="dark"
  data-container-id="my-custom-container">
</script>
```

#### Configuration Options
| Attribute | Default | Options |
|-----------|---------|---------|
| `data-knowledge-id` | **Required** | Your AI knowledge base ID |
| `data-avatar` | Tyler-insuit-20220721 | Tyler-insuit-20220721, Anna_public_3_20240108, Susan_standing-idle |
| `data-opening-message` | "Hello! How can I help you today?" | Any custom message |
| `data-position` | bottom-right | bottom-right, bottom-left, top-right, top-left |
| `data-theme` | light | light, dark |
| `data-container-id` | (auto-generated) | Custom container element ID |

#### Alternative CDN Options
```html
<!-- JSDelivr via GitHub (recommended) -->
<script src="https://cdn.jsdelivr.net/gh/ammar-pixelpk/avatar-widget@main/dist/installer.js"></script>

<!-- UNPKG via npm (if published) -->
<script src="https://unpkg.com/@pixelpk/avatar-widget@latest/installer.js"></script>

<!-- Version pinning (recommended for production) -->
<script src="https://cdn.jsdelivr.net/gh/ammar-pixelpk/avatar-widget@v1.0.0/dist/installer.js"></script>
```

#### Where to Add the Script
- **Before `</body>`**: Best for performance
- **In `<head>`**: If you need early loading
- **Via Template**: In your CMS template files
- **Via Tag Manager**: Google Tag Manager or similar

### Testing Your Installation
1. **Save** your HTML file
2. **Open** the page in your browser  
3. **Check** browser console for any errors
4. **Look** for the widget in your specified position
5. **Click** to test the chat functionality

---

## 📦 npm Package

Professional solution for React/TypeScript projects.

### Prerequisites
- Node.js 14+ and npm/yarn
- React 16.8+ (hooks support)
- TypeScript (optional but recommended)
- Basic familiarity with npm packages

### Installation Steps

#### Step 1: Install Package
```bash
# npm
npm install @pixelpk/avatar-widget

# yarn  
yarn add @pixelpk/avatar-widget

# pnpm
pnpm add @pixelpk/avatar-widget
```

The installation will automatically run an interactive setup wizard.

#### Step 2: Interactive Setup Wizard
The wizard will ask you:

1. **Knowledge Base ID**: Your AI's unique identifier
2. **Avatar Character**: Tyler, Anna, or Susan
3. **Opening Message**: Custom greeting text
4. **Position**: Widget placement on screen
5. **Theme**: Light or dark mode
6. **Integration Type**: Component vs. Global function

#### Step 3: Choose Integration Method

##### Method A: React Component (Recommended)
```tsx
import { AvatarWidget } from '@pixelpk/avatar-widget';
import '@pixelpk/avatar-widget/dist/style.css';

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      
      <AvatarWidget
        knowledgeID="68e604b9028f2f5066e31678"
        avatarId="Tyler-insuit-20220721"
        openingMessage="Hello! How can I help you today?"
        position="bottom-right"
        theme="light"
      />
    </div>
  );
}
```

##### Method B: Global Function
```tsx
import { initializeAvatarWidget } from '@pixelpk/avatar-widget';
import '@pixelpk/avatar-widget/dist/style.css';

// Initialize on app startup
useEffect(() => {
  initializeAvatarWidget({
    knowledgeID: '68e604b9028f2f5066e31678',
    avatarId: 'Anna_public_3_20240108',
    position: 'bottom-left'
  });
}, []);
```

#### TypeScript Support
Full TypeScript definitions included:

```tsx
import { AvatarWidgetProps, AvatarCharacter } from '@pixelpk/avatar-widget';

interface MyProps {
  avatarConfig: AvatarWidgetProps;
}

const MyComponent: React.FC<MyProps> = ({ avatarConfig }) => {
  return <AvatarWidget {...avatarConfig} />;
};
```

### Advanced Configuration

#### Dynamic Configuration
```tsx
const [avatarConfig, setAvatarConfig] = useState({
  knowledgeID: '68e604b9028f2f5066e31678',
  avatarId: 'Tyler-insuit-20220721',
  openingMessage: 'Hello!'
});

// Update configuration dynamically
const switchToAnna = () => {
  setAvatarConfig(prev => ({
    ...prev,
    avatarId: 'Anna_public_3_20240108',
    openingMessage: 'Hi there! Anna here to help.'
  }));
};
```

#### Event Handling
```tsx
<AvatarWidget
  knowledgeID="your-id"
  onOpen={() => console.log('Widget opened')}
  onClose={() => console.log('Widget closed')}
  onMessage={(message) => console.log('New message:', message)}
  onError={(error) => console.error('Widget error:', error)}
/>
```

#### Conditional Rendering
```tsx
const ShowWidget = () => {
  const { user } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (!user || isMobile) return null;
  
  return <AvatarWidget knowledgeID="your-id" />;
};
```

### Build Configuration

#### Vite Configuration
```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: {
    include: ['@pixelpk/avatar-widget']
  }
});
```

#### Webpack Configuration
```js
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@pixelpk/avatar-widget': path.resolve(__dirname, 'node_modules/@pixelpk/avatar-widget')
    }
  }
};
```

---

## 🔧 Manual Integration

Complete control for custom implementations.

### Prerequisites
- Web development knowledge
- Understanding of JavaScript modules
- Ability to serve static files
- Knowledge of your build system

### Step 1: Download Files

Get the raw widget files:
```
deployment-package/widget-files/
├── widget.umd.js        # 610KB - Main widget bundle
├── widget.css           # 82KB - Styles
└── embed.d.ts           # TypeScript definitions
```

### Step 2: Host Files

#### Option A: Self-Hosted
Upload files to your server:
```
your-website.com/
├── assets/
│   ├── widget.umd.js
│   └── widget.css
└── pages/
    └── your-page.html
```

#### Option B: CDN
Use a CDN service:
```html
<!-- JSDelivr -->
<script src="https://cdn.jsdelivr.net/gh/your-username/your-repo@main/widget.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-username/your-repo@main/widget.css">
```

### Step 3: Integration Methods

#### Method A: Script Tags (Simplest)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="./assets/widget.css">
</head>
<body>
    <!-- Your website content -->
    
    <!-- Widget container (optional) -->
    <div id="avatar-widget"></div>
    
    <!-- Widget script -->
    <script src="./assets/widget.umd.js"></script>
    <script>
        // Initialize widget when page loads
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof window.renderAvatarWidget === 'function') {
                window.renderAvatarWidget({
                    knowledgeID: '68e604b9028f2f5066e31678',
                    avatarId: 'Tyler-insuit-20220721',
                    openingMessage: 'Hello! How can I help you today?',
                    position: 'bottom-right',
                    containerId: 'avatar-widget' // Optional: use specific container
                });
            }
        });
    </script>
</body>
</html>
```

#### Method B: Module Import (Modern)
```html
<script type="module">
import { renderAvatarWidget } from './assets/widget.umd.js';

renderAvatarWidget({
    knowledgeID: 'your-knowledge-id',
    avatarId: 'Anna_public_3_20240108'
});
</script>
```

#### Method C: Dynamic Loading
```javascript
// Load widget dynamically when needed
async function loadAvatarWidget() {
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './assets/widget.css';
    document.head.appendChild(link);
    
    // Load JavaScript
    const script = document.createElement('script');
    script.src = './assets/widget.umd.js';
    script.onload = () => {
        window.renderAvatarWidget({
            knowledgeID: 'your-knowledge-id'
        });
    };
    document.body.appendChild(script);
}

// Load when user clicks a button
document.getElementById('start-chat').addEventListener('click', loadAvatarWidget);
```

### Step 4: Advanced Configuration

#### Full Configuration Object
```javascript
window.renderAvatarWidget({
    // Required
    knowledgeID: '68e604b9028f2f5066e31678',
    
    // Avatar selection
    avatarId: 'Tyler-insuit-20220721', // or Anna_public_3_20240108, Susan_standing-idle
    
    // Customization
    openingMessage: 'Hello! How can I help you today?',
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    theme: 'light', // light, dark
    
    // Container
    containerId: 'custom-container', // Optional: render in specific element
    
    // Behavior
    autoOpen: false, // Don't auto-open chat
    muted: true, // Start muted
    
    // Callbacks
    onReady: () => console.log('Widget ready'),
    onOpen: () => console.log('Chat opened'),
    onClose: () => console.log('Chat closed'),
    onMessage: (msg) => console.log('New message:', msg),
    onError: (err) => console.error('Widget error:', err)
});
```

#### Multiple Widgets
```javascript
// Different widgets on different pages
const widgetConfigs = {
    homepage: {
        knowledgeID: 'home-knowledge-id',
        avatarId: 'Tyler-insuit-20220721',
        openingMessage: 'Welcome to our website!'
    },
    support: {
        knowledgeID: 'support-knowledge-id', 
        avatarId: 'Anna_public_3_20240108',
        openingMessage: 'How can I help you today?'
    },
    sales: {
        knowledgeID: 'sales-knowledge-id',
        avatarId: 'Susan_standing-idle',
        openingMessage: 'Interested in our products?'
    }
};

// Load based on current page
const currentPage = window.location.pathname;
const config = widgetConfigs[getCurrentPageType()] || widgetConfigs.homepage;
window.renderAvatarWidget(config);
```

#### Build System Integration

##### Webpack
```javascript
// webpack.config.js
module.exports = {
    entry: './src/index.js',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'node_modules/@your-org/ai-avatar-widget/dist', to: 'assets' }
            ]
        })
    ]
};
```

##### Gulp
```javascript
// gulpfile.js
gulp.task('copy-widget', () => {
    return gulp.src('node_modules/@pixelpk/avatar-widget/dist/*')
        .pipe(gulp.dest('dist/assets'));
});
```

##### Vite
```javascript
// vite.config.js
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'src/main.js',
                widget: 'deployment-package/widget-files/widget.umd.js'
            }
        }
    }
});
```

---

## 🐛 Troubleshooting

### Common Issues

#### Widget Not Appearing
1. **Check console errors**: Open browser DevTools → Console
2. **Verify file paths**: Ensure CSS and JS files load correctly
3. **Check knowledge ID**: Verify it's correct and not expired
4. **Test on different page**: Rule out page-specific issues

#### JavaScript Errors
```javascript
// Add error handling
window.addEventListener('error', function(e) {
    console.log('Global error:', e.error);
});

// Check if widget loaded
if (typeof window.renderAvatarWidget !== 'function') {
    console.error('Avatar widget failed to load');
}
```

#### Styling Issues
```css
/* Force widget visibility */
#ai-avatar-widget {
    z-index: 999999 !important;
    display: block !important;
}

/* Fix positioning conflicts */
.ai-avatar-widget-container {
    position: fixed !important;
}
```

#### Performance Issues
```javascript
// Lazy load widget
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadAvatarWidget();
            observer.disconnect();
        }
    });
});
observer.observe(document.getElementById('chat-trigger'));
```

### Debug Mode
```html
<!-- Add debug information -->
<script>
window.avatarWidgetDebug = true;
</script>
<script src="./assets/widget.umd.js"></script>
```

### Support Resources
- **Debug template**: Use `deployment-package/examples/debug.html`
- **Error logs**: Check browser console and network tab
- **Test environment**: Try on a clean HTML page first
- **Documentation**: Each installation method has detailed README

---

## 📚 Next Steps

After successful installation:

1. **Test thoroughly** on different devices and browsers
2. **Customize styling** to match your brand
3. **Set up analytics** to track widget usage
4. **Configure knowledge base** with relevant information
5. **Monitor performance** and user feedback

Choose your installation method above and follow the detailed steps. Each method includes troubleshooting tips and advanced configuration options.

**Need help?** Check the specific README file in each installation method folder for more detailed information and examples.