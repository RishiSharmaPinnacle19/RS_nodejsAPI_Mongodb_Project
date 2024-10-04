
+++++++++++++++++++++++++++ Introduction ++++++++++++++++++++++++++++++
This project is a **Node.js**-based web application that interacts with a **MongoDB** database to perform CRUD (Create, Read, Update, Delete) operations on media entries. The media data consists of fields such as `mobile_number`, `phone_number_id`, `media_id`, and `filename`. The application uses **Express** as its web framework to handle incoming HTTP requests and **Mongoose** to define models and schemas for MongoDB.

### Key Components:
1. **Express.js**: A minimal and flexible web application framework used to build the API endpoints.
2. **MongoDB and Mongoose**: MongoDB is the NoSQL database used to store media data, and Mongoose is an ODM (Object Data Modeling) library that provides a schema-based solution to model your data.
3. **Routing and Controllers**: The application follows an MVC (Model-View-Controller) pattern, where routes are defined to handle incoming API requests, and controllers handle the logic for interacting with the database.

### Features:
- **Create**: Add a new media entry to the database.
- **Read**: Retrieve media data based on the mobile number.
- **Update**: Modify an existing media entry by mobile number.
- **Delete**: Remove a media entry by media ID.

This architecture allows for easy data manipulation and provides a clear separation of concerns, making the application scalable and maintainable.


+++++++++++++++++++++++++++ APPICATION and HOW TO USED ++++++++++++++++++++++++++++++

To use this **Node.js** application that interacts with MongoDB to manage media entries, follow these steps. You'll set up the application, connect it to MongoDB, and test its CRUD functionalities via HTTP requests.

### **Prerequisites**
- **Node.js** and **npm** installed on your machine.
- **MongoDB** installed locally or hosted remotely.
- A tool to make API requests (e.g., **Postman** or **curl**).

### **1. Install Dependencies**
First, clone the application repository or copy the project files to your local machine. Then, navigate to the project folder and install the required Node.js dependencies by running:

```bash
npm install
```

This installs packages like **express** and **mongoose** (as defined in `package.json`).

### **2. Set Up MongoDB**
You need a MongoDB instance running locally or in the cloud. You can either:
- Install MongoDB locally, which usually listens on `mongodb://127.0.0.1:27017/` by default.
- Use a cloud-hosted MongoDB instance like **MongoDB Atlas**.

In this example, MongoDB is expected to run at `mongodb://127.0.0.1:27017/media`. If you're using another instance, update the connection string in `index.js` or `db.js`.

### **3. Start MongoDB (if local)**
If MongoDB is installed locally, make sure the MongoDB server is running:

```bash
mongod --dbpath /path/to/your/database
```

### **4. Run the Node.js Application**
Now that MongoDB is running, you can start the Node.js application:

```bash
node index.js
```

You should see a confirmation that the server is running and MongoDB is connected:

```
mongodb is connected.........
Server running on port 5002
```

### **5. Test the API Endpoints**
You can interact with the API through tools like **Postman** or **curl** by sending HTTP requests to the appropriate routes. Here's how to use each of the CRUD operations:

#### **a. Create a Media Entry**
**Endpoint**: `POST /media`  
**Description**: Create a new media entry.  
**Request Body**:
```json
{
  "mobile_number": "1234567890",
  "phone_number_id": "ABC123",
  "media_id": "media123",
  "filename": "file.png"
}
```

**Example (with curl)**:
```bash
curl -X POST http://localhost:5002/media \
-H "Content-Type: application/json" \
-d '{"mobile_number": "1234567890", "phone_number_id": "ABC123", "media_id": "media123", "filename": "file.png"}'
```

#### **b. Get Media by Mobile Number**
**Endpoint**: `GET /media/:mobile_number`  
**Description**: Retrieve a media entry by mobile number.

**Example (with curl)**:
```bash
curl http://localhost:5002/media/1234567890
```

#### **c. Update Media Entry**
**Endpoint**: `PUT /media/:mobile_number`  
**Description**: Update a media entry's `media_id` and `filename` based on the mobile number.  
**Request Body**:
```json
{
  "media_id": "updated_media_id",
  "filename": "updated_file.png"
}
```

**Example (with curl)**:
```bash
curl -X PUT http://localhost:5002/media/1234567890 \
-H "Content-Type: application/json" \
-d '{"media_id": "updated_media_id", "filename": "updated_file.png"}'
```

#### **d. Delete Media by Media ID**
**Endpoint**: `DELETE /media/:media_id`  
**Description**: Delete a media entry by `media_id`.

**Example (with curl)**:
```bash
curl -X DELETE http://localhost:5002/media/media123
```

### **6. Confirm Database Changes**
You can verify that the operations are successfully modifying the MongoDB database. Use a MongoDB client such as **MongoDB Compass** or **the MongoDB shell** to inspect the `media` collection.

### **7. Stop the Application**
Once you're done testing, stop the Node.js application by using `Ctrl + C` in your terminal.

---







+++++++++++++++++++++++++++ Explain In Detail ++++++++++++++++++++++++++++++




This project uses **Node.js** and **MongoDB** to create, read, update, and delete (CRUD) media entries using **Express** as the web framework and **Mongoose** for MongoDB database interaction.

