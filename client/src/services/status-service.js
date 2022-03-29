import $api from '../http/index'

export default class StatusService {
  static getStatus() {
    return $api.get('/status')
  }
}
