const mongoose = require('mongoose');
const PostSchema = require('./post_schema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters'
    },
    required: [true, 'Name is required']
  },
  posts: [PostSchema], //just wanna look at subdocs
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  //using funcion so we have access to this (specific user)
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
