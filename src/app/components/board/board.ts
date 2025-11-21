import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { JobsService } from '../../services/jobs'

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class BoardComponent implements OnInit {
  jobs: any[] | null = null

  constructor(private jobsService: JobsService) { }

  async ngOnInit() {
    const search = await this.jobsService.search()
    this.jobs = search?.results || []
  }
}
