import axios from 'axios';

const addr = process.env.NODE_ENV == 'production' ? 'http://13.209.70.185' : 'http://localhost'
let port='3001';


export const writeComment = ({text, userId, postId}) => axios.post(`${addr}:${port}/api/comment`, {text, userId, postId});


// comment.post('/', commentCtrl.writeComment);
// comment.get('/:commentId', commentCtrl.findByCommentId);