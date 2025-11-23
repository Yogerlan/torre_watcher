import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { defaultJobsBody, defaultJobsParams, JobsQueryParams, JobsRequestBody, JobsSearchResponse } from '../schemas/JobsSchemas'

@Injectable({
  providedIn: 'root',
})
export class JobsService {
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
  ): Promise<JobsSearchResponse | null> {
    console.log('Searching with params:', queryParams)
    console.log('Searching with body:', requestBody)

    const url = `${environment.jobsUrl}/_search`
    const params = this.buildQueryParams(queryParams)
    const body = requestBody

    return new Promise(resolve => {
      this.http.post<JobsSearchResponse>(url, body, { params }).subscribe({
        next: (response: JobsSearchResponse) => {
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
