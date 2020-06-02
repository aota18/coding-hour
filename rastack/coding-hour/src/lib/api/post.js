import axios from 'axios';

const addr = process.env.NODE_ENV == 'production' ? 'http://13.209.70.185' : 'http://localhost'
let port='3001';

export const createPost = ({userId, classId, title, type, body}) => axios.post(`${addr}:${port}/api/post`, {userId, classId, title, type, body});
export const getPostByClassId = (classId) => axios.get(`${addr}:${port}/api/class/${classId}/post`);
export const getPostByPostId = (postId) => axios.get(`${addr}:${port}/api/post/` + postId);


// 2. getPostByClassId
// clazz.get('/:classId/post', classCtrl.findPost);

//3. getPostByPostID
// post.get('/:postId', postCtrl.findByPostId);