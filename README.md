# AI Avatar Widget - Complete Deployment Package

This package provides multiple installation methods for the AI Avatar Widget, making it accessible to users with different technical backgrounds.

## 🎯 What's Included

### For Developers
- **npm package**: Full TypeScript support with CLI wizard
- **Direct files**: Raw widget files for custom integration
- **React component**: Source component for React apps

### For WordPress Users
- **Complete WordPress plugin**: Zero-coding solution
- **Admin interface**: Visual configuration panel
- **Automatic integration**: Works with any WordPress theme

### For Everyone
- **One-line installer**: Single script tag solution  
- **Interactive wizard**: Visual setup guide
- **CDN examples**: Ready-to-use HTML templates

## 📁 Package Structure

```
deployment-package/
├── 📄 README.md                    # This file
├── 📄 INSTALLATION.md              # Detailed installation guide
│
├── 📁 wordpress-plugin/            # Complete WordPress solution
│   ├── ai-avatar-widget.php       # Main plugin file
│   ├── ai-avatar-widget.zip       # Ready-to-install plugin
│   ├── admin-page.php              # Settings interface
│   └── README.md                   # WordPress-specific guide
│
├── 📁 npm-package/                 # npm package with wizard
│   ├── package.json               # npm configuration
│   ├── install.js                 # Interactive CLI wizard
│   ├── index.js                   # Main entry point
│   └── README.md                  # npm usage guide
│
├── 📁 assets/                     # Widget files
│   ├── avatar-widget.umd.js       # Built widget (610KB)
│   └── ai-avatar.css              # Bundled styles (82KB)
│
├── � simple-example.html         # Minimal one-line integration
├── 📄 production-ready-example.html # Full-featured demo
├── 📄 installer.js                # One-line installer script
└── 📄 installer-v1.0.1.js        # Cache-safe versioned installer
│
└── 📁 installers/                # Automated installers
    ├── installer.js              # One-line script installer
    ├── wizard.html              # Interactive web wizard
    └── setup.sh                 # Bash script (coming soon)
```

## 🚀 Quick Start Guide

### 1. WordPress Sites (Easiest)

If you have a WordPress site, use the plugin:

```bash
# Download and install the WordPress plugin
# Go to: deployment-package/wordpress-plugin/
# Upload ai-avatar-widget.zip to WordPress
```

### 2. Any Website (One-Line)

Add this single line to your website:

```html
<script src="https://cdn.jsdelivr.net/gh/ammar-pixelpk/avatar-widget@main/dist/installer.js" data-knowledge-id="your-knowledge-id"></script>
```

### 3. React/TypeScript Projects (npm)

Install as a proper npm package:

```bash
npm install @pixelpk/avatar-widget
# Runs interactive setup wizard automatically
```

### 4. Custom Integration (Advanced)

Use the raw files for complete control:

```html
<!-- Copy files from deployment-package/widget-files/ -->
<script src="./widget.umd.js"></script>
<link rel="stylesheet" href="./widget.css">
<script>
  window.renderAvatarWidget({
    knowledgeID: 'your-knowledge-id',
    containerId: 'avatar-container'
  });
</script>
```

## 🎨 Features Overview

### 🤖 AI Avatar Characters
- **Tyler** (insuit-20220721): Professional businessman
- **Anna** (public_3_20240108): Friendly assistant  
- **Susan** (standing-idle): Approachable representative

### ⚙️ Configuration Options
- **Knowledge Base ID**: Connect to your AI backend
- **Avatar Selection**: Choose personality and appearance
- **Positioning**: Any corner placement
- **Custom Messages**: Personalized greetings
- **Themes**: Light/dark mode support
- **Responsive**: Mobile-optimized design

### 🛠 Technical Features
- **610KB Bundle**: Optimized for fast loading
- **CDN Ready**: Works with jsdelivr and unpkg
- **TypeScript**: Full type safety
- **React 18**: Modern React features
- **Tailwind**: Utility-first styling
- **Zero Dependencies**: Self-contained widget

## 📊 Installation Method Comparison

| Method | Difficulty | Setup Time | Customization | Best For |
|--------|------------|------------|---------------|----------|
| WordPress Plugin | ⭐ Easy | 2 minutes | Medium | WordPress sites |
| One-Line Script | ⭐ Easy | 30 seconds | Basic | Any website |
| npm Package | ⭐⭐ Medium | 5 minutes | High | React/Node projects |  
| Raw Files | ⭐⭐⭐ Advanced | 15 minutes | Maximum | Custom integrations |

## 🎯 Choosing Your Installation Method

### Use WordPress Plugin If:
- ✅ You have a WordPress website
- ✅ You want zero coding
- ✅ You need a visual admin interface
- ✅ You want automatic updates

