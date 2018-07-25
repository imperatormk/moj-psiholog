import http from '@/services/http'

export default function () {
  return {
    getBlogs() {
      return http.api.get(`blogs`)
        .then((resp) => {
          return resp.data
        })
    },
    getBlog(blogId) {
      return http.api.get(`blogs/${blogId}`)
        .then((resp) => {
          return resp.data
        })
    },
    postBlog(blog, userId) { // haha
      const blogObj = {
        blog,
        userId
      }
      return http.api.post('blogs', blogObj)
        .then((resp) => {
          return resp.data
        })
    }
  }
}