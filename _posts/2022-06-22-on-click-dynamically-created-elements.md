---
title: On click dynamically created elements
description: >-
  
author: kip
date: 2022-07-24 20:55:00 +0200
categories: [Coding, Snippet]
tags: [jQuery]
pin: false
full_text: true
---

When an element is dynamically created in the document/website the normal `$('.addedElement').click(function(e){` / click function doesn't work. The snippet below will solve that issue for u. When clicked on any element, dynamically added or not, with the class `addedElement` will run the function.

```js
$(document).on('click', '.addedElement', function(){
	alert('Clicked on dynamic added element'); // Change to function you want.
});
```
