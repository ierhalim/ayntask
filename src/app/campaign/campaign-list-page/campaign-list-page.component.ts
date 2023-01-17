import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ayn-campaign-list-page',
  templateUrl: './campaign-list-page.component.html',
  styleUrls: ['./campaign-list-page.component.scss']
})
export class CampaignListPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  handleFilter(filterValue: string) {
    console.log(filterValue);
  }

  handleFilterClear() {
    // TODO: Filter is removed, send a new request.
  }

}
