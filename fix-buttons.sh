#!/bin/bash

# Fix all Button components that use as="a"
# Remove the as="a" prop from all Button components

echo "Fixing Button components..."

# List of files to fix
files=(
  "app/page.tsx"
  "app/contact/page.tsx"
  "app/providers/page.tsx"
  "app/locations/page.tsx"
  "app/locations/[state]/page.tsx"
  "components/layout/Navigation.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Processing $file..."
    # Remove as="a" from Button components
    sed -i 's/as="a"//g' "$file"
  fi
done

echo "Done! All Button components fixed."