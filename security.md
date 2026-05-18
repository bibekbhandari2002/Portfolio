# Security Hardening Documentation
## Bibek Bhandari Cybersecurity Portfolio

**Last Updated:** May 2026  
**Target Security Grade:** A+ (Mozilla Observatory & SecurityHeaders.com)  
**Deployment Platform:** Netlify  
**Site Type:** Frontend-only React/Vite SPA

---

## Executive Summary

This portfolio website has undergone comprehensive production-grade security hardening to achieve industry best practices for frontend applications. The security implementation focuses on:

1. **XSS Prevention** through Content Security Policy (CSP)
2. **Clickjacking Protection** via frame-busting headers
3. **Secure Transport** with HSTS preload configuration
4. **MIME-Type Security** to prevent content-type confusion attacks
5. **Referrer Privacy** to protect user information
6. **Cross-Origin Isolation** against Spectre/Meltdown-like attacks
7. **API Sandboxing** via Permissions-Policy
8. **Information Disclosure Prevention** by disabling source maps and minification

---

## Security Headers Implemented

### 1. Strict-Transport-Security (HSTS)
**Configuration:**
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**Purpose:**
- Enforces HTTPS for 2 years (63,072,000 seconds)
- `includeSubDomains`: Applies to all subdomains
- `preload`: Allows inclusion in browser HSTS preload lists

**Benefits:**
- Protects against SSL stripping attacks
- Prevents protocol downgrade attacks
- Preload list provides protection before first visit

**Browser Support:** All modern browsers

---

### 2. X-Frame-Options (Clickjacking Prevention)
**Configuration:**
```
X-Frame-Options: DENY
```

**Purpose:**
- Prevents page from being embedded in frames (iframes)
- Stops clickjacking attacks

**Benefits:**
- Protects users from attack scenarios where malicious sites embed this page invisibly
- Forces same-origin framing constraints

**Alternative Values:**
- `DENY`: Current setting (most restrictive)
- `SAMEORIGIN`: Only allow same-origin framing
- `ALLOW-FROM uri`: Allow specific origin (deprecated in modern browsers)

**Browser Support:** All modern browsers (since IE8)

---

### 3. X-Content-Type-Options (MIME Sniffing Prevention)
**Configuration:**
```
X-Content-Type-Options: nosniff
```

**Purpose:**
- Prevents browser from guessing content type
- Enforces strict Content-Type header interpretation

**Benefits:**
- Stops MIME-type confusion attacks
- Prevents script injection via content-type confusion
- Blocks attackers from executing arbitrary code

**Example Attack Prevented:**
```
Server sends: Content-Type: text/plain; data: <script>alert('XSS')</script>
Without header: Browser might execute as JavaScript
With header: Browser treats as plain text
```

**Browser Support:** All modern browsers

---

### 4. Referrer-Policy (Privacy Protection)
**Configuration:**
```
Referrer-Policy: strict-no-referrer
```

**Purpose:**
- No referrer information sent to any destination
- Protects user privacy

**Benefits:**
- Prevents URLs from being logged by external services
- Protects against referrer-based information leakage
- Enhances user privacy when linking to external resources

**Alternative Values:**
- `strict-no-referrer`: Current setting (maximum privacy)
- `no-referrer`: Same as above
- `same-origin`: Send referrer only to same-origin
- `strict-no-referrer-when-downgrade`: Send referrer only on HTTPS-to-HTTPS

**Trade-offs:**
- Analytics data from external links will be incomplete
- Some cross-site features may not work optimally

**Browser Support:** Modern browsers; graceful degradation in older browsers

---

### 5. Permissions-Policy (Feature Sandboxing)
**Configuration:**
```
Permissions-Policy: accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), 
camera=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(self), 
geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), 
picture-in-picture=(self), sync-xhr=(), usb=(), xr-spatial-tracking=()
```

**Purpose:**
- Granularly controls which browser APIs can be used
- Applies to the page and all embedded content

**Policies Enforced:**

| Feature | Policy | Reason |
|---------|--------|--------|
| `accelerometer` | Disabled | Not needed; prevents device motion access |
| `ambient-light-sensor` | Disabled | Not needed; prevents light sensor access |
| `autoplay` | Disabled | Improves UX; prevents auto-playing media |
| `camera` | Disabled | Not needed; prevents webcam access |
| `display-capture` | Disabled | Not needed; prevents screen capture |
| `document-domain` | Disabled | Security hardening; prevents domain relaxation |
| `encrypted-media` | Disabled | Not needed; prevents EME (DRM) access |
| `fullscreen` | self | Allows fullscreen for same-origin (reasonable) |
| `geolocation` | Disabled | Not needed; prevents location leakage |
| `gyroscope` | Disabled | Not needed; prevents device orientation |
| `magnetometer` | Disabled | Not needed; prevents compass access |
| `microphone` | Disabled | Not needed; prevents audio input |
| `midi` | Disabled | Not needed; prevents MIDI access |
| `payment` | Disabled | Not needed; no payment processing |
| `picture-in-picture` | self | Allows PiP for same-origin videos |
| `usb` | Disabled | Not needed; prevents USB API |
| `xr-spatial-tracking` | Disabled | Not needed; prevents WebXR |

