const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    story: { type: Schema.Types.ObjectId, ref: 'Story' },
    content: String,
    created_at: { type: Date, default: Date.now },
  });

  const Comment = model('Comment', commentSchema);

module.export = Comment; 