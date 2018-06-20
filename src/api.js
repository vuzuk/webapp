import axios from 'axios';

const DOMAIN = process.env.DOMAIN;

export function fetchPost(bloggerName, slug) {  
  return axios.get(`http://${DOMAIN}/api/unsecure/getBlog/${bloggerName}/${slug}`);
}

export function getBlogsByCategory(id, offset, limit) {
  return axios.get(`http://${DOMAIN}/api/unsecure/getBlogsByCategory/${id}/${offset}/${limit}`);
}

export function getBlogger(username) {
  return axios.get(`http://${DOMAIN}/api/unsecure/getBlogger/${username}`)
}

export function getPostsByTag(tag) {
  return axios.get(`http://${DOMAIN}/api/unsecure/getBlogsByTag/${tag}`)
}

export function getPostsByQuery(query) {
  query = query.replace(/-/g,'%')
  return axios.get(`http://${DOMAIN}/api/unsecure/searchBlogs/0/10?title=${query}`)
}

export function getHomepage() {
  return axios.all([
    axios.get(`http://${DOMAIN}/api/unsecure/getTrendingBlogs/0/5`), //get trending tags
    axios.get(`http://${DOMAIN}/api/unsecure/getLatestBlogs/0/5`)
  ])
   .then(axios.spread((tags, post) => {
     return new Promise((res, rej) => {
       res({
         data: {
           msg: {
            tags: tags.data.msg,
            post: post.data.msg
          }
         }
       })
     })
   }))
   .catch(err => console.log(err))
}