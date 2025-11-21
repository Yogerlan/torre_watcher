import { AfterViewInit, Component, ElementRef, Input } from '@angular/core'
import { SkillsCategory } from '../../schemas/AISchemas'

@Component({
  selector: 'app-category-chart',
  imports: [],
  templateUrl: './category-chart.html',
  styleUrl: './category-chart.css',
})
export class CategoryChart implements AfterViewInit {
  @Input() category!: SkillsCategory

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.showSkillsChart()
  }

  showSkillsChart() {
    const skillsData = {
      type: 'bar',
      data: {
        labels: this.category.skills.map((skill: any) => skill.value),
        datasets: [
          {
            label: this.category.name,
            data: this.category.skills.map((skill: any) => skill.total),
            backgroundColor: this.category.skills.map((skill: any) => skill.backgroundColor),
          }
        ]
      }
    }

    const skillsOptions = {
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
        // plugins: {
        //   tooltip: {
        //     callbacks: {
        //       title: function (context: any) {
        //         return `${context[0].label}: ${context[0].formattedValue} mentions`
        //       },
        //       label: function (context: any) {
        //         return context.dataset.skills[context.dataIndex]
        //       }
        //     }
        //   }
        // }
      }
    }

    const selectorId = this.toKebabCase(this.category.name) + '-chart'
    const selector = this.elRef.nativeElement.querySelector(`#${selectorId}`)
    new mdb.Chart(selector, skillsData, skillsOptions)
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
