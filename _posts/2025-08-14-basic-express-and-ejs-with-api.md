---
title: Basic Express and EJS with API
description: |
  Kickstart your Node.js applications with a solid foundation that combines simplicity, performance, and security. This starter project comes preconfigured with Express for efficient server-side development, EJS for clean and dynamic templating, Helmet to strengthen HTTP headers and protect against common vulnerabilities, and express-rate-limit to guard against brute-force attacks and excessive requests. Whether you’re building a personal side project or a production-ready service, this setup saves you time by handling essential configurations out of the box. It’s lightweight, easy to understand, and ready to be extended so you can focus on creating features instead of reinventing the basics.
  <br/>
  <button class="blueButton" onclick="window.open('https://codump.github.io/demo/basic-express-ejs-with-api/')">Demo</button> <button class="greenButton" onclick="window.open('https://github.com/codump/basic-express-ejs-with-api/')">See code</button>
  <br/><br/>
image:
  path: "https://raw.githubusercontent.com/codump/basic-express-ejs-with-api/refs/heads/main/public/images/preview.gif"
  lqip: "data:image/webp;base64,UklGRk..."
  
author: kip
date: 25-08-14 14:44:00 +0200
categories: [Coding, Script]
tags: [Express, EJS, Node.js, helmet, JWT, Security, JavaScript]
pin: false
full_text: false
---

Kickstart your Node.js applications with a solid foundation that combines simplicity, performance, and security. This starter project comes preconfigured with Express for efficient server-side development, EJS for clean and dynamic templating, Helmet to strengthen HTTP headers and protect against common vulnerabilities, and express-rate-limit to guard against brute-force attacks and excessive requests. Whether you’re building a personal side project or a production-ready service, this setup saves you time by handling essential configurations out of the box. It’s lightweight, easy to understand, and ready to be extended so you can focus on creating features instead of reinventing the basics.

<button class="blueButton" onclick="window.open('https://codump.github.io/demo/basic-express-ejs-with-api/')">Demo</button> <button class="greenButton" onclick="window.open('https://github.com/codump/basic-express-ejs-with-api/')">See code</button>
<br/><br/>

## Getting Started

1. Rename `empty-config.json` to `config.json` and fill in your settings.
2. Install dependencies:  
   `npm install`
3. Start the server:  
   `npm start`

---

## Core Dependencies

- [express](https://www.npmjs.com/package/express) – Web framework for Node.js  
- [ejs](https://www.npmjs.com/package/ejs) – View template engine  
- [helmet](https://www.npmjs.com/package/helmet) – Adds security headers  
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) – Controls request rate  
- [express-xss-sanitizer](https://www.npmjs.com/package/express-xss-sanitizer) – Prevents XSS attacks  
- [express-validator](https://www.npmjs.com/package/express-validator) – Validates incoming data  
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) – Create and verify JWTs  
- [express-jwt](https://www.npmjs.com/package/express-jwt) – JWT authentication middleware  

> **Note:** Only the **Deluxe version** is available for now.

---

## Deluxe Extras

- [@codump/conlog](https://www.npmjs.com/package/@codump/conlog) – Console management
- [markdown-it](https://www.npmjs.com/package/markdown-it) – Markdown parsing  
- [highlight.js](https://www.npmjs.com/package/highlight.js) – Syntax highlighting  

---

## Emulated Data Mode

When enabled in `config.json` ("emulateData": true), the app serves JSON-based mock data when API responses are empty. This is useful for development when the live feed is unavailable.

⚠ **Caution:** Misconfiguration can overwrite live data.

---

## Specific parts of the code
### Helmet
This part can be tricky for beginners. Even if your code is correct, it may fail because the browser blocks connections to unlisted sources. To fix this, add the required source URLs to the configuration shown below. [`Reference`][1]
```javascript
// Security headers, blocks all content thats not from the server itself or listed sites
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': "'self'",
        'script-src': "'self'",
        'connect-src': ["'self'"],
        'style-src': ["'self'", "fonts.googleapis.com", "fonts.gstatic.com", "cdnjs.cloudflare.com"],
        'img-src': [
          "'self'",
          'data:',
          "github.githubassets.com"
        ],
        'frame-src': ["'self'"],
        'worker-src': ["'none'"],
      },
    },
  }),
);
// Security headers
```
{: file="index.js" }

### express-rate-limit
To adjust the rate limit or time window, modify the configuration below. You can also create a separate `const limiterExtraSecure` with stricter settings for sensitive API endpoints where you want to further limit requests. [`Reference`][2]
```js
// Rate limiter
const limiterDefault = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8:   combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more  aggressive
})
// Rate limiter
```
{: file="index.js" }

[1]: https://helmetjs.github.io/#reference
[2]: https://express-rate-limit.mintlify.app/reference/configuration
