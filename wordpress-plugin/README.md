# AI Avatar Widget - WordPress Plugin

A WordPress plugin that makes it super easy to add an AI avatar chat widget to any WordPress site.

## 📋 Features

- ✅ **Zero Coding Required** - Configure through WordPress admin
- ✅ **Visual Settings Panel** - Easy-to-use interface with live preview
- ✅ **Multiple Avatars** - Choose from Tyler, Anna, or Susan
- ✅ **Flexible Positioning** - Place widget in any corner
- ✅ **Responsive Design** - Works on all devices
- ✅ **Theme Integration** - Matches your site's design
- ✅ **Performance Optimized** - Loads asynchronously

## 🚀 Installation

### Method 1: WordPress Admin (Recommended)

1. Download the plugin ZIP file
2. Go to **Plugins → Add New** in your WordPress admin
3. Click **Upload Plugin**
4. Choose the ZIP file and click **Install Now**
5. **Activate** the plugin
6. Go to **Settings → AI Avatar Widget** to configure

### Method 2: Manual Upload

1. Extract the plugin files
2. Upload the `ai-avatar-widget` folder to `/wp-content/plugins/`
3. Activate the plugin in WordPress admin
4. Configure in **Settings → AI Avatar Widget**

### Method 3: WP-CLI

```bash
wp plugin install ai-avatar-widget.zip --activate
```

## ⚙️ Configuration

After activation, go to **Settings → AI Avatar Widget**:

### Required Settings

- **Knowledge Base ID**: Your AI's knowledge base identifier (required)
- **Enable Widget**: Toggle to show/hide the widget

### Customization Options

- **Avatar Character**: Choose Tyler, Anna, or Susan
- **Opening Message**: Customize the greeting message
- **Position**: Select corner placement (bottom-right recommended)
- **Theme**: Light or dark theme

### Settings Reference

| Setting | Default | Description |
|---------|---------|-------------|
| Enable Widget | ✅ Enabled | Show/hide the widget |
| Knowledge Base ID | `68e604b9028f2f5066e31678` | Your AI knowledge ID |
| Avatar Character | Tyler | AI avatar personality |
| Opening Message | "Hello! How can I help you today?" | First message shown |
| Position | Bottom Right | Widget placement on screen |
| Theme | Light | Color scheme |

## 🎯 Usage

1. **Configure** the plugin in WordPress admin
2. **Save** your settings
3. **Visit** your website - the widget appears automatically
4. **Test** by clicking the chat button

The widget will appear on all pages of your site according to your settings.

## 🛠 Advanced Usage

### Shortcode Support

Display the widget in specific locations using shortcodes:

```
[ai_avatar_widget]
```

With custom parameters:

```
[ai_avatar_widget avatar="Anna_public_3_20240108" message="Welcome to our store!"]
```

### Template Integration

For developers who want to integrate programmatically:

```php
<?php
if (function_exists('ai_avatar_widget_render')) {
    ai_avatar_widget_render(array(
        'knowledgeID' => 'your-knowledge-id',
        'avatarId' => 'Tyler-insuit-20220721',
        'openingMessage' => 'Custom message',
        'position' => 'bottom-left'
    ));
}
?>
```

### Conditional Display

Show widget only on specific pages:

```php
// In your theme's functions.php
add_filter('ai_avatar_widget_display', function($display) {
    // Only show on homepage
    return is_home() || is_front_page();
    
    // Or hide on specific pages
    // return !is_page('contact');
    
    // Or show only for logged-in users
    // return is_user_logged_in();
});
```

## 🎨 Styling & Customization

### CSS Customization

Add custom styles in **Appearance → Customize → Additional CSS**:

```css
/* Customize widget button */
.ai-avatar-widget-button {
    background-color: #your-brand-color !important;
}

/* Adjust widget size */
.ai-avatar-widget-container {
    transform: scale(0.8); /* Make smaller */
}

/* Custom positioning */
#ai-avatar-widget-wp {
    bottom: 80px !important; /* Move up from bottom */
}
```

### Hide on Mobile

```css
@media (max-width: 768px) {
    #ai-avatar-widget-wp {
        display: none;
    }
}
```

## 🔧 Troubleshooting

### Widget Not Appearing

1. **Check if enabled**: Go to Settings → AI Avatar Widget
2. **Verify Knowledge ID**: Make sure it's correct
3. **Check browser console**: Look for JavaScript errors
4. **Try different theme**: Some themes may conflict

### Styling Issues

1. **CSS conflicts**: Your theme might override widget styles
2. **Z-index problems**: Widget might be behind other elements
3. **Mobile issues**: Check responsive behavior

### Performance Issues

1. **Plugin conflicts**: Deactivate other plugins to test
2. **Caching**: Clear all caches after configuration changes
3. **CDN issues**: Check if React scripts are loading

### Common Solutions

```php
// Add to functions.php to fix loading issues
add_action('wp_footer', function() {
    echo '<script>console.log("AI Avatar Widget Debug: ", typeof window.renderAvatarWidget);</script>';
});
```

## 📊 Analytics & Tracking

### Google Analytics Integration

Track widget interactions:

```javascript
// Add to your theme or via plugin
document.addEventListener('avatarWidgetMessage', function(e) {
    gtag('event', 'ai_chat_interaction', {
        'event_category': 'AI Widget',
        'event_label': e.detail.message
    });
});
```

### Custom Event Tracking

```javascript
// Track widget opens
document.addEventListener('avatarWidgetOpen', function() {
    // Your analytics code
});
```

## 🔒 Security & Privacy

- Widget loads from secure CDN (HTTPS)
- No sensitive data stored locally
- GDPR compliant (no cookies set by widget)
- User conversations handled by your AI service

## 🆘 Support

### Getting Help

1. **Check Documentation**: Read this README thoroughly
2. **WordPress Forums**: Search for similar issues
3. **Plugin Support**: Contact through WordPress plugin directory
4. **Direct Support**: Email support@your-company.com

### Reporting Issues

When reporting issues, please include:

- WordPress version
- Theme name and version
- List of active plugins
- Browser and device information
- JavaScript console errors
- Steps to reproduce

### Useful Debug Information

```php
// Add to functions.php for debugging
add_action('wp_footer', function() {
    if (current_user_can('administrator')) {
        echo '<!-- AI Avatar Widget Debug:';
        echo 'Enabled: ' . (get_option('ai_avatar_widget_enabled') ? 'Yes' : 'No');
        echo ', Knowledge ID: ' . get_option('ai_avatar_widget_knowledge_id');
        echo ', Position: ' . get_option('ai_avatar_widget_position');
        echo ' -->';
    }
});
```

## 📄 License

This plugin is licensed under the MIT License. See LICENSE file for details.

## 🔄 Updates

The plugin supports automatic updates through the WordPress admin. You'll be notified when new versions are available.

### Changelog

#### Version 1.0.0
- Initial release
- Full WordPress integration
- Admin settings panel
- Multiple avatar support
- Responsive design
- Performance optimizations