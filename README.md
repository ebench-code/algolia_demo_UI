How to setup and run the UI Demo app using the sample payload json file


Step 1
Configure initial index using this project: 
```sh
npm init
npm install algoliasearch --save
```
Step 2
pull https://github.com/ebench-code/productos_indexer
in your code editor update the following:
const index = client.initIndex('products-import'); // use a name that you wish for your index. Recommend 'products-import' as this is used in the UI Demo code.
update the APP ID and ADMIN KEY using your own APP ID and ADMIN KEY. You can set this at the shell in your .env file. Use the same names as are shown in index.js
Step 3
Run index.js
```sh
node index.js
```
Step 4: Initialize and prepare your environment
Create a folder on your OS. Navigate to that folder and init your application:
```sh
npm init
```
```sh
npx create-instantsearch-app@latest Product-demo-app \
  --template "InstantSearch.js" \
  --app-id "B1G2GM9NG0" \
  --api-key "aadef574be1f9252bb48d4ea09b5cfe5" \
  --index-name demo_ecommerce \
  --attributes-to-display name \
  --attributes-for-faceting ''
```
Step 5: Pull the source code, make any updates and start the app

Change directories to the app just installed

Pull the code from this repo:https://github.com/ebench-code/algolia_demo_UI

Update APP ID, ADMIN KEY, and validate the search index to be used

start the app:

```sh
npm start

Open http://localhost:3000 to see your app.
