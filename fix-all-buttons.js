const fs = require('fs');
const path = require('path');

// Files to process
const files = [
  'app/page.tsx',
  'app/contact/page.tsx', 
  'app/providers/page.tsx',
  'app/locations/page.tsx',
  'app/locations/[state]/page.tsx',
  'components/layout/Navigation.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove href, target, rel attributes from Button components
  // These were left behind after removing as="a"
  content = content.replace(/(\s+)href={[^}]+}/g, '');
  content = content.replace(/(\s+)target="[^"]+"/g, '');
  content = content.replace(/(\s+)rel="[^"]+"/g, '');
  
  // Clean up extra whitespace
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed: ${file}`);
});

console.log('All button components have been fixed!');