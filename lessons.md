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

### schema validation

```
isbn: {
      type: String,
      match: [/^(?:\d{9}[\dXx]|\d{13})$/, "Invalid ISBN format"],
      validate: {
        validator: function (v) {
          return !v || v.length === 10 || v.length === 13;
        },
        message: "ISBN must be 10 or 13 characters",
      },
      trim: true,
    },
```

### Operation `books.find()` buffering timed out after 10000ms

- db connection error

### In JavaScript, Object.keys() is a built-in method that returns an array of a given object’s own enumerable property names (keys).

```bash
const person = {
  name: "Alice",
  age: 30,
  city: "London"
};

const keys = Object.keys(person);
console.log(keys); // ["name", "age", "city"]

```

- Mongoose strict mode (default: true) ignores fields not defined in the schema.
- Extra fields sent by clients won’t be saved to MongoDB.
- strict: false allows saving extra fields; strict: "throw" raises an error.
- Validation applies only to defined schema fields, ensuring structured data.
