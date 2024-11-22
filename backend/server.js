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

app.get('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10); // Get the id from the URL and parse it as an integer
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading database' });
    }
    try {
      const db = JSON.parse(data); // Parse the JSON file
      const todo = db.todos.find((t) => t.id === todoId); // Find the todo with the matching id
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' }); // Return 404 if not found
      }
      res.json(todo); // Send the found todo as the response
    } catch (parseError) {
      res.status(500).json({ message: 'Error parsing database' });
    }
  });
});

// Add other routes or custom logic here as needed
// For example, if you want a POST route to modify data:
app.post('/todos', express.json(), (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading database' });
    }
    try {
      const db = JSON.parse(data); // Parse the JSON data
      const newTodo = {
        id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1, // Increment ID
        ...req.body,
      };

      db.todos.push(newTodo); // Push the new todo to the todos array

      // Save updated data back to db.json
      fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8', (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ message: 'Error writing to database' });
        }
        res.status(201).json(newTodo); // Respond with the new todo
      });
    } catch (parseError) {
      res.status(500).json({ message: 'Error parsing database' });
    }
  });
});

// Set your desired port
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
