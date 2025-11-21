import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, ElementRef } from '@angular/core'
import { JobsService } from '../../services/jobs'
import { OllamaService } from '../../services/ollama'
import { CategoryChart } from '../category-chart/category-chart'

@Component({
  selector: 'app-board',
  imports: [
    CommonModule,
    CategoryChart
  ],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class BoardComponent implements AfterViewInit {
  skills: any[] = []
  categories: any[] = []

  constructor(
    private jobsService: JobsService,
    private ollamaService: OllamaService,
    private elRef: ElementRef
  ) { }

  async ngAfterViewInit() {
    // Initialize MDB components
    const initMDB = mdb.initMDB
    const Chart = mdb.Chart
    const Ripple = mdb.Ripple
    initMDB({ Chart, Ripple })

    // Fetch jobs skills
    const search = await this.jobsService.search()
    this.skills = search?.aggregators?.skill || []

    if (this.skills.length === 0) return

    // Fetch skills categories
    this.categories = await this.ollamaService.getSkillsCategories(this.skills)
    this.showCategoriesChart()
  }

  showCategoriesChart() {
    if (this.categories.length === 0) return

    const categoriesData = {
      type: 'bar',
      data: {
        labels: this.categories.map((category: any) => category.name),
        datasets: [
          {
            label: 'Skills trends by category',
            data: this.categories.map((category: any) => category.total),
            skills: this.categories.map((category: any) => {
              let selection = category.skills.slice(0, 5).map((skill: any) => skill.value).join(' | ')

              if (category.skills.length > 5) selection += ' | ...'

              return selection
            }),
            backgroundColor: this.categories.map((category: any) => category.backgroundColor),
          }
        ]
      }
    }

    const categoriesOptions = {
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
            grid: {
              display: true,
              borderDash: [2],
              zeroLineColor: 'rgba(0,0,0,0)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
            ticks: {
              color: 'rgba(0,0,0,0.5)',
            }
          },
          y: {
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              color: 'rgba(0,0,0,0.5)',
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function (context: any) {
                return `${context[0].label}: ${context[0].formattedValue} mentions`
              },
              label: function (context: any) {
                return context.dataset.skills[context.dataIndex]
              }
            }
          }
        }
      }
    }

    const selector = this.elRef.nativeElement.querySelector('#categories-chart')
    new mdb.Chart(selector, categoriesData, categoriesOptions)
  }

  total(): number {
    return this.skills.reduce((sum, skill) => sum + skill.total, 0)
  }

  toKebabCase(str: string): string {
    return str
      // Replace camelCase boundaries with a dash
      .replace(/([a-z])([A-Z])/g, '$1-$2')

      // Replace any sequence of non-alphanumeric characters with a dash
      .replace(/[^a-zA-Z0-9]+/g, '-')

      // Remove starting or ending dashes
      .replace(/^-+|-+$/g, '')

      // Convert to lowercase
      .toLowerCase();
  }
}
