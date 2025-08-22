const fs = require('fs');
const path = require('path');

// Files to process
const files = [
  'app/contact/page.tsx',
  'app/faq/page.tsx',
  'app/locations/page.tsx',
  'app/locations/[state]/page.tsx',
  'app/page.tsx',
  'app/resources/page.tsx',
  'app/services/page.tsx'
];

let totalFixes = 0;

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace all common contractions with escaped versions
  // Look for patterns like word're, word's, word't, word'll, word've
  content = content.replace(/(\w+)'re/g, '$1&apos;re');
  content = content.replace(/(\w+)'s/g, '$1&apos;s');
  content = content.replace(/(\w+)n't/g, '$1n&apos;t');
  content = content.replace(/(\w+)'ll/g, '$1&apos;ll');
  content = content.replace(/(\w+)'ve/g, '$1&apos;ve');
  content = content.replace(/(\w+)'d/g, '$1&apos;d');
  
  // Handle standalone apostrophes
  content = content.replace(/([^&])'/g, '$1&apos;');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed apostrophes in: ${file}`);
    totalFixes++;
  }
});

console.log(`\nTotal files fixed: ${totalFixes}`);