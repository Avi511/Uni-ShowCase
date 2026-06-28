const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

// Prevent duplicate likes from the same user on the same project
likeSchema.index({ projectId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);
