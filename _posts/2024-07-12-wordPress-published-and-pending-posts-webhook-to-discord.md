---
title: WordPress published and pending posts webhook to discord
description: >-
  
author: kip
date: 24-07-12 02:24:00 +0200
categories: [Coding, WordPress, Snippet]
tags: [WordPress, discord, PHP]
pin: false
full_text: true
---

I needed a WordPress to discord webhook plugin but those that were available didn't work. So I made this snippet that will post to discord if there is a pending or published post. How to install: go to the `wp-content/plugins/` folder and create a new folder called `post-to-discord`. Create a new file called `post-to-discord.php` and paste the snippet into it. Now you can go to your WP settings -> general and you will find 2 fields to submit the webhooks.

```php
<?php
/*
 * Plugin Name: Webhook to Discord
 * Description: WordPress posts to Discord.
 * Version: 1.0
 * Author: Kip @ codump.github.io
*/
 
function post_to_discord($new_status, $old_status, $post) { 
  if(get_option('discord_webhook_url') == null) 
    return;
    
  if ( $old_status == 'publish' || $post->post_type != 'post')
    return;

  $id = $post->ID;
  $author = $post->post_author;
  $authorName = get_the_author_meta('display_name', $author);
  $postTitle = $post->post_title;
  $permalink = get_permalink($id);
  if($new_status == 'publish') {
    $message = $authorName . " just published \"" . $postTitle . "\" for your reading pleasure: " . $permalink;
    $webhookURL = get_option('discord_webhook_url');
  }
  if($new_status == 'pending') {
    $message = "New pending post: ".$authorName . " wants \"" . $postTitle . "\" to be reviewed: " . $permalink;
    $webhookURL = get_option('discord_webhook_url_pending');
  }

  $postData = array('content' => $message);

  $curl = curl_init($webhookURL);
  curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");  
  curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postData));
  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
   
  $response = curl_exec($curl);
  $errors = curl_error($curl);        
     
  log_message($errors);
}
 
function log_message($log) {
  if (true === WP_DEBUG) {
    if (is_array($log) || is_object($log)) {
      error_log(print_r($log, true));
    } else {
      error_log($log);
    }
  }
}
 
add_action('transition_post_status', 'post_to_discord', 10, 3);
 
function post_to_discord_section_callback() {
  echo "<p>A valid discord webhook URL to a channel is required.";
}
 
function post_to_discord_published_input_callback() {
  echo '<input name="discord_webhook_url" id="discord_webhook_url" type="text" value="' . get_option('discord_webhook_url') . '"><br/>';
}
function post_to_discord_pending_input_callback() {
  echo '<input name="discord_webhook_url_pending" id="discord_webhook_url_pending" type="text" value="' . get_option('discord_webhook_url_pending') . '">';
}
 
function post_to_discord_settings_init() {
  add_settings_section(
    'discord_webhook_url',
    'Post published posts to discord',
    'post_to_discord_section_callback',
    'general'
  );
  add_settings_section(
    'discord_webhook_url_pending',
    'Post pending posts to discord',
    'post_to_discord_section_callback',
    'general'
  );
 
  add_settings_field(
    'discord_webhook_url',
    'Published webhook URL',
    'post_to_discord_published_input_callback',
    'general',
    'discord_webhook_url'
  );
  add_settings_field(
    'discord_webhook_url_pending',
    'Pending webhook URL',
    'post_to_discord_pending_input_callback',
    'general',
    'discord_webhook_url_pending'
  );
 
  register_setting( 'general', 'discord_webhook_url' );
  register_setting( 'general', 'discord_webhook_url_pending' );
}
 
add_action( 'admin_init', 'post_to_discord_settings_init' );

?>
```
{: file="post-to-discord.php" }
