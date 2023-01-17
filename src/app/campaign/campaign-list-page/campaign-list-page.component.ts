import { Component, OnInit } from '@angular/core';
import { catchError, forkJoin, map, of } from 'rxjs';
import { CampaignService } from '../../data-access/campaign-services/campaign.service';
import { CampaignItemsModel, GetCampaignDataResultModel } from '../../data-access/campaign-services/models/get-campaign-data-result.model';
import { CampaignListPageModel, CampaignTableRowModel } from './models/campaign-list-page.model';

@Component({
  selector: 'ayn-campaign-list-page',
  templateUrl: './campaign-list-page.component.html',
  styleUrls: ['./campaign-list-page.component.scss']
})
export class CampaignListPageComponent implements OnInit {

  constructor(
    private readonly campaignService: CampaignService
  ) { }


  selectedCampaigns = new Array<CampaignTableRowModel>();

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



  // DATA LOGIC.

  //#region This section should be seperated service.
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

  handleItemActiveStatusChange(item: CampaignTableRowModel) {
    const sub = this.campaignService.updateCampaignStatus({
      newStatus: item.isActive ? 'ACTIVE' : 'PAUSED',
      campaignId: item.id
    }).subscribe({
      next: () => {
        // TODO: Validate with server value.
        item.isActive = !item.isActive;
      },
      error: (err) => {
        // TODO: Show error message
        console.error(err);
        sub.unsubscribe();
      }
    });
  }

  activateSelecteds() {
    this.bulkStatusUpdate(this.selectedCampaigns, 'ACTIVE');
  }

  pauseSelecteds() {
    this.bulkStatusUpdate(this.selectedCampaigns, 'PAUSED');
  }

  private bulkStatusUpdate(campaigns: Array<CampaignTableRowModel>, newStatus: 'ACTIVE' | 'PAUSED') {
    const observables = campaigns.map(campaign => {
      return this.campaignService.updateCampaignStatus({ newStatus: newStatus, campaignId: campaign.id })
        .pipe(catchError((err) => {
          // TODO: Add proper information about failed messages.
          return of(err)
        }));
    });
    const sub = forkJoin(observables).subscribe({
      next: () => {
        // TODO: Filter failed reuqests add message about it.
        this.selectedCampaigns.forEach((campaign: CampaignTableRowModel) => { campaign.isActive = (newStatus === 'ACTIVE') });
      },
      error: () => {
        sub.unsubscribe();
      }
    });
  }

  //#endregion


  handleFilter(filterValue: string) {
    this.tableStatus.search = filterValue;
    this.loadCampaigns();
  }

  handleFilterClear() {
    this.tableStatus.search = "";
    this.loadCampaigns();
  }

}
