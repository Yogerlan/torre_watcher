import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { defaultJobsBody, defaultJobsParams, JobSearchResponse, JobsQueryParams, JobsRequestBody } from '../schemas/JobsSchemas'

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  private baseUrl = 'https://search.torre.co/opportunities'
  constructor(private http: HttpClient) { }

  private buildQueryParams(queryParams: JobsQueryParams): HttpParams {
    let params = new HttpParams()

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        params = params.set(key, value.toString())
      }
    })

    return params
  }

  async search(
    queryParams: JobsQueryParams = defaultJobsParams,
    requestBody: JobsRequestBody = defaultJobsBody
  ): Promise<JobSearchResponse | null> {
    console.log('Searching with params:', queryParams)
    console.log('Searching with body:', requestBody)

    const url = `${this.baseUrl}/_search`
    const params = this.buildQueryParams(queryParams)
    const body = requestBody

    return new Promise(resolve => {
      this.http.post<JobSearchResponse>(url, body, { params }).subscribe({
        next: (response: JobSearchResponse) => {
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
