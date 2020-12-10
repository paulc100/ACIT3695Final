import aserver from "apollo-server";

const { gql } = aserver;

export const typeDefs = gql`
  type Query {
    getAllPosts: [Posts]
    getAllComments: [Comments]
    getAllUsers: [Users]
    getPostById(id: ID!): Posts
    getPostByTopic(topic: String!): [Posts]
  }
  type Mutation {
    createPost(user: String!, topic: String!, body: String!, comments: [String]): Posts!
    comment(user: String!, message: String!, postid: ID!): Comments!
    respond(commentid: ID!, message: String!): Comments!
    subscribeToId(postid: ID!): Posts
  }

  type Users {
    id: ID!
    name: String!
  }
  type Posts {
    id: ID!
    user: String!
    topic: String!
    body: String!
    comments: [String!]
  }
  type Comments {
    id: ID!
    user: String!
    message: String!
    responses: [String!]
    post: String!
  }
  type Subscription {
    subscribe: Posts!
  }
`;

// type Mutation {
//   updateNote(id: String!, title: String!, description: String!) {
//     id
//     title
//     description
//   }
// }