import { TestBed } from '@angular/core/testing'
import { OllamaService } from './ollama'

describe('OllamaService', () => {
  let service: OllamaService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(OllamaService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
