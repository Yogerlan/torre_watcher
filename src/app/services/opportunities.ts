import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

export enum Languages {
  EN = 'en',
  ES = 'es',
}

export interface QueryParams {
  currency?: string
  periodicity?: string
  lang?: Languages
  size?: number
  after?: string
  before?: string
  aggregate?: boolean
  contextFeature?: string
}

export const defaultParams: QueryParams = {
  currency: 'USD',
  periodicity: 'hourly',
  lang: Languages.EN,
  size: 20,
  after: undefined,
  before: undefined,
  aggregate: true,
  contextFeature: 'job_feed'
}

export interface RequestBody {
  and?: object[]
}

export const defaultBody: RequestBody = {
  and: [
    {
      boosted: 'popularity'
    },
    {
      status: {
        code: 'open'
      }
    }
  ]
}

interface Pagination {
  next: string | null
  previous: string | null
}

export interface SearchResponse {
  aggregators: any[]
  offset: number
  pagination: Pagination
  results: any[]
}

@Injectable({
  providedIn: 'root',
})
export class OpportunitiesService {
  private baseUrl = 'https://search.torre.co/opportunities'
  constructor(private http: HttpClient) { }

  private buildQueryParams(queryParams: QueryParams): HttpParams {
    let params = new HttpParams()

    if (queryParams.currency) {
      params = params.set('currency', queryParams.currency)
    }

    if (queryParams.periodicity) {
      params = params.set('periodicity', queryParams.periodicity)
    }

    if (queryParams.lang) {
      params = params.set('lang', queryParams.lang)
    }

    if (queryParams.size !== undefined) {
      params = params.set('size', queryParams.size.toString())
    }
    if (queryParams.after) {
      params = params.set('after', queryParams.after)
    }

    if (queryParams.before) {
      params = params.set('before', queryParams.before)
    }

    if (queryParams.aggregate !== undefined) {
      params = params.set('aggregate', queryParams.aggregate.toString())
    }

    if (queryParams.contextFeature) {
      params = params.set('contextFeature', queryParams.contextFeature)
    }

    return params
  }

  async search(
    queryParams: QueryParams = defaultParams,
    requestBody: RequestBody = defaultBody
  ): Promise<SearchResponse | null> {
    console.log('Searching with params:', queryParams)
    console.log('Searching with body:', requestBody)

    const url = `${this.baseUrl}/_search`
    const params = this.buildQueryParams(queryParams)
    const body = requestBody

    return new Promise(resolve => {
      this.http.post<SearchResponse>(url, body, { params }).subscribe({
        next: (response: SearchResponse) => {
          console.log('Search response:', response)

          resolve(response)
        },
        error: (error) => {
          console.error('Search error:', error)

          resolve(null)
        }
      })
    })
  }
}
