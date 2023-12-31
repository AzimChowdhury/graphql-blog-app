export const typeDefs = `#graphql
    type Query {
        me:User
        users:[User]
        posts: [Post]
        profile(userId:ID):Profile
    }


    type Mutation {
        signup(
            name:String!,
            email:String!,
            password:String!,
            bio:String
            ): authPayload,

        signin(
            email:String!,
            password:String!,
            ): authPayload,
            
        addPost(
            title:String!
            content:String!
            ): postPayload,

        updatePost(
            postId :ID!
            title:String
            content:String
        ): postPayload
        
        deletePost(
            postId :ID!
        ): postPayload

        publishPost(
            postId :ID!
        ):postPayload

    }



    type authPayload {
    token: String
    message: String
    }

    type postPayload {
    message:String
    post:Post
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
        createdAt: String!
        published:Boolean!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        password: String!
        createdAt: String!
        posts: [Post]
    }
 

    type Profile {
        id: ID!
        bio: String!
        createdAt: String!
        user: User!
    }

    

`;
