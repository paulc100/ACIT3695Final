# 1. Initial Instructions

* Open command prompt and run:

npm install
node index

# 2. Mutations 

Run in order and ensure to use the correct ID's

* Create a post:

mutation {
  createPost(user: "Paul", topic: "Tech", body: "Test Tech Post") {
    user
    topic
    id
    body
    comments
  }
}

* Subscribe to the post:

subscription {
  subscribe {
    user
    id
    comments
  }
}

* Comment on a post. Use the ID provided when running the createPost mutation ("id"):

mutation {
  comment(user: "Paul", postid: "ID HERE", message: "Eval Comment 1") {
    user
    message
    id
    responses
  }
}

At this point you should be able to see the post appear again on your subscription tab on GraphQL due to you posting a comment.

* Repond to a comment. Use the ID provided when running the comment mutation ("id"):

mutation {
  respond(message: "Eval Response", commentid: "ID HERE") {
    user
    message
    responses
  }
}

# 3. Basic Queries

* List of posts by topic:

query {
  getPostByTopic(topic: "Tech") {
    user
    topic
    id
    body
    comments
  }
}

* Get an individual post by ID:

query {
  getPostById(id: "ID HERE") {
    user
    topic
    id
    body
    comments
  }
}