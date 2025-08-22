const fs = require('fs');
const path = require('path');

// Files to process
const files = [
  'app/locations/page.tsx',
  'app/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace &apos; with ' in JavaScript contexts (not in JSX text)
  // This targets &apos; that appears in JavaScript string literals and function calls
  content = content.replace(/\(&apos;([^&]*?)&apos;\)/g, "('$1')");
  content = content.replace(/\(&apos;([^&]*?)&apos;/g, "('$1'");
  content = content.replace(/&apos;([^&]*?)&apos;\)/g, "'$1')");
  content = content.replace(/=== &apos;([^&]*?)&apos;/g, "=== '$1'");
  content = content.replace(/!== &apos;([^&]*?)&apos;/g, "!== '$1'");
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${file}`);
});

console.log('\nDone! Now run: npm run build');