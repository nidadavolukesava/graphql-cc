const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type User {
            id: Int!
            name: String!
            username: String
            email:  String
            phone: String
            website: String
            address: UserAddress
        }
        
        type UserAddress {
            street: String
            suite: String
            city: String
            zipcode: String
        }
        
        type Post {
            id: Int
            user: User
            title:  String
            body: String
            comments: [Comment]
        }
        
        type Comment {
            id: Int 
            post: Post 
            name: String
            email: String 
            body: String
        }


        type RootQuery {
            users: [User]!
            user(id: Int): User!
            posts: [Post]!
            post(id: Int): Post!
            comments: [Comment]!
            comment(id: Int): Comment!
            postComments(postId: Int): [Comment]!
            userPosts(userId : Int):[Post]!
        }
        type RootMutation {
            updatePost(id: Int, title: String, body: String): Post!
            deletePost(id: Int): String!
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);
