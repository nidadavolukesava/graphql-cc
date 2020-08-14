const axios = require('axios');

// * Importing environment variable
require('dotenv').config();

let PROTOCOL;
let URL;
if (process.env.NODE_ENV === 'development') {
  PROTOCOL = process.env.DEV_MOCK_SERVICE__PROTOCOL;
  URL = process.env.DEV_MOCK_SERVICE;
}
if (process.env.NODE_ENV === 'test') {
  PROTOCOL = process.env.TEST_MOCK_SERVICE__PROTOCOL;
  URL = process.env.TEST_MOCK_SERVICE;
}
if (process.env.NODE_ENV === 'production') {
  PROTOCOL = process.env.PROD_MOCK_SERVICE__PROTOCOL;
  URL = process.env.PROD_MOCK_SERVICE;
}

module.exports = {
  // * GET ALL USERS
  users: () => {
    return axios.get(`${PROTOCOL}://${URL}/users`).then((res) => res.data);
  },
  // * GET single USER based on USER ID
  user: (args) => {
    return axios
      .get(`${PROTOCOL}://${URL}/users/` + args.id)
      .then((res) => res.data);
  },
  // * GET ALL POSTS
  posts: () => {
    return axios.get(`${PROTOCOL}://${URL}/posts`).then((res) => res.data);
  },
  // * GET single POST based on POST ID
  post: (args) => {
    return axios
      .get(`${PROTOCOL}://${URL}/posts/` + args.id)
      .then((res) => res.data);
  },
  // * GET all POSTS of a USER based on USER ID
  userPosts: (args) => {
    return axios
      .get(`${PROTOCOL}://${URL}/posts?userId=` + args.userId)
      .then((res) => res.data);
  },
  // * GET all COMMENTS of all POSTS
  comments: () => {
    return axios.get(`${PROTOCOL}://${URL}/comments`).then((res) => res.data);
  },
  // * GET COMMENTS from comment ID
  comment: (args) => {
    return axios
      .get(`${PROTOCOL}://${URL}/comments/` + args.id)
      .then((res) => res.data);
  },
  // * GET COMMENTS from POST ID
  postComments: (args) => {
    return axios
      .get(`${PROTOCOL}://${URL}/comments?postId=` + args.postId)
      .then((res) => res.data);
  },
  updatePost: (args) => {
    return axios
      .patch(`${PROTOCOL}://${URL}/posts/` + args.id, {
        title: args.title,
        body: args.body,
      })
      .then((res) => res.data);
  },
  deletePost: (args) => {
    return axios
      .delete(`${PROTOCOL}://${URL}/posts/` + args.id)
      .then(() => 'deleted');
  },
};
