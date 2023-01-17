import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignListPageComponent } from './campaign-list-page/campaign-list-page.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { PageHeaderComponent } from '../ui/layout/page-header/page-header.component';
import { DelayedInputDirective } from '../ui/delayed-input/delayed-input.directive';


@NgModule({
  declarations: [
    CampaignListPageComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    PageHeaderComponent,
    DelayedInputDirective
  ]
})
export class CampaignModule { }
