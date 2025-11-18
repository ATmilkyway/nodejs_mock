### require("dotenv").config()

only does one thing:

- It loads the variables from your .env file into process.env.

That’s all.

- After you call .config():

- process.env.PORT becomes available

- process.env.DB_URL becomes available

- Anything in your .env becomes available in process.env


### npx nodemon ./database/db.js

```bash
Global nodemon adds itself to system PATH → use: nodemon file.js
Local nodemon stays in node_modules/.bin → use: npx nodemon file.js
Recommended: add script "dev": "nodemon file.js" in package.json
Run script: npm run dev (works for both global and local)

```