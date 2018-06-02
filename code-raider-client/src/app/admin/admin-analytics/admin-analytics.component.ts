import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { StackOverflowTagsService } from '../../services/stack-overflow-tags.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent implements OnInit {

  limit = 5;
  siteTagschartData = [];
  siteTagschartLabels = [];

  stackOverflowChartData = [];
  stackOverflowChartLabels = [];

  constructor(
    private tagsService: TagsService,
    private stackOverflowService: StackOverflowTagsService
  ) {
    this.tagsService.getGroupedTags()
    .subscribe(tags => {

      const chartLabels = [];
      const chartData = [];

      for (let i = 0 ; i < this.limit; i++) {
        chartLabels.push(tags[i]._id.tags);
        chartData.push(tags[i].count);
      }

      this.siteTagschartData = chartData;
      this.siteTagschartLabels = chartLabels;
    });

    this.stackOverflowService.getAll()
    .subscribe((data: any) => {
      this.stackOverflowChartLabels = data.items.map(item => item.name).splice(0, this.limit);

      this.stackOverflowChartData = data.items.map(item => item.count).splice(0, this.limit);
    });
   }

  ngOnInit() {
  }

}
