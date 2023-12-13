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
      type: Schema.Types.ObjectId,
      ref: 'Contribution',
    },
  ],
  author: { 
    type: Schema.Types.ObjectId, 
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
