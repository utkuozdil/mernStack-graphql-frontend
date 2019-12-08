export const fetchSinglePostQuery = `
query fetchSinglePost($id: ID!){
  post(id: $id) {
    title
    content
    imageUrl
    creator {
      name
    }
    createdAt
  }
}
`;

export const fetchStatusQuery = `
{
  user {
    status
  }
}
`;

export const loadPostsQuery = `
query loadPosts($page: Int) {
  posts(page: $page) {
    posts {
      _id
      title
      content
      imageUrl
      creator {
        name
      }
      createdAt
    }
    totalPosts
  }
}
`;

export const updateStatusQuery = `
mutation updateStatus($status: String!){
  updateStatus(status: $status) {
    status
  }
}
`;

export const createPostQuery = `
mutation createPost($title: String!, $content: String!, $imageUrl: String!){
    createPost(postInput: {title: $title, content: $content, imageUrl: $imageUrl}) {  
        _id
        title
        content
        imageUrl
        creator {
            name
        }
        createdAt
    }
}
`;

export const updatePostQuery = `
mutation updatePost($id: ID!, $title: String!, $content: String!, $imageUrl: String!){
    updatePost(id: $id, postInput: {title: $title, content: $content, imageUrl: $imageUrl}) {        
        _id
        title
        content
        imageUrl
        creator {
            name
        }
        createdAt
    }
}
`;

export const deletePostQuery = `
mutation deletePost($id: ID!) {
  deletePost(id: $id)
}
`;

export const loginQuery = `
query login($email: String!, $password: String!){
    login(email: $email, password: $password) {
        token
        userId
    }
}
`;

export const signupQuery = `
mutation createUser($email: String!, $name: String!, $password: String!){
  createUser(userInput: {email: $email, name: $name, password: $password}) {
    _id
    email
  }
}
`;