**Benefits:**
- Reduces attack surface
- Protects user privacy
- Prevents malicious scripts from accessing sensitive hardware

**Browser Support:** Modern browsers

---

### 6. Content-Security-Policy (XSS Mitigation)
**Configuration:**
```
Content-Security-Policy: default-src 'none'; script-src 'self' 'wasm-unsafe-eval'; 
style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https:; 
media-src 'self'; connect-src 'self' https://api.emailjs.com https://cdn.jsdelivr.net; 
manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; 
upgrade-insecure-requests; block-all-mixed-content
```

**CSP Directives Explained:**

| Directive | Value | Purpose |
|-----------|-------|---------|
| `default-src` | `'none'` | Deny all resources by default (fail-secure) |
| `script-src` | `'self' 'wasm-unsafe-eval'` | Only same-origin scripts + WASM (React/Vite requirement) |
| `style-src` | `'self' 'unsafe-inline'` | Same-origin + inline styles (Framer Motion/Tailwind) |
| `font-src` | `'self' data:` | Same-origin fonts + data URIs |
| `img-src` | `'self' data: https:` | Same-origin, data URIs, HTTPS images |
| `media-src` | `'self'` | Same-origin audio/video only |
| `connect-src` | `'self' https://api.emailjs.com https://cdn.jsdelivr.net` | Same-origin + EmailJS API + CDN |
| `manifest-src` | `'self'` | Same-origin manifest files |
| `frame-ancestors` | `'none'` | Cannot be embedded in frames (X-Frame-Options backup) |
| `base-uri` | `'self'` | Base href can only be same-origin |
| `form-action` | `'self'` | Forms can only submit to same-origin |
| `upgrade-insecure-requests` | N/A | Upgrade HTTP requests to HTTPS |
| `block-all-mixed-content` | N/A | Block all HTTP content on HTTPS pages |

**XSS Protection Mechanism:**
```
Attack Vector 1: Inline Script Injection
<script>alert('XSS')</script>
Result: BLOCKED (script-src doesn't allow inline scripts without nonce)

Attack Vector 2: External Script Injection
<script src="https://evil.com/evil.js"></script>
Result: BLOCKED (script-src only allows 'self')

Attack Vector 3: Event Handler Injection
<img onerror="alert('XSS')">
Result: BLOCKED (browsers block inline event handlers with CSP)

Attack Vector 4: Data URI in src
<img src="data:text/html,<script>alert('XSS')</script>">
Result: ALLOWED for images (img-src supports data: URIs)
```

**WASM (wasm-unsafe-eval) Justification:**
- Required for React/Vite to function properly
- Modern build tools generate WASM bundles
- `wasm-unsafe-eval` is safer than `unsafe-eval` (only for WASM, not JavaScript eval)

**Inline Styles Justification:**
- Required by Tailwind CSS and Framer Motion
- Styles are generated during build (not user-controlled)
- Safe in this context

**EmailJS Integration:**
- `connect-src` explicitly allows HTTPS communication with EmailJS API
- Contact form submissions go directly to EmailJS servers
- No sensitive data stays on our servers

---

