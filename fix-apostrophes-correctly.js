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
  
  // First, restore any broken imports/code
  content = content.replace(/&apos;/g, "'");
  
  // Now only fix apostrophes inside JSX text content
  // This regex looks for text between > and < tags
  content = content.replace(/>([^<]*)</g, (match, text) => {
    // Replace apostrophes only in the text content
    let fixedText = text;
    fixedText = fixedText.replace(/'/g, '&apos;');
    return `>${fixedText}<`;
  });
  
  // Also fix apostrophes in JSX attributes that are strings
  content = content.replace(/="([^"]*)"/g, (match, text) => {
    if (text.includes("'")) {
      let fixedText = text.replace(/'/g, '&apos;');
      return `="${fixedText}"`;
    }
    return match;
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${file}`);
  totalFixes++;
});

console.log(`\nTotal files fixed: ${totalFixes}`);