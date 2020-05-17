import { Component, OnInit } from '@angular/core';
import { SummaryService, SummaryData } from 'wanikani-api-ng';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  summary: Observable<SummaryData>
  constructor(private summaryService: SummaryService) {}

  ngOnInit(){
    this.summary = this.summaryService.getSummary().pipe(
      map(summary=>summary.data)
    )
  }
}