### 1. **`index.js` (Main Application Entry Point)**
   - **Purpose**: It initializes the Express app, sets up middleware, connects to MongoDB, and configures the routes.
   
   ```js
   const express = require('express');
   const mongoose = require('mongoose');
   const mediaRoutes = require('./routes/mediaRoutes');
   const app = express();
   
   // Middleware to parse JSON
   app.use(express.json());
   
   // MongoDB connection
   mongoose.connect('mongodb://127.0.0.1:27017/media')
   .then(() => {
       console.log('mongodb is connected.........');
   });
   
   // Use media routes
   app.use('/', mediaRoutes);
   
   // Start the server
   const PORT = 5002;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   ```

   **Key Points**:
   - **Express** is initialized, and the app listens on port `5002`.
   - **`express.json()` middleware**: This is used to automatically parse incoming request bodies as JSON.
   - The MongoDB connection is established using Mongoose, connecting to the database named `media` at `mongodb://127.0.0.1:27017/media`.
   - **Routes**: The app uses the media routes defined in the `mediaRoutes` file for handling requests.

### 2. **`model.js` (Media Model and Mongoose Methods)**
   - **Purpose**: Defines the Mongoose schema and model for the media collection. It also contains methods for creating, reading, updating, and deleting media entries.
   
   ```js
   const mongoose = require('mongoose');
   
   // Define the schema for media data
   const mediaSchema = new mongoose.Schema({
     mobile_number: { type: String, required: true },
     phone_number_id: { type: String, required: true },
     media_id: { type: String, required: true, unique: true },
     filename: { type: String, required: true }
   },
   {
     timestamps: true // Adds createdAt and updatedAt fields
   });
   
   // Create the Media model from the schema
   const Media = mongoose.model('media', mediaSchema);
   ```

   **Key Points**:
   - **Schema**: The schema defines the structure of media documents, with fields like `mobile_number`, `phone_number_id`, `media_id`, and `filename`.
   - **Unique media_id**: The `media_id` is unique, meaning MongoDB will ensure no two media documents share the same media_id.
   - **Timestamps**: Adding the `{ timestamps: true }` option creates `createdAt` and `updatedAt` fields automatically.

   The model exposes CRUD methods:
   ```js
   const mediaModel = {
     create: (mediaData, callback) => Media.create(mediaData, callback),
     findByMobileNumber: (mobile_number, callback) => Media.find({ mobile_number }, callback),
     updateByMobileNumber: (mediaData, callback) => Media.updateOne(
       { mobile_number: mediaData.mobile_number }, 
       { $set: { media_id: mediaData.media_id, filename: mediaData.filename } }, 
       callback
     ),
     deleteByMediaId: (media_id, callback) => Media.deleteOne({ media_id }, callback)
   };
   ```

   **Key Points**:
   - **Create**: Inserts a new media entry.
   - **FindByMobileNumber**: Fetches media entries by `mobile_number`.
   - **UpdateByMobileNumber**: Updates a media entry's `media_id` and `filename` by `mobile_number`.
   - **DeleteByMediaId**: Deletes a media entry by `media_id`.

### 3. **`router.js` (Route Definitions)**
   - **Purpose**: Defines routes for handling API requests.
   
   ```js
   const express = require('express');
   const router = express.Router();
   const mediaController = require('../controller/mediaController');
   
   // Create a new media entry
   router.post('/media', mediaController.createMedia);
   
   // Get media entry by mobile number
   router.get('/media/:mobile_number', mediaController.getMediaByMobileNumber);
   
   // Update media entry by mobile number
   router.put('/media/:mobile_number', mediaController.updateMediaByMobileNumber);
   
   // Delete media entry by media ID
   router.delete('/media/:media_id', mediaController.deleteMediaByMediaId);
   
   module.exports = router;
   ```

   **Key Points**:
   - Defines routes for each of the CRUD operations:
     - **POST `/media`**: To create a new media entry.
     - **GET `/media/:mobile_number`**: To fetch a media entry by `mobile_number`.
     - **PUT `/media/:mobile_number`**: To update a media entry based on `mobile_number`.
     - **DELETE `/media/:media_id`**: To delete a media entry by `media_id`.

### 4. **`controller.js` (Business Logic for Routes)**
   - **Purpose**: Contains the logic for handling API requests and interacting with the Mongoose model.
   
   ```js
   const Media = require('../model/media');
   
   // Create media
   exports.createMedia = async (req, res) => {
     const { mobile_number, phone_number_id, media_id, filename } = req.body;
     const mediaData = { mobile_number, phone_number_id, media_id, filename };
   
     try {
       const result = await Media.create(mediaData);
       res.status(201).send({ message: 'Media entry created successfully', data: result });
     } catch (err) {
       res.status(500).send(err);
     }
   };
   ```

   **Key Points**:
   - **`createMedia`**: Accepts a request with `mobile_number`, `phone_number_id`, `media_id`, and `filename`, then creates a media document.
   - **`getMediaByMobileNumber`**: Fetches media entries by `mobile_number`.
   - **`updateMediaByMobileNumber`**: Updates a media document's `media_id` and `filename`. It checks for duplicate `media_id` before updating.
   - **`deleteMediaByMediaId`**: Deletes a media document by `media_id`.

### 5. **`db.js` (MongoDB Configuration)**
   - This file is meant to store the MongoDB connection string, allowing for centralized configuration.
   
   ```js
   module.exports = {
     url: "mongodb://127.0.0.1:27017/media"
   };
   ```

   **Key Points**:
   - Contains the connection URL for the MongoDB database. It's used in `index.js` for establishing the connection.

---

### **Overall Workflow**:
1. **Creating a media entry**: A client sends a `POST` request to `/media` with the required data, and the `createMedia` controller creates a new entry.
2. **Fetching media by mobile number**: A `GET` request to `/media/:mobile_number` fetches media documents based on the provided `mobile_number`.
3. **Updating media**: A `PUT` request to `/media/:mobile_number` updates the media entry, ensuring no duplicate `media_id` exists.
4. **Deleting media**: A `DELETE` request to `/media/:media_id` removes a media entry based on `media_id`.

The project uses **Mongoose** for database interaction and **Express** to handle API routing. This setup allows you to perform basic CRUD operations on the media collection.
