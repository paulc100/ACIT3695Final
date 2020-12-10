import { Comments } from "./data/comments.js";
import { Posts } from "./data/posts.js";
import { Users } from "./data/users.js";

export const resolvers = {
  Query: {
    getAllPosts () {
      return Posts
    },
    getAllUsers () {
      return Users
    },
    getAllComments () {
      return Comments
    },

    getPostById(parent, args, context, info) { 
      return Posts.find(post => post.id === args.id);
    },
    getPostByTopic(parent, args, context, info) { 
      return Posts.filter(post => post.topic === args.topic);
    },

  },

  Mutation: {
    createPost: async (_, { user, topic, body}, { pubsub }) => {
      const id = Math.random().toString(36).substring(2, 8);
      const post = {
        user: user,
        topic: topic,
        id: id,
        body: body,
        comments: []
      }
      Posts.push(post)
      return post;
    },

    comment: async (_, { user, message, postid }, { pubsub }) => {
      const id = Math.random().toString(36).substring(2, 8);
      const comment = {
        user: user,
        id: id,
        responses: [],
        message: message,
        post: postid
      }
      Comments.push(comment)
      const findpost = Posts.find(post => post.id == postid)
      findpost.comments.push(message)

      pubsub.publish("Subscription", { subscribe: findpost });
      return comment
    },
    respond: async (_, { commentid, message }) => {

      const findcomment = Comments.find(comment => comment.id == commentid)
      findcomment.responses.push(message)
      return findcomment
    },
  },
  Subscription: {
    subscribe: {
      subscribe: (_, __, {pubsub}) => pubsub.asyncIterator("Subscription")
    }
  },
};

