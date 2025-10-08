# 🚨 AvatarWidget Troubleshooting Guide

## Common Error: "Failed to load AI Assistant"

This error usually happens for one of these reasons:

### 1. 📁 **Missing Files**
**Problem:** Widget files not found
**Solution:**
```bash
# Make sure these files exist:
your-website/
├── assets/
│   ├── avatar-widget.umd.js  ← Must be 624KB
│   └── ai-avatar.css         ← Must be 82KB
└── your-page.html
```

### 2. 🌐 **File Path Issues**
**Problem:** Incorrect script/CSS paths
**Solution:** Check your HTML paths match your folder structure:

```html
<!-- If files are in assets/ folder: -->
<link rel="stylesheet" href="./assets/ai-avatar.css">
<script src="./assets/avatar-widget.umd.js"></script>

<!-- If files are in same folder: -->
<link rel="stylesheet" href="./ai-avatar.css">
<script src="./avatar-widget.umd.js"></script>

<!-- If using CDN: -->
<link rel="stylesheet" href="https://your-cdn.com/ai-avatar.css">
<script src="https://your-cdn.com/avatar-widget.umd.js"></script>
```

### 3. 🔑 **Configuration Issues**
**Problem:** Invalid Knowledge ID
**Solution:** Replace with your actual knowledge base ID:

```javascript
// ❌ Wrong - using placeholder
knowledgeID: 'YOUR_KNOWLEDGE_ID'

// ✅ Correct - using actual ID
knowledgeID: '68e604b9028f2f5066e31678'
```

### 4. 🚫 **CORS/Security Issues**
**Problem:** Opening HTML file directly (file://)
**Solution:** Must use HTTP server:

```bash
# ❌ Wrong - direct file access
file:///path/to/your/website.html

# ✅ Correct - HTTP server
python -m http.server 8000
# Then visit: http://localhost:8000/website.html
```

### 5. ⚡ **React Dependencies**
**Problem:** React not loaded or wrong order
**Solution:** Load React BEFORE widget:

```html
<!-- ✅ Correct order -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="./assets/avatar-widget.umd.js"></script>
```

### 6. 🌍 **Network/API Issues**
**Problem:** Avatar service unreachable
**Solutions:**
- Check internet connection
- Verify firewall settings
- Try different avatar ID
- Check if service is down

## 🔧 Quick Diagnostic Steps

### Step 1: Check Browser Console
1. Press `F12` to open Developer Tools
2. Go to **Console** tab
3. Look for red error messages
4. Common errors and fixes:

```
❌ "Failed to fetch" → Network/CORS issue
❌ "React is not defined" → React not loaded
❌ "renderAvatarWidget is not a function" → Widget bundle not loaded
❌ "Element not found" → Wrong container ID
```

### Step 2: Check Network Tab
1. In Developer Tools, go to **Network** tab
2. Refresh the page
3. Look for failed requests (red items)
4. Common issues:

```
❌ 404 for avatar-widget.umd.js → Wrong file path
❌ 404 for ai-avatar.css → Missing CSS file
❌ CORS error → Need HTTP server
```

### Step 3: Test Files Individually
```html
<!-- Test 1: CSS loading -->
<link rel="stylesheet" href="./assets/ai-avatar.css">
<!-- Check: Do you see any styling changes? -->

<!-- Test 2: React loading -->
<script>
  console.log('React:', typeof React);
  console.log('ReactDOM:', typeof ReactDOM);
</script>
<!-- Check: Should log 'object' for both -->

<!-- Test 3: Widget loading -->
<script>
  console.log('renderAvatarWidget:', typeof window.renderAvatarWidget);
</script>
<!-- Check: Should log 'function' -->
```

## 🛠 Working Example Template

Use this template if nothing else works:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Chat Widget</title>
    
    <!-- Widget styles - MUST be first -->
    <link rel="stylesheet" href="./assets/ai-avatar.css">
    
    <style>
        .chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        }
    </style>
</head>
<body>
    <h1>My Website</h1>
    <p>Your content here...</p>

    <!-- Widget container -->
    <div class="chat-widget">
        <div id="ai-chat"></div>
    </div>

    <!-- React - MUST load before widget -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Widget bundle -->
    <script src="./assets/avatar-widget.umd.js"></script>
    
    <!-- Initialize widget -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            try {
                if (typeof window.renderAvatarWidget === 'function') {
                    window.renderAvatarWidget('ai-chat', {
                        knowledgeID: '68e604b9028f2f5066e31678', // ← Change this!
                        avatarId: 'Tyler-insuit-20220721',
                        openingMessage: 'Hello! How can I help?'
                    });
                    console.log('✅ Widget initialized');
                } else {
                    console.error('❌ Widget function not available');
                }
            } catch (error) {
                console.error('❌ Widget error:', error);
            }
        });
    </script>
</body>
</html>
```

## 🆘 Still Not Working?

1. **Use the debug page:** Open `debug.html` for detailed diagnostics
2. **Check file sizes:** 
   - `avatar-widget.umd.js` should be ~624KB
   - `ai-avatar.css` should be ~82KB
3. **Try different browsers:** Test in Chrome, Firefox, Safari
4. **Check mobile:** Some issues only appear on mobile devices
5. **Verify knowledge ID:** Contact your admin for the correct ID

## ✅ Success Checklist

- [ ] Files uploaded to correct location
- [ ] HTTP server running (not file://)
- [ ] React loads before widget
- [ ] CSS file included in `<head>`
- [ ] Correct knowledge ID configured
- [ ] No console errors
- [ ] Purple chat button appears
- [ ] Widget opens when clicked

---

**Remember:** The widget MUST be served via HTTP/HTTPS. Opening HTML files directly in the browser (file:// URLs) will NOT work due to security restrictions.