// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Use body-parser to parse incoming data
app.use(bodyParser.json());

// Create a new comment
app.post('/comments', (req, res) => {
  // Get the new comment data
  const newComment = req.body;
  // Read the comments file
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    // Parse the comments data
    const comments = JSON.parse(data);
    // Add the new comment to the comments array
    comments.push(newComment);
    // Write the updated comments array back to the file
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      // Send a response back to the client
      res.json(newComment);
    });
  });
});

// Get all comments
app.get('/comments', (req, res) => {
  // Read the comments file
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    // Parse the comments data
    const comments = JSON.parse(data);
    // Send the comments array back to the client
    res.json(comments);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Path: comments.json
// Create a new file called comments.json with an empty array
[]

// Path: index.html
<!DOCTYPE html>
<html>
  <head>
    <title>Comments App</title>
  </head>
  <body>
    <h1>Comments</h1>
    <form id="comment-form">
      <input type="text" id="name" placeholder="Name" required>
      <textarea id="message" placeholder="Message" required></textarea>
      <button type="submit">Submit</button>
    </form>
    <ul id="comments-list"></ul>
    <script>
      // Get the comments list element
      const commentsList = document.getElementById('comments-list');

      // Function to fetch comments from the server
      function fetchComments() {
        fetch('/comments')
          .then(response => response.json())
          .then(comments => {
            // Clear the comments list
            commentsList.innerHTML = '';
            // Add each comment to the list
            comments