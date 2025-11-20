import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

export interface QueryParams {
  currency?: string
  periodicity?: string
  lang?: string
  size?: number
  after?: string
  before?: string
  aggregate?: boolean
  contextFeature?: string
}

export const defaultParams: QueryParams = {
  currency: 'USD',
  periodicity: 'hourly',
  lang: 'en',
  size: 20,
  aggregate: true,
  contextFeature: 'job_feed'
}

export interface OpportunityFilter {
  boosted?: string
  status?: { code: string }
}
export interface RequestBody {
  and?: OpportunityFilter[]
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

export interface Aggregators {
  compensationrange?: object[]
  language?: object[]
  location?: object[]
  organization?: object[]
  remote?: object[]
  skills?: object[]
  status?: object[]
  type?: object[]
}

export interface Pagination {
  next: string | null
  previous: string | null
}

export interface SearchResponse {
  aggregators: Aggregators
  offset: number
  pagination: Pagination
  results: object[]
  size: number
  total: number
}

@Injectable({
  providedIn: 'root',
})
export class OpportunitiesService {
  private baseUrl = 'https://search.torre.co/opportunities'
  constructor(private http: HttpClient) { }

  private buildQueryParams(queryParams: QueryParams): HttpParams {
    let params = new HttpParams()

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params = params.set(key, value.toString())
      }
    })

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
