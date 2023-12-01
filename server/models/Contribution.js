const { Schema, model } = require('mongoose');

const contributionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    story: { type: Schema.Types.ObjectId, ref: 'Story' },
    content: String,
    created_at: { type: Date, default: Date.now },
  });

  const Contribution = model('Contribution', contributionSchema);

module.export = Contribution; 