### Use One-Line Installer If:
- ✅ You have any type of website
- ✅ You want the fastest setup
- ✅ You're okay with basic customization
- ✅ You trust CDN hosting

### Use npm Package If:
- ✅ You're building a React/TypeScript app
- ✅ You want proper dependency management
- ✅ You need TypeScript definitions
- ✅ You want to customize deeply

### Use Raw Files If:
- ✅ You need complete control
- ✅ You're integrating with existing build process
- ✅ You want to host files yourself
- ✅ You're building a custom solution

## 🚀 Getting Started

1. **Choose your installation method** from the options above
2. **Navigate to the appropriate folder** in this package
3. **Follow the README** in that specific folder
4. **Test the installation** using the debug examples
5. **Customize** according to your needs

## 📞 Support & Resources

- **Documentation**: Each folder has detailed README files
- **Examples**: Check the examples/ folder for templates
- **Debugging**: Use debug.html for troubleshooting
- **Issues**: Common problems and solutions in each README

## 🔄 Updates & Maintenance

- **WordPress Plugin**: Auto-updates through WordPress admin
- **npm Package**: Use `npm update @your-org/ai-avatar-widget`
- **CDN Files**: Auto-updated, or pin to specific version
- **Raw Files**: Manual update required

## 📄 License

MIT License - See LICENSE file for details.

---

**Ready to add an AI avatar to your website?** Choose your preferred installation method and get started in minutes! 🚀
    <!-- Your website content -->
    <h1>My Website</h1>
    
    <!-- Widget container -->
    <div id="ai-chat" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;"></div>

    <!-- Load dependencies -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Load widget -->
    <script src="./assets/avatar-widget.umd.js"></script>
    
    <!-- Initialize -->
    <script>
        window.renderAvatarWidget('ai-chat', {
            knowledgeID: 'YOUR_KNOWLEDGE_ID',  // ← Replace this
            avatarId: 'Tyler-insuit-20220721',
            openingMessage: 'Hello! How can I help you?'
        });
    </script>
</body>
</html>
```

### 3. Configure
Replace `YOUR_KNOWLEDGE_ID` with your actual knowledge base ID.

## 📋 Configuration Options

| Option | Required | Default | Description |
|--------|----------|---------|-------------|
| `knowledgeID` | ✅ Yes | - | Your knowledge base ID |
| `avatarId` | ❌ No | `"Tyler-insuit-20220721"` | Avatar to use |
| `openingMessage` | ❌ No | `"Hello! How can I help you today?"` | First message |

## 🎯 Integration Examples

### Fixed Chat Button (Recommended)
```html
<div id="chat-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;"></div>
<script>
    window.renderAvatarWidget('chat-widget', {
        knowledgeID: 'your-knowledge-id',
        openingMessage: 'Hi! Need help? Just ask!'
    });
</script>
```

### Inline Widget
```html
<h2>Customer Support</h2>
<div id="support-chat" style="margin: 20px 0;"></div>
<script>
    window.renderAvatarWidget('support-chat', {
        knowledgeID: 'your-knowledge-id'
    });
</script>
```

### Auto-Rendering
```html
<div 
    data-avatar-widget-auto
    data-knowledge-id="your-knowledge-id"
    data-opening-message="Welcome! How can I assist you?">
</div>
```

## 🧪 Testing Your Integration

1. **Local Testing**: Use a local server (not file://)
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000/your-page.html
   ```

2. **Check Browser Console**: Look for any JavaScript errors

3. **Verify Widget Loads**: You should see a purple chat button

## ✅ Troubleshooting

**Widget not appearing?**
- ✅ Check that `ai-avatar.css` is loaded
- ✅ Ensure React scripts load before the widget
- ✅ Verify the knowledge ID is correct
- ✅ Check browser console for errors

**Styling conflicts?**
- ✅ Widget uses its own CSS namespace
- ✅ Increase z-index if widget is behind other elements
- ✅ Check for CSS conflicts in developer tools

**Not working on mobile?**
- ✅ Widget is responsive by default
- ✅ Test on different screen sizes
- ✅ Ensure proper viewport meta tag

## 🔒 Production Deployment

- **HTTPS**: Always use HTTPS in production
- **CDN**: Consider hosting widget files on a CDN
- **Caching**: Set appropriate cache headers
- **Compression**: Enable gzip for better performance

## 📞 Support

If you need help with integration:
1. Check the browser console for errors
2. Verify all files are uploaded correctly  
3. Test with the provided example files first
4. Ensure your knowledge ID is correct

---

**Ready to go live?** 🚀 Just upload the files and add the integration code to your website!