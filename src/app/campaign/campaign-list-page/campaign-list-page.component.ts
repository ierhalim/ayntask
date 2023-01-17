import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { CampaignService } from '../../data-access/campaign-services/campaign.service';
import { CampaignItemsModel, GetCampaignDataResultModel } from '../../data-access/campaign-services/models/get-campaign-data-result.model';
import { CampaignListPageModel } from './models/campaign-list-page.model';

@Component({
  selector: 'ayn-campaign-list-page',
  templateUrl: './campaign-list-page.component.html',
  styleUrls: ['./campaign-list-page.component.scss']
})
export class CampaignListPageComponent implements OnInit {

  constructor(
    private readonly campaignService: CampaignService
  ) { }

  pageModel: CampaignListPageModel = {
    totalDataCount: 0,
    items: []
  };

  tableStatus = {
    currentPage: 1,
    pageSize: 5,
    search: ''
  };



  ngOnInit(): void {
    this.loadCampaigns();
  }

   loadCampaigns() {
    const sub = this.campaignService.getCampaigns({
      currentPage: this.tableStatus.currentPage,
      daysBefore: 30,
      pageSize: this.tableStatus.pageSize,
      search: this.tableStatus.search,
    }).pipe(map(
      (result: GetCampaignDataResultModel) => ({
        totalDataCount: result.totalDataCount,
        items: result.items.map((value: CampaignItemsModel) => ({
          id: value.campaign.id,
          name: value.campaign.name,
          startDate: value.campaign.startDate,
          budgetMicros: value.campaign.campaignBudgetDetail.campaignBudget.amountMicros,
          budgetPeriod: value.campaign.campaignBudgetDetail.campaignBudget.period,
          budgetCurrency: value.campaign.campaignBudgetDetail.campaignBudget.currency,
          endDate: value.campaign.endDate,
          isActive: value.campaign.status === 'ACTIVE',
          // Dunno what to bind
          result: 'N/A',
          impressions: value.metrics.impressions,
          clicks: value.metrics.clicks,
          averageCpc: value.metrics.averageCpc,
          // Dunno what to bind
          spend: -1
        }))
      })
    )).subscribe({
      next: (pageModel: CampaignListPageModel) => {
        this.pageModel = pageModel;
      },
      error: (err) => {
        // TODO: Show error message.
        console.error(err);
        sub.unsubscribe();
      }
    });
  }


  handleFilter(filterValue: string) {
    this.tableStatus.search = filterValue;
    this.loadCampaigns();
  }

  handleFilterClear() {
    this.tableStatus.search = "";
    this.loadCampaigns();
  }

}
