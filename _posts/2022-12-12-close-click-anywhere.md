---
title: Close a menu or element when clicked anywhere
description: >-
  
author: kip
date: 2022-12-02 11:11:00 +0200
categories: [Coding, Snippet]
tags: [jQuery]
pin: false
full_text: true
---

Often we have a menu, modal or any other element that we want to close when you click outside of it. Therefor this little snippet that's using jQuery.

```js
$('html').click(function (e) {
  var offTarget = $(".offTarget"); // you can add this class to button and menu so it stays clickable //
  if (!offTarget.is(e.target) && offTarget.has(e.target).length === 0) {
    if($('#menu').is(':visible')){
      $('#closeTrigger').trigger('click'); // simulate click on close button //
    }
  }
});
```
