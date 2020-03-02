import http from '../utils/network/http'

const baseApi = '/api/content/statistics'

export default {
  statisticsWithUser: function () {
    return http.get(`${baseApi}/user`);
  }
}