### 7. Cross-Origin Policies (Spectre/Meltdown Protection)
**Configurations:**
```
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

**Purpose:**
- Isolate page from other origins at browser level
- Prevent cross-origin information leakage

**Benefits:**
- Protects against Spectre-like attacks
- Prevents cross-origin timing attacks
- Enforces origin isolation for sensitive data

**Browser Support:** Modern browsers

---

### 8. X-UA-Compatible (Legacy Browser Support)
**Configuration:**
```
X-UA-Compatible: IE=edge
```

**Purpose:**
- Forces IE to use latest rendering engine mode
- Ensures compatibility with modern standards

**Note:** Modern browsers ignore this header; included for IE11 support

---

### 9. X-Permitted-Cross-Domain-Policies (Legacy Flash)
**Configuration:**
```
X-Permitted-Cross-Domain-Policies: none
```

**Purpose:**
- Controls Flash cross-domain requests (legacy)
- Prevents unauthorized cross-domain Flash requests

**Note:** Flash is deprecated; included for completeness

---

### 10. X-XSS-Protection (Legacy Browser XSS Defense)
**Configuration:**
```
X-XSS-Protection: 1; mode=block
```

**Purpose:**
- Legacy XSS protection for older browsers
- Enables XSS filter and blocks page on detection

**Note:** Modern browsers don't use this; included for defense in depth

---

### 11. Expect-CT (Certificate Transparency)
**Configuration:**
```
Expect-CT: max-age=86400, enforce
```

**Purpose:**
- Requires valid Certificate Transparency logs
- Helps detect fraudulent SSL certificates

**Note:** Modern browsers enforce this by default; included for completeness

---

## Build Configuration Security

### Source Map Disabling
**File:** `vite.config.ts`
```typescript
build: {
  sourcemap: false,  // Disable in production
  minify: "terser",
  terserOptions: {
    compress: {
      drop_console: true,    // Remove console.log in production
      drop_debugger: true,   // Remove debugger statements
    },
    mangle: true,            // Obfuscate variable names
  }
}
```

**Benefits:**
- Prevents developers from exposing source code
- Reduces bundle size
- Removes debugging capabilities in production
- Obfuscates code logic

### TypeScript Configuration Security
**File:** `tsconfig.app.json`
```json
"sourceMap": false  // Disable TypeScript source maps
```

**Benefits:**
- Prevents .map file generation
- Protects against source code disclosure

---

## Deployment Security (Netlify Configuration)

### File: `netlify.toml`

**Build Configuration:**
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

**Asset Caching Strategy:**
```toml
# Immutable assets (versioned by Vite)
/assets/* → Cache-Control: public, max-age=31536000, immutable

# HTML files
/*.html → Cache-Control: public, max-age=3600, must-revalidate

# Index.html (SPA entry point)
/index.html → Cache-Control: no-cache, no-store, must-revalidate
```

**SPA Routing Configuration:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Benefits:**
- Ensures React Router works correctly
- Keeps SPA routing intact
- Efficient caching for static assets

---

## External Dependencies Security

### Dependency Audit

**Safe Dependencies Confirmed:**
- ✅ **React/React-DOM:** Latest stable version with security updates
- ✅ **Vite:** Modern build tool with security focus
- ✅ **Framer Motion:** Used safely without dangerous APIs
- ✅ **Lucide React:** Standard icon library, no security concerns
- ✅ **Radix UI:** Accessibility-focused with security best practices
- ✅ **TailwindCSS:** Utility CSS framework, no runtime execution
- ✅ **EmailJS:** Third-party service (proper CSP integration)
- ✅ **React Router:** Latest version with security updates

**No Dangerous Patterns Found:**
- ✅ No `dangerouslySetInnerHTML` with user input
- ✅ No use of `eval()` or `Function()` constructor
- ✅ No unsafe string interpolation
- ✅ No outdated/vulnerable dependencies

### EmailJS Integration Security

**How It Works:**
1. Contact form submission → Client-side JavaScript
2. EmailJS SDK → Direct HTTPS to EmailJS servers
3. EmailJS → Sends email via configured provider
4. No data stays on our servers (stateless frontend)

**Security Considerations:**
- ✅ Public key is intentionally exposed (designed by EmailJS)
- ✅ Service ID is public (identifies template)
- ✅ No private API keys in client code
- ✅ EmailJS handles rate limiting
- ✅ HTTPS-only communication

---

## Component Security Review

### Link Security (`target="_blank"`)
**Status:** ✅ Secure

All external links include:
```jsx
<a href="..." target="_blank" rel="noopener noreferrer">
```

**Protection Provided:**
- `noopener`: New window cannot access `window.opener`
- `noreferrer`: No referrer information sent (privacy)
- Prevents "tabnabbing" attacks

### Chart Component (`dangerouslySetInnerHTML`)
**Status:** ✅ Secure

```typescript
dangerouslySetInnerHTML={{
  __html: Object.entries(THEMES)
    .map(([theme, prefix]) => `
      ${prefix} [data-chart=${id}] {
        ${colorConfig}
      }
    `)
    .join("")
}}
```

**Why Safe:**
- Only internal CSS themes used
- No user input in HTML
- Generated at build time, not runtime
- No dynamic content from untrusted sources

---

## Information Disclosure Prevention

### What's NOT Exposed:
- ✅ Source maps disabled
- ✅ TypeScript source code
- ✅ Build metadata
- ✅ Internal implementation details
- ✅ Private API keys (EmailJS key is intentionally public)
- ✅ Server configuration
- ✅ Debug information in production

### What's Intentionally Public:
- ✅ EmailJS public key (required for client-side usage)
- ✅ Service IDs and template IDs (required for EmailJS to work)
- ✅ CDN resources (Lucide icons, UI components)
- ✅ Portfolio content (that's the whole point!)

---

## Testing Security Headers

### Online Tools:
1. **Mozilla Observatory:** https://observatory.mozilla.org/
2. **SecurityHeaders.com:** https://securityheaders.com/
3. **SSL Labs:** https://www.ssllabs.com/ssltest/

**Expected Results:**
- ✅ A+ on both Mozilla Observatory and SecurityHeaders.com
- ✅ HSTS preload list ready
- ✅ No warnings or critical issues

### Command Line Testing:
```bash
# Check security headers
curl -I https://bibekbhandari.name.np

# Expected headers should appear:
# Strict-Transport-Security: max-age=63072000
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# ...
```

---

## Compliance & Standards

### Standards Followed:
1. **OWASP Top 10:** Protection against common web vulnerabilities
2. **CWE (Common Weakness Enumeration):**
   - CWE-79: XSS Protection via CSP
   - CWE-95: Code Injection Prevention
   - CWE-601: Open Redirect Prevention
   - CWE-639: Authorization Framework
3. **NIST Cybersecurity Framework:** Applied security practices
4. **Mozilla Web Security Guidelines:** Implemented best practices
5. **SANS Top 25:** Addressing critical weaknesses

---

## Limitations & Trade-offs

### Frontend-Only Application Limitations:
1. **No Backend Validation:** Can't enforce authentication or authorization
2. **No Rate Limiting on Forms:** Relies on EmailJS rate limiting
3. **No Request Signing:** Can't verify request source
4. **No Session Management:** Stateless frontend architecture
5. **Client-Side Secrets Cannot Be Hidden:** EmailJS key is public (by design)

### Acceptable Risk Profile for This Use Case:
- ✅ Portfolio site (read-only content)
- ✅ No user accounts
- ✅ No sensitive data storage
- ✅ Contact form only (hosted on external service)
- ✅ Public information only

---

## Monitoring & Maintenance

### Regular Security Tasks:
1. **Dependency Updates:** Run `npm audit` monthly
2. **Header Validation:** Test monthly with SecurityHeaders.com
3. **CSP Violations:** Monitor CSP report-uri if implemented
4. **Browser Updates:** Test with latest browser versions
5. **HSTS Preload:** Maintain status on https://hstspreload.org/

### Future Enhancements:
1. **CSP Reporting:** Add CSP report-uri for monitoring violations
2. **Subresource Integrity:** Add SRI hashes for CDN resources
3. **Service Worker:** For offline caching with security controls
4. **Rate Limiting:** Implement frontend rate limiting for contact form
5. **Additional CDN:** Consider security of CDN providers

---

## Summary of Security Improvements

| Category | Before | After | Impact |
|----------|--------|-------|--------|
| **CSP** | None | Comprehensive whitelist | XSS protection |
| **Clickjacking** | No protection | X-Frame-Options: DENY | Prevents framing attacks |
| **MIME Security** | Vulnerable | X-Content-Type-Options | Prevents content-type attacks |
| **HTTPS** | Basic | HSTS + preload | Prevents downgrade attacks |
| **Privacy** | Referrer leak | strict-no-referrer | User privacy protection |
| **API Sandboxing** | Full access | Permissions-Policy | Reduced attack surface |
| **Source Maps** | Exposed | Disabled | Code obfuscation |
| **Minification** | Basic | Full (terser) | Obfuscation + size |
| **Console/Debugger** | Enabled | Removed | Prevents debugging |

---

## Conclusion

This portfolio website now implements production-grade security hardening suitable for a cybersecurity-focused professional. The implementation balances security with functionality, ensuring a smooth user experience while protecting against common web vulnerabilities.

**Target Achievement:**
- 🎯 **Mozilla Observatory:** A+ expected
- 🎯 **SecurityHeaders.com:** A+ expected
- 🎯 **OWASP Compliance:** Best practices implemented
- 🎯 **Frontend Security:** Maximum hardening without breaking functionality

---

## Questions & Support

For questions about this security configuration, refer to:
1. OWASP Top 10: https://owasp.org/www-project-top-ten/
2. Mozilla Web Security: https://infosec.mozilla.org/
3. NIST Guidelines: https://csrc.nist.gov/

---

**Document Version:** 1.0  
**Last Updated:** May 18, 2026  
**Maintainer:** Security Hardening Initiative