import { Component, OnInit, Input } from '@angular/core';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'trending-tags-chart',
  templateUrl: './trending-tags-chart.component.html',
  styleUrls: ['./trending-tags-chart.component.css']
})
export class TrendingTagsChartComponent implements OnInit {

  @Input('tagsLimit') limit;

  public chartLabels: string[] = [];
  public chartData: number[] = [];
  public chartType = 'pie';

  constructor(private tagsService: TagsService) {
    this.tagsService.getGroupedTags()
    .subscribe(tags => {

      const chartLabels = [];
      const chartData = [];

      for (let i = 0 ; i < this.limit; i++) {
        chartLabels.push(tags[i]._id.tags);
        chartData.push(tags[i].count);
      }

      this.chartData = chartData;
      this.chartLabels = chartLabels;
    });
  }

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit(): void {
  }


}
