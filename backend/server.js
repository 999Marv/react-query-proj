const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Set the path to your "db.json" file
const dbPath = path.join(__dirname, 'db.json');

app.use(cors());

// Middleware to simulate a delay
app.use((req, res, next) => {
  setTimeout(next, 500); // Simulate a 500ms delay for each request
});

// Serve the db.json content on routes
app.get('/todos', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading database' });
    }
    try {
      const db = JSON.parse(data);
      res.json(db.todos); // Send only the todos array
    } catch (parseError) {
      res.status(500).json({ message: 'Error parsing database' });
    }
  });
});

// Add other routes or custom logic here as needed
// For example, if you want a POST route to modify data:
app.post('/data', express.json(), (req, res) => {
  // Read current db.json
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading database' });
    }
    const db = JSON.parse(data);

    // Example of modifying the data
    db.items.push(req.body); // Assuming your db has an "items" array

    // Save updated data back to db.json
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing to database' });
      }
      res.status(201).json(db); // Send back updated data
    });
  });
});

// Set your desired port
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
