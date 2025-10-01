<?php
/**
 * Plugin Name:       VIBER Integration
 * Plugin URI:        https://github.com/chainchopper/VIBER
 * Description:       Integrates the VIBER "Powered By Nirvana" AI tools with WordPress.
 * Version:           1.0.0
 * Author:            ChainChopper
 * Author URI:        https://chainchopper.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       viber-integration
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

// Create the admin menu item
function viber_admin_menu() {
    add_menu_page(
        'VIBER Settings',
        'VIBER',
        'manage_options',
        'viber-settings',
        'viber_settings_page_html',
        'dashicons-admin-generic',
        20
    );
}
add_action( 'admin_menu', 'viber_admin_menu' );

// Create the settings page HTML
function viber_settings_page_html() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    ?>
    <div class="wrap">
        <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
        <p>Configure the VIBER platform by providing the necessary API keys and endpoints below.</p>
        <form action="options.php" method="post">
            <?php
            settings_fields( 'viber_settings' );
            do_settings_sections( 'viber-settings' );
            submit_button( 'Save Settings' );
            ?>
        </form>
    </div>
    <?php
}

// Register settings, sections, and fields
function viber_settings_init() {
    register_setting( 'viber_settings', 'viber_options' );

    add_settings_section(
        'viber_api_keys_section',
        'AI Provider API Keys',
        'viber_api_keys_section_callback',
        'viber-settings'
    );

    add_settings_field(
        'viber_openai_api_key',
        'OpenAI API Key',
        'viber_api_key_field_render',
        'viber-settings',
        'viber_api_keys_section',
        [ 'id' => 'openai_api_key' ]
    );

    add_settings_field(
        'viber_google_ai_studio_api_key',
        'Google AI Studio API Key',
        'viber_api_key_field_render',
        'viber-settings',
        'viber_api_keys_section',
        [ 'id' => 'google_ai_studio_api_key' ]
    );
}
add_action( 'admin_init', 'viber_settings_init' );

function viber_api_keys_section_callback() {
    echo '<p>Enter your API keys for the various AI providers.</p>';
}

function viber_api_key_field_render( $args ) {
    $options = get_option( 'viber_options' );
    ?>
    <input type="text" name="viber_options[<?php echo esc_attr( $args['id'] ); ?>]" value="<?php echo isset( $options[ $args['id'] ] ) ? esc_attr( $options[ $args['id'] ] ) : ''; ?>" class="regular-text">
    <?php
}

// Shortcode to embed the VIBER frontend
function viber_shortcode( $atts ) {
    $options = get_option( 'viber_options' );
    // In a real implementation, you would pass these options to a JavaScript application
    // that would then connect to the VIBER backend.
    return '<div id="viber-root"></div>';
}
add_shortcode( 'viber', 'viber_shortcode' );