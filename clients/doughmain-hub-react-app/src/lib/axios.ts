import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import LOGGER from './logger'
import { nanoid } from 'nanoid'

type AxiosConfigWithMetadata = InternalAxiosRequestConfig & {
  metadata?: {
    axiosId: string
  }
}

const interceptRequest = (config: AxiosConfigWithMetadata) => {
  const axiosId = nanoid()

  LOGGER.debug('Outbound request:', {
    baseUrl: config.baseURL,
    method: config.method,
    data: config.data,
    params: config.params,
    url: config.url,
    headers: config.headers,
    axiosId
  })
  config.metadata = {
    axiosId: axiosId
  }

  return config
}

const interceptSuccessResponse = (response: AxiosResponse) => {
  LOGGER.debug('Outbound response success:', {
    baseUrl: response.config.baseURL,
    url: response.config.url,
    status: `${response.status}:${response.statusText}`,
    headers: response.headers,
    body: response.data,
    axiosId: (response.config as AxiosConfigWithMetadata).metadata?.axiosId
  })

  return response
}

const interceptorErrorResponse = (error: unknown) => {
  if (error instanceof Error) {
    const axiosError = error as AxiosError
    LOGGER.debug('Outbound response failure:', {
      baseUrl: axiosError?.response?.config.baseURL,
      url: axiosError?.response?.config.url,
      status: axiosError.response?.status,
      headers: axiosError.response?.headers,
      body: axiosError.response?.data,
      axiosId: (axiosError?.response?.config as AxiosConfigWithMetadata)
        .metadata?.axiosId
    })
  }
  return Promise.reject(error)
}

export const createAxiosInstance = () =>
  //baseURL: string,
  //headers: Record<string, string>
  {
    // const axiosInstance = axios.create({ baseURL: baseURL, headers })
    const axiosInstance = axios.create()

    axiosInstance.interceptors.request.use(interceptRequest)
    axiosInstance.interceptors.response.use(
      interceptSuccessResponse,
      interceptorErrorResponse
    )

    return axiosInstance
  }
