const mongoose = require('mongoose');

const ItemReportSchema = new mongoose.Schema({
  type: { type: String, enum: ['lost','found'], required: true },
  title: { type: String, required: true },
  description: String,
  images: [String], // store Cloudinary URLs
  category: String,
  location: String,
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['open','claimed','returned','removed'], default: 'open' },
  matchedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemReport', default: null }
}, { timestamps: true });

module.exports = mongoose.model('ItemReport', ItemReportSchema);
