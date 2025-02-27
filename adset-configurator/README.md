rm -rf dist node_modules package-lock.json                        
npm install
npm run build && npm run dev


rm -rf node_modules/.cache
rm -rf dist
npx tsc --build --clean