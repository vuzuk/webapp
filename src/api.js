import axios from 'axios';

const DOMAIN = process.env.DOMAIN;

export function fetchPost(bloggerName, slug) {  
  return axios.get(`http://${DOMAIN}/api/unsecure/getBlog/${bloggerName}/${slug}`);
}