# Express Blog App

This is a simple blogging web application built using Express.js and MongoDB. It allows users to create, view, and read blog posts.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Technologies Used](#technologies-used)

## Features

- **Home Page:** Displays a list of all blog posts with their titles and a preview of content.
- **Individual Post Pages:** Clicking on a post title takes you to a dedicated page for that post where you can read the entire content.
- **Compose:** Users can create new blog posts using a simple form.
- **About Page:** Provides information about the website.
- **Contact Page:** Displays contact information for users who want to get in touch.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/express-blog-app.git
   cd express-blog-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB database:

   - Create a `.env` file in the root directory and add your MongoDB connection URL as `DB_URL`:

     ```env
     DB_URL=mongodb://yourusername:yourpassword@localhost:27017/postDB
     ```

4. Start the server:

   ```bash
   node app.js
   ```

The app should now be running at `http://localhost:3000`.

## Usage

Visit `http://localhost:3000` in your browser to access the blog app. You can navigate through the different pages using the links in the navigation bar.

To create a new blog post, go to the "Compose" page and fill out the title and content of the post.

## Routes

- `/`: The home page that lists all the available blog posts.
- `/about`: Displays information about the website.
- `/contact`: Provides contact information.
- `/compose`: Allows users to create new blog posts.
- `/:param`: Dynamic route that displays an individual blog post based on the provided parameter (post title).

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- EJS (Embedded JavaScript) for templates


Happy blogging!
