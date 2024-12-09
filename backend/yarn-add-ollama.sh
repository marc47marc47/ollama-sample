
yarn init -y
grep  -q "type.*module" package.json
if [ $? -ne 0 ]; then
   sed -i '4i\  "type": "module",' .\package.json
   sed -i 's/index.js/server.js/g' .\package.json
fi
yarn install express cors ollama marked
npm install -g http-server
