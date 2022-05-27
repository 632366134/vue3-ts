import axios, { AxiosInstance } from 'axios'
import { HYRequestConfig, HYRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
const DEFAULT_lOADING = true
class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_lOADING
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例的请求拦截成功')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据。。。',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config.data
      },
      (err) => {
        console.log('所有实例的请求拦截失败')

        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        console.log('所有实例的响应拦截成功')
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('报错')
        } else {
          return data
        }
      },
      (err) => {
        this.loading?.close()
        console.log('所有实例的响应拦截失败')
        if (err.response.status === 404) {
          console.log('错误信息')
        }
        return err
      }
    )
  }
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 2.单个请求对请求数据的处理

          if (config.interceptors?.responseInterceptor) {
            config = config.interceptors.responseInterceptor(res)
          }
          console.log(res)
          // 3重置showLoading
          this.showLoading = DEFAULT_lOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_lOADING
          reject(err)
          return err
        })
    })
  }
  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default HYRequest
