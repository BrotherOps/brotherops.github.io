---
title: Version push to cache in JavaScript
description: >-
  
author: kip
date: 23-02-11 18:51:00 +0200
categories: [Coding, Snippet]
tags: [JavaScript, CSS, cache]
pin: false
full_text: true
---

Sometimes we make changes in a CSS or JS file and it doesn't show up. That's because of the files being cached by the browser and it's showing the old version. In PHP I had a variable that contains a version and echoed that behind the file path. In JS we can't do exactly the same as we can not echo inline. So I made a snippet that's using the same workflow of only changing 1 variable for all CSS and JS files. You only need to alter the value of `pushVersion` and it will refresh all CSS files with `?v=pushVersion` in the file path. For JS files you need to `addScript` it on the bottom of the snippet to make it a dynamically loaded script with a version attached.

```js
let pushVersion = "1.0.1d"
let baseUrl = window.location.href

Array.from(document.getElementsByTagName("link")).forEach((childLink) => { 
	const newHref = childLink.href.replaceAll('?v=pushVersion', `?v=${pushVersion}`)
	childLink.setAttribute('href', newHref)
})
const addScript = document.createElement("script")
addScript.setAttribute("src", `${baseUrl}/script.js?v=${pushVersion}`)
addScript.setAttribute("type", "text/javascript")
document.head.appendChild(addScript)
```
