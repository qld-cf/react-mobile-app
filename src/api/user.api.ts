import axios from 'axios'
export default class UserAPI {
  static async userLogin (name: string) {
    const url = window.ENV.CLOUD_SERVICE + 'mock/2c38f4a45210618d00d1b64b8b31a377/user/login'
    const params = {
      p: {
        name
      }
    }
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(e => {
        resolve(e.data)
      }).catch(e => {
        console.error(e)
        reject(e)
      })
    })
  }
}
