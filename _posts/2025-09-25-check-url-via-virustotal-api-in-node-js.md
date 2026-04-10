---
title: Check URL via VirusTotal API in Node.js
description: >-
  
author: kip
date: 25-09-25 02:48:00 +0200
categories: [Coding, Snippet]
tags: [Node.js, VirusTotal, API, Security, JavaScript]
pin: false
full_text: true
---

To scan URLs for bad content we can use the VirusTotal API. Bellow is a snippet that does exactly that. More info: <a href="https://docs.virustotal.com/docs/api-overview" target="_new">https://docs.virustotal.com/docs/api-overview</a>

```js

const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {

  const responseUrl = await fetch("https://www.virustotal.com/api/v3/urls", {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-apikey': 'GET AND ENTER APIKEY' //  👈 YOU SHOULD DO IT!
    },
    body: new URLSearchParams({ url: "https://dutchflightcrew.nl" })
  });
  const dataUrl = await responseUrl.json();

  const analyses = `https://www.virustotal.com/api/v3/analyses/${dataUrl.data.id}`;
  try {
    const responseAnalyses = await fetch(analyses, {
      method: "GET",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-apikey': 'GET AND ENTER APIKEY'
      }});
    if (!responseAnalyses.ok) {
      throw new Error(`Response status: ${responseAnalyses.status}`);
    }

    const result = await responseAnalyses.json();

    if(result.data.attributes.stats.malicious > 0 || result.data.attributes.stats.suspicious > 0) {
      const show = `Your link has been refused! Malicious: ${result.data.attributes.stats.malicious} Suspicious: ${result.data.attributes.stats.suspicious}`
      res.send(show)
    } else {
      res.send(`ok`)
    }
  } catch (error) {
    console.error(error.message);
    res.send(`unknown error check console`)
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
