export interface JobsQueryParams {
  currency?: string;
  periodicity?: string;
  lang?: string;
  size?: number;
  after?: string;
  before?: string;
  aggregate?: boolean;
  contextFeature?: string;
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

export interface JobSkill {
  total: number
  value: string
}

export interface JobAggregators {
  compensationrange?: object[]
  language?: object[]
  location?: object[]
  organization?: object[]
  remote?: object[]
  skills?: JobSkill[]
  status?: object[]
  type?: object[]
}

export interface JobPagination {
  next: string | null
  previous: string | null
}

export interface JobSearchResponse {
  aggregators: JobAggregators
  offset: number
  pagination: JobPagination
  results: object[]
  size: number
  total: number
}
