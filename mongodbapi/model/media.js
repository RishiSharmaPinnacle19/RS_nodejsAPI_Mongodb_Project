
const mongoose = require('mongoose');

// Define the schema for media data
const mediaSchema = new mongoose.Schema({
  mobile_number: { type: String, required: true },
  phone_number_id: { type: String, required: true },
  media_id: { type: String, required: true, unique: true },
  filename: { type: String, required: true }
},
{
  timestamps: true // This adds createdAt and updatedAt fields
});

// Create the Media model from the schema
const Media = mongoose.model('media', mediaSchema);

// Model methods
const mediaModel = {
  // Create media
  create: (mediaData, callback) => {
    Media.create(mediaData, callback);
  },

  // Find media by mobile number
  findByMobileNumber: (mobile_number, callback) => {
    Media.find({ mobile_number }, callback);
  },

  // Update media by mobile number
  updateByMobileNumber: (mediaData, callback) => {
    Media.updateOne(
      { mobile_number: mediaData.mobile_number }, // Filter by mobile_number
      { $set: { media_id: mediaData.media_id, filename: mediaData.filename } }, // Fields to update
      callback
    );
  },

  // Delete media by media_id
  deleteByMediaId: (media_id, callback) => {
    Media.deleteOne({ media_id }, callback);
  }
};

module.exports = Media;

