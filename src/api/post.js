import http from '../utils/network/http'

const baseApi = '/api/content/posts'

export default {
  posts: function (data) {
    return http.get(`${baseApi}`, data);
  },
  info: function (id) {
    return http.get(`${baseApi}/${id}`)
  },
  search: function (data) {
    return http.post(`${baseApi}/search`,data)
  }
}
