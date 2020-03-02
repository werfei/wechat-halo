import http from '../utils/network/http'

const baseApi = '/api/content/tags'

export default {
  tags: function () {
    return http.get(`${baseApi}`);
  },
  posts: function (slugName) {
    return http.get(`${baseApi}/${slugName}/posts`);
  }
}
