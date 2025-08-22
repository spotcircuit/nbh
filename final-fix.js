const fs = require('fs');
const path = require('path');

// Files to process
const filesToFix = {
  'app/page.tsx': [
    { find: /<Link`}>/g, replace: '<Link href={`/locations/${state.id}`}>' },
    { find: /<Link`}>/g, replace: '<Link href={`/providers/${provider.id}`}>' }
  ],
  'app/contact/page.tsx': [
    { find: /<a`}/g, replace: '<a href={`tel:${SITE_CONFIG.phone.replace(/\\D/g, \'\')}`}' },
    { find: /<a`}/g, replace: '<a href={`mailto:${SITE_CONFIG.email}`}' },
    { find: /leftIcon={<Phone className="w-4 h-4" \/>}`}/g, replace: 'leftIcon={<Phone className="w-4 h-4" />}' }
  ],
  'app/providers/page.tsx': [
    { find: /<Link`}>/g, replace: '<Link href={`/providers/${provider.id}`}>' },
    { find: /href="\/contact"$/gm, replace: '' }
  ],
  'app/locations/page.tsx': [
    { find: /<Link`}>/g, replace: '<Link href={`/locations/${state.id}`}>' }
  ],
  'app/locations/[state]/page.tsx': [
    { find: /<Link`}>/g, replace: '<Link href={`/providers/${provider.id}`}>' }
  ],
  'components/layout/Navigation.tsx': [
    { find: /key={state.id}`}/g, replace: 'key={state.id}\n                                href={`/locations/${state.id}`}' },
    { find: /key={item.name}$/gm, replace: 'key={item.name}\n                    href={item.href}' }
  ]
};

Object.entries(filesToFix).forEach(([file, replacements]) => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Apply specific replacements for each file
  replacements.forEach(({ find, replace }) => {
    if (find instanceof RegExp) {
      content = content.replace(find, replace);
    } else {
      content = content.split(find).join(replace);
    }
  });
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed: ${file}`);
});

console.log('All files have been fixed!');