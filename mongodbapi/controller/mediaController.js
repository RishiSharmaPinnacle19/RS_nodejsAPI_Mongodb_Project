const Media = require('../model/media');  // Assuming you have a Mongoose model

// Post media
exports.createMedia = async (req, res) => {  
  const { mobile_number, phone_number_id, media_id, filename } = req.body;
  const mediaData = { 
    mobile_number,
    phone_number_id,
    media_id,
    filename
  };

  try {
    const result = await Media.create(mediaData);
    res.status(201).send({ message: 'Media entry created successfully', data: result });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get media by mobile_number
exports.getMediaByMobileNumber = async (req, res) => {  
  const { mobile_number } = req.params;

  try {
    if(!mobile_number){
        return res.status(400).send({message: 'mobile no is required'});
    }
    // const result = await Media.findOne
    const result = await Media.find({ mobile_number });
    if (result.length === 0) return res.status(404).send({ message: 'No entry found' });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update media by mobile_number
exports.updateMediaByMobileNumber = async (req, res) => {
  const { mobile_number, media_id, filename } = req.body;

  const mediaData = { media_id, filename };

  try {
    // Check if a document with the same media_id already exists
    const existingMedia = await Media.findOne({ media_id });
    if (existingMedia) {
      return res.status(400).send({ message: 'Duplicate media_id found' });
    }

    const result = await Media.updateOne({ mobile_number }, { $set: mediaData });

    if (result.nModified === 0) {
      return res.status(404).send({ message: 'No entry found to update' });
    }

    res.status(200).send({ message: 'Media entry updated successfully' });
  } catch (err) {
    console.error(err); // Log the error to see what's causing it
    res.status(500).send({ message: 'An error occurred while updating media', error: err });
  }
};


// Delete media by media_id
exports.deleteMediaByMediaId = async (req, res) => {
  const { media_id } = req.params;

  try {
    const result = await Media.deleteOne({ media_id });
    if (result.deletedCount === 0) return res.status(404).send({ message: 'No entry found to delete' });
    res.status(200).send({ message: 'Media entry deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
};


// Auto Reload MongoDB Query - Get all media
// exports.getAllMedia = async (req, res) => {
//   try {
//     const results = await Media.find();
//     res.status(200).json(results);
//   } catch (err) {
//     console.error('Error fetching media data:', err);
//     res.status(500).send(err);
//   }
// };
