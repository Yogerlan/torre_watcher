import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { OpportunitiesService } from '../../services/opportunities'

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class BoardComponent implements OnInit {
  opportunities: any[] | null = null

  constructor(private opportunitiesService: OpportunitiesService) { }

  async ngOnInit() {
    const search = await this.opportunitiesService.search()
    this.opportunities = search?.results || []
  }
}
