import { Component, OnInit } from '@angular/core';
import { defaultParams, Languages, OpportunitiesService } from '../../services/opportunities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class BoardComponent implements OnInit {
  opportunities: any[] | null = null;
  languages: Languages[] | null = null;

  constructor(private opportunitiesService: OpportunitiesService) { }

  async ngOnInit() {
    const search = await this.opportunitiesService.search();
    this.opportunities = search.results || [];
    this.languages = Object.values(Languages);
  }

  async onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    const queryParams = { ...defaultParams, lang: selectedValue as Languages };
    const search = await this.opportunitiesService.search(queryParams);
    this.opportunities = search.results || [];
  }

  async onSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    const queryParams = { ...defaultParams, size: parseInt(selectedValue, 10) };
    const search = await this.opportunitiesService.search(queryParams);
    this.opportunities = search.results || [];
  }
}
