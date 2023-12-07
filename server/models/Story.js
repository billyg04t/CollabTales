const { Schema, model } = require('mongoose');

const storySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  contributions: [
    {
      type: String,
      ref: 'Contribution',
    },
  ],
  
  author: { 
    type: String, 
    required: true,
    ref: 'User' 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
});

const Story = model('Story', storySchema);

module.exports = Story;
