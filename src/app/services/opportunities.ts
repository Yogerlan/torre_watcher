import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export enum Languages {
  EN = 'en',
  ES = 'es'
}

export interface QueryParams {
  currency: string;
  periodicity: string;
  lang: Languages;
  size: number;
  contextFeature: string;
}

export const defaultParams: QueryParams = {
  currency: 'USD',
  periodicity: 'hourly',
  lang: Languages.EN,
  size: 10,
  contextFeature: 'job_feed'
};

interface Pagination {
  next: string | null;
  previous: string | null;
}

export interface SearchResponse {
  aggregators: any[];
  offset: number;
  pagination: Pagination;
  results: any[];
}

@Injectable({
  providedIn: 'root',
})
export class OpportunitiesService {
  private baseUrl = 'https://search.torre.co/opportunities';
  constructor(private http: HttpClient) { }

  async search(queryParams: QueryParams = defaultParams): Promise<SearchResponse> {
    console.log('Searching with params:', queryParams);
    const url = `${this.baseUrl}/_search`;
    const body = {};
    const params = new HttpParams().set('currency', queryParams.currency)
      .set('periodicity', queryParams.periodicity)
      .set('lang', queryParams.lang)
      .set('size', queryParams.size.toString())
      .set('contextFeature', queryParams.contextFeature);

    return new Promise(resolve => {
      this.http.post<SearchResponse>(url, body, { params }).subscribe({
        next: (response: SearchResponse) => {
          // console.log('Search response:', response);

          resolve(response);
        },
        error: (error) => {
          console.error('Search error:', error);
        }
      });
    })
  }
}
