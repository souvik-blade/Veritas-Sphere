const fs = require('fs');
const path = require('path');

const routes = [
  'services',
  'apostille',
  'scholarships',
  'notice',
  'alumni',
  'about',
  'contact',
  'consultation',
  'additional-services',
  'terms',
  'flipbook'
];

const buildDir = path.join(__dirname, '../build');
const indexHtml = path.join(buildDir, 'index.html');

if (!fs.existsSync(indexHtml)) {
  console.error('Build directory or index.html not found!');
  process.exit(1);
}

routes.forEach((route) => {
  const routeDir = path.join(buildDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.copyFileSync(indexHtml, path.join(routeDir, 'index.html'));
  console.log(`[SEO Fix] Generated static route: /${route}/index.html (HTTP 200 OK)`);
});
