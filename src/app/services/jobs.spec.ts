import { TestBed } from '@angular/core/testing'
import { JobsService } from './jobs'

describe('Jobs', () => {
  let service: JobsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(JobsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
