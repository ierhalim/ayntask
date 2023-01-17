import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignListPageComponent } from './campaign-list-page/campaign-list-page.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { PageHeaderComponent } from '../ui/layout/page-header/page-header.component';


@NgModule({
  declarations: [
    CampaignListPageComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    PageHeaderComponent
  ]
})
export class CampaignModule { }
