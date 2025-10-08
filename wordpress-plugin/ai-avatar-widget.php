<?php
/**
 * Plugin Name: AI Avatar Widget
 * Plugin URI: https://github.com/ammar-pixelpk/avatar-widget
 * Description: Add an intelligent AI avatar chat widget to your WordPress site. Easy setup, no coding required.
 * Version: 1.0.0
 * Author: PixelPK
 * Author URI: https://github.com/ammar-pixelpk
 * License: MIT
 * Text Domain: ai-avatar-widget
 * Requires at least: 5.0
 * Tested up to: 6.5
 * Requires PHP: 7.4
 * GitHub Plugin URI: ammar-pixelpk/avatar-widget
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('AI_AVATAR_WIDGET_VERSION', '1.0.0');
define('AI_AVATAR_WIDGET_PLUGIN_URL', plugin_dir_url(__FILE__));
define('AI_AVATAR_WIDGET_PLUGIN_PATH', plugin_dir_path(__FILE__));

class AIAvatarWidget {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_widget'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'admin_init'));
        
        // Add settings link on plugin page
        add_filter('plugin_action_links_' . plugin_basename(__FILE__), array($this, 'add_settings_link'));
    }
    
    public function init() {
        // Plugin initialization
        load_plugin_textdomain('ai-avatar-widget', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function enqueue_scripts() {
        // Only load if widget is enabled
        if (!get_option('ai_avatar_widget_enabled', true)) {
            return;
        }
        
        // Enqueue React dependencies
        wp_enqueue_script('react', 'https://unpkg.com/react@18/umd/react.production.min.js', array(), '18.0.0', true);
        wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js', array('react'), '18.0.0', true);
        
        // Enqueue widget styles from CDN
        wp_enqueue_style('ai-avatar-widget-css', 'https://cdn.jsdelivr.net/gh/ammar-pixelpk/avatar-widget@main/dist/widget.css', array(), AI_AVATAR_WIDGET_VERSION);
        
        // Enqueue widget script from CDN
        wp_enqueue_script('ai-avatar-widget-js', 'https://cdn.jsdelivr.net/gh/ammar-pixelpk/avatar-widget@main/dist/widget.umd.js', array('react', 'react-dom'), AI_AVATAR_WIDGET_VERSION, true);
        
        // Localize script with settings
        wp_localize_script('ai-avatar-widget-js', 'aiAvatarConfig', array(
            'knowledgeID' => get_option('ai_avatar_widget_knowledge_id', '68e604b9028f2f5066e31678'),
            'avatarId' => get_option('ai_avatar_widget_avatar_id', 'Tyler-insuit-20220721'),
            'openingMessage' => get_option('ai_avatar_widget_opening_message', 'Hello! How can I help you today?'),
            'position' => get_option('ai_avatar_widget_position', 'bottom-right'),
            'theme' => get_option('ai_avatar_widget_theme', 'light'),
            'enabled' => get_option('ai_avatar_widget_enabled', true)
        ));
    }
    
    public function render_widget() {
        // Only render if widget is enabled
        if (!get_option('ai_avatar_widget_enabled', true)) {
            return;
        }
        
        $position = get_option('ai_avatar_widget_position', 'bottom-right');
        $position_styles = array(
            'bottom-right' => 'bottom: 20px; right: 20px;',
            'bottom-left' => 'bottom: 20px; left: 20px;',
            'top-right' => 'top: 20px; right: 20px;',
            'top-left' => 'top: 20px; left: 20px;'
        );
        
        echo '<div id="ai-avatar-widget-wp" style="position: fixed; ' . esc_attr($position_styles[$position]) . ' z-index: 999999;"></div>';
        
        // Initialize widget
        echo '<script>
        document.addEventListener("DOMContentLoaded", function() {
            if (typeof window.renderAvatarWidget === "function") {
                window.renderAvatarWidget("ai-avatar-widget-wp", {
                    knowledgeID: "' . esc_js(get_option('ai_avatar_widget_knowledge_id', '68e604b9028f2f5066e31678')) . '",
                    avatarId: "' . esc_js(get_option('ai_avatar_widget_avatar_id', 'Tyler-insuit-20220721')) . '",
                    openingMessage: "' . esc_js(get_option('ai_avatar_widget_opening_message', 'Hello! How can I help you today?')) . '"
                });
            }
        });
        </script>';
    }
    
    public function add_admin_menu() {
        add_options_page(
            __('AI Avatar Widget Settings', 'ai-avatar-widget'),
            __('AI Avatar Widget', 'ai-avatar-widget'),
            'manage_options',
            'ai-avatar-widget',
            array($this, 'admin_page')
        );
    }
    
    public function admin_init() {
        register_setting('ai_avatar_widget_settings', 'ai_avatar_widget_enabled');
        register_setting('ai_avatar_widget_settings', 'ai_avatar_widget_knowledge_id');
        register_setting('ai_avatar_widget_settings', 'ai_avatar_widget_avatar_id');
        register_setting('ai_avatar_widget_settings', 'ai_avatar_widget_opening_message');
        register_setting('ai_avatar_widget_settings', 'ai_avatar_widget_position');
        register_setting('ai_avatar_widget_settings', 'ai_avatar_widget_theme');
        
        add_settings_section(
            'ai_avatar_widget_main_section',
            __('Widget Configuration', 'ai-avatar-widget'),
            array($this, 'main_section_callback'),
            'ai_avatar_widget_settings'
        );
        
        add_settings_field(
            'ai_avatar_widget_enabled',
            __('Enable Widget', 'ai-avatar-widget'),
            array($this, 'enabled_callback'),
            'ai_avatar_widget_settings',
            'ai_avatar_widget_main_section'
        );
        
        add_settings_field(
            'ai_avatar_widget_knowledge_id',
            __('Knowledge Base ID', 'ai-avatar-widget'),
            array($this, 'knowledge_id_callback'),
            'ai_avatar_widget_settings',
            'ai_avatar_widget_main_section'
        );
        
        add_settings_field(
            'ai_avatar_widget_avatar_id',
            __('Avatar Character', 'ai-avatar-widget'),
            array($this, 'avatar_id_callback'),
            'ai_avatar_widget_settings',
            'ai_avatar_widget_main_section'
        );
        
        add_settings_field(
            'ai_avatar_widget_opening_message',
            __('Opening Message', 'ai-avatar-widget'),
            array($this, 'opening_message_callback'),
            'ai_avatar_widget_settings',
            'ai_avatar_widget_main_section'
        );
        
        add_settings_field(
            'ai_avatar_widget_position',
            __('Widget Position', 'ai-avatar-widget'),
            array($this, 'position_callback'),
            'ai_avatar_widget_settings',
            'ai_avatar_widget_main_section'
        );
        
        add_settings_field(
            'ai_avatar_widget_theme',
            __('Theme', 'ai-avatar-widget'),
            array($this, 'theme_callback'),
            'ai_avatar_widget_settings',
            'ai_avatar_widget_main_section'
        );
    }
    
    public function admin_page() {
        ?>
        <div class="wrap">
            <h1><?php _e('AI Avatar Widget Settings', 'ai-avatar-widget'); ?></h1>
            
            <div id="poststuff">
                <div id="post-body" class="metabox-holder columns-2">
                    <div id="post-body-content">
                        <div class="meta-box-sortables ui-sortable">
                            <div class="postbox">
                                <h2><span><?php _e('Configuration', 'ai-avatar-widget'); ?></span></h2>
                                <div class="inside">
                                    <form method="post" action="options.php">
                                        <?php
                                        settings_fields('ai_avatar_widget_settings');
                                        do_settings_sections('ai_avatar_widget_settings');
                                        submit_button();
                                        ?>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="postbox-container-1" class="postbox-container">
                        <div class="meta-box-sortables">
                            <div class="postbox">
                                <h2><span><?php _e('Preview', 'ai-avatar-widget'); ?></span></h2>
                                <div class="inside">
                                    <p><?php _e('Your widget will appear in the chosen position on your website.', 'ai-avatar-widget'); ?></p>
                                    <div style="background: #f0f0f0; height: 200px; position: relative; border-radius: 10px;">
                                        <div id="widget-preview" style="position: absolute; bottom: 10px; right: 10px; width: 50px; height: 50px; background: #7559FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">💬</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="postbox">
                                <h2><span><?php _e('Support', 'ai-avatar-widget'); ?></span></h2>
                                <div class="inside">
                                    <p><?php _e('Need help? Check out these resources:', 'ai-avatar-widget'); ?></p>
                                    <ul>
                                        <li><a href="https://github.com/your-username/avatar-widget/wiki" target="_blank"><?php _e('Documentation', 'ai-avatar-widget'); ?></a></li>
                                        <li><a href="https://github.com/your-username/avatar-widget/issues" target="_blank"><?php _e('Report Issues', 'ai-avatar-widget'); ?></a></li>
                                        <li><a href="mailto:support@your-company.com"><?php _e('Email Support', 'ai-avatar-widget'); ?></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
        jQuery(document).ready(function($) {
            function updatePreview() {
                var position = $('#ai_avatar_widget_position').val();
                var preview = $('#widget-preview');
                
                preview.css({
                    'top': 'auto',
                    'bottom': 'auto',
                    'left': 'auto',
                    'right': 'auto'
                });
                
                switch(position) {
                    case 'bottom-right':
                        preview.css({'bottom': '10px', 'right': '10px'});
                        break;
                    case 'bottom-left':
                        preview.css({'bottom': '10px', 'left': '10px'});
                        break;
                    case 'top-right':
                        preview.css({'top': '10px', 'right': '10px'});
                        break;
                    case 'top-left':
                        preview.css({'top': '10px', 'left': '10px'});
                        break;
                }
            }
            
            $('#ai_avatar_widget_position').change(updatePreview);
            updatePreview();
        });
        </script>
        <?php
    }
    
    public function main_section_callback() {
        echo '<p>' . __('Configure your AI avatar widget settings below.', 'ai-avatar-widget') . '</p>';
    }
    
    public function enabled_callback() {
        $enabled = get_option('ai_avatar_widget_enabled', true);
        echo '<input type="checkbox" id="ai_avatar_widget_enabled" name="ai_avatar_widget_enabled" value="1" ' . checked(1, $enabled, false) . ' />';
        echo '<label for="ai_avatar_widget_enabled">' . __('Display the widget on your website', 'ai-avatar-widget') . '</label>';
    }
    
    public function knowledge_id_callback() {
        $knowledge_id = get_option('ai_avatar_widget_knowledge_id', '68e604b9028f2f5066e31678');
        echo '<input type="text" id="ai_avatar_widget_knowledge_id" name="ai_avatar_widget_knowledge_id" value="' . esc_attr($knowledge_id) . '" class="regular-text" required />';
        echo '<p class="description">' . __('Your AI knowledge base identifier. Contact your admin for the correct ID.', 'ai-avatar-widget') . '</p>';
    }
    
    public function avatar_id_callback() {
        $avatar_id = get_option('ai_avatar_widget_avatar_id', 'Tyler-insuit-20220721');
        $avatars = array(
            'Tyler-insuit-20220721' => __('Tyler - Professional Business Avatar', 'ai-avatar-widget'),
            'Anna_public_3_20240108' => __('Anna - Friendly Customer Service', 'ai-avatar-widget'),
            'Susan_public_2_20240328' => __('Susan - Expert Technical Support', 'ai-avatar-widget')
        );
        
        echo '<select id="ai_avatar_widget_avatar_id" name="ai_avatar_widget_avatar_id">';
        foreach ($avatars as $id => $name) {
            echo '<option value="' . esc_attr($id) . '" ' . selected($avatar_id, $id, false) . '>' . esc_html($name) . '</option>';
        }
        echo '</select>';
        echo '<p class="description">' . __('Choose the avatar character that will represent your AI assistant.', 'ai-avatar-widget') . '</p>';
    }
    
    public function opening_message_callback() {
        $opening_message = get_option('ai_avatar_widget_opening_message', 'Hello! How can I help you today?');
        echo '<textarea id="ai_avatar_widget_opening_message" name="ai_avatar_widget_opening_message" rows="3" class="large-text">' . esc_textarea($opening_message) . '</textarea>';
        echo '<p class="description">' . __('The first message visitors will see when they open the chat.', 'ai-avatar-widget') . '</p>';
    }
    
    public function position_callback() {
        $position = get_option('ai_avatar_widget_position', 'bottom-right');
        $positions = array(
            'bottom-right' => __('Bottom Right (Recommended)', 'ai-avatar-widget'),
            'bottom-left' => __('Bottom Left', 'ai-avatar-widget'),
            'top-right' => __('Top Right', 'ai-avatar-widget'),
            'top-left' => __('Top Left', 'ai-avatar-widget')
        );
        
        echo '<select id="ai_avatar_widget_position" name="ai_avatar_widget_position">';
        foreach ($positions as $pos => $name) {
            echo '<option value="' . esc_attr($pos) . '" ' . selected($position, $pos, false) . '>' . esc_html($name) . '</option>';
        }
        echo '</select>';
        echo '<p class="description">' . __('Choose where the chat button appears on your website.', 'ai-avatar-widget') . '</p>';
    }
    
    public function theme_callback() {
        $theme = get_option('ai_avatar_widget_theme', 'light');
        $themes = array(
            'light' => __('Light Theme', 'ai-avatar-widget'),
            'dark' => __('Dark Theme', 'ai-avatar-widget')
        );
        
        echo '<select id="ai_avatar_widget_theme" name="ai_avatar_widget_theme">';
        foreach ($themes as $t => $name) {
            echo '<option value="' . esc_attr($t) . '" ' . selected($theme, $t, false) . '>' . esc_html($name) . '</option>';
        }
        echo '</select>';
    }
    
    public function add_settings_link($links) {
        $settings_link = '<a href="options-general.php?page=ai-avatar-widget">' . __('Settings', 'ai-avatar-widget') . '</a>';
        array_unshift($links, $settings_link);
        return $links;
    }
}

// Initialize the plugin
new AIAvatarWidget();

// Activation hook
register_activation_hook(__FILE__, function() {
    // Set default options
    add_option('ai_avatar_widget_enabled', true);
    add_option('ai_avatar_widget_knowledge_id', '68e604b9028f2f5066e31678');
    add_option('ai_avatar_widget_avatar_id', 'Tyler-insuit-20220721');
    add_option('ai_avatar_widget_opening_message', 'Hello! How can I help you today?');
    add_option('ai_avatar_widget_position', 'bottom-right');
    add_option('ai_avatar_widget_theme', 'light');
});

// Deactivation hook
register_deactivation_hook(__FILE__, function() {
    // Clean up if needed
});