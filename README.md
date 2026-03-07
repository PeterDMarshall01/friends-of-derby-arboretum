# Friends of Derby Arboretum — Website

## Files included
- `index.html`       — Home page
- `history.html`     — History of the Arboretum (with timeline)
- `events.html`      — Upcoming and past events (with photo galleries)
- `loudon-lodge.html`— Loudon Lodge venue hire (Google Form placeholder)
- `news.html`        — News and meeting updates
- `about.html`       — About the Friends group
- `contact.html`     — Contact page with enquiry form
- `style.css`        — All shared styles
- `main.js`          — Shared JavaScript

## Replacing placeholder content
Search each file for comments like "Replace with your own..." or placeholder text in italics.

## Deploying for free with GitHub Pages
1. Create a free account at https://github.com
2. Create a new repository called `friends-of-derby-arboretum`
3. Upload all these files to the repository
4. Go to Settings → Pages → Source: Deploy from branch (main)
5. Your site will be live at: https://yourusername.github.io/friends-of-derby-arboretum

## Embedding your Google Form (Loudon Lodge page)
1. Go to https://forms.google.com
2. Create your enquiry form
3. Click Send → embed icon (<>) → copy the iframe
4. In loudon-lodge.html, replace the `<div class="google-form-embed">` block with your iframe

## Adding your own photos
Replace the `src="https://images.unsplash.com/..."` URLs in each HTML file with paths
to your own photos. Place your photos in a folder called `images/` alongside the HTML files.
Example: `src="images/arboretum-spring.jpg"`

## Connecting the contact form
The contact form currently shows a success message without sending anything.
To make it send real emails, sign up for https://formspree.io (free tier available)
and update the form's action attribute.
