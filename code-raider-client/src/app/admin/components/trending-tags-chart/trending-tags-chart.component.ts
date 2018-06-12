import { Component, OnInit, Input } from '@angular/core';
import { TagsService } from 'shared/services/tags.service';

@Component({
  selector: 'trending-tags-chart',
  templateUrl: './trending-tags-chart.component.html',
  styleUrls: ['./trending-tags-chart.component.css']
})
export class TrendingTagsChartComponent implements OnInit {

  @Input('tagsLimit') limit;

  @Input('chartLabels') chartLabels: string[];
  @Input('chartData') chartData: number[];
  @Input('chartType') chartType;
  @Input('options') options = '';

  constructor() {}

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit(): void {
  }


}
