---
title: Woocommerce CSV import products as draft
description: >-
  
author: kip
date: 23-02-07 12:01:00 +0200
categories: [Coding, WooCommerce, Snippet]
tags: [WooCommerce, Webshop, PHP, .csv]
pin: false
full_text: true
---

I was helping a buddy with his Woocommerce webshop to import products via a csv file. The problem we encountered was that the products are imported and directly published. Therefor I made this snippet as a must-use plugin to import them as a draft. First create a new folder called `mu-plugins` inside the `wp-content` folder. Then create a new script inside the mu-plugins folder called `draft-import.php` and paste the snippet in it, save and u are done.

```php
<?php
/*
Plugin Name: Import as draft
Description: CSV imported products are set to draft instead of published
Version: 1.0
Author: Kip @ codump.github.io
*/

add_filter( 'woocommerce_product_import_pre_insert_product_object', 'process_import', 10, 2 );
function process_import( $product, $data ) {
	$product->set_status( 'draft' );
    return $product;
}
?>
```
{: file="draft-import.php" }
