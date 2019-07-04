import axios from 'axios'

let ax = axios.create({
  baseURL: 'http://18.136.126.87',
  timeout: 10000
})
export default ax