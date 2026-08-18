const http = require('http');

const urls = [
  'http://localhost:8080/',
  'http://localhost:8080/index.html',
  'http://localhost:8080/sentence-case.html',
  'http://localhost:8080/title-case.html',
  'http://localhost:8080/upper-lower-case.html',
  'http://localhost:8080/developer-cases.html',
  'http://localhost:8080/text-analyzer.html',
  'http://localhost:8080/word-counter.html',
  'http://localhost:8080/diff-checker.html',
  'http://localhost:8080/lorem-ipsum.html',
  'http://localhost:8080/markdown-html.html',
  'http://localhost:8080/ciphers-encoders.html',
  'http://localhost:8080/stylized-fancy-text.html',
  'http://localhost:8080/text-cleaner-sorter.html',
  'http://localhost:8080/faq.html',
  'http://localhost:8080/privacy-policy.html',
  'http://localhost:8080/terms.html',
  'http://localhost:8080/sitemap.xml'
];

async function check() {
  console.log('--- Checking Localhost English Endpoints ---');
  for (const url of urls) {
    await new Promise((resolve) => {
      http.get(url, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          console.log(`[STATUS ${res.statusCode}] ${url.padEnd(48)} | Size: ${body.length}b`);
          resolve();
        });
      }).on('error', (err) => {
        console.error(`[ERROR] ${url}: ${err.message}`);
        resolve();
      });
    });
  }
  console.log('--- Verification Complete ---');
}

check();
