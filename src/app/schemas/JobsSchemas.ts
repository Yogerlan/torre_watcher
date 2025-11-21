export interface JobsQueryParams {
  currency?: string
  periodicity?: string
  lang?: string
  size?: number
  after?: string
  before?: string
  aggregate?: boolean
  contextFeature?: string
}

export const defaultJobsParams: JobsQueryParams = {
  currency: 'USD',
  periodicity: 'hourly',
  lang: 'en',
  size: 20,
  aggregate: true,
  contextFeature: 'job_feed'
}

export interface JobsFilter {
  boosted?: string
  status?: { code: string }
}

export interface JobsRequestBody {
  and?: JobsFilter[]
}

export const defaultJobsBody: JobsRequestBody = {
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

export interface JobsSkill {
  total: number
  value: string
}

export interface JobsAggregators {
  compensationrange?: object[]
  language?: object[]
  location?: object[]
  organization?: object[]
  remote?: object[]
  skill?: JobsSkill[]
  status?: object[]
  type?: object[]
}

export interface JobsPagination {
  next: string | null
  previous: string | null
}

export interface JobsSearchResponse {
  aggregators: JobsAggregators
  offset: number
  pagination: JobsPagination
  results: object[]
  size: number
  total: number
}
