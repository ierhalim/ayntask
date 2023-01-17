import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignListPageComponent } from './campaign-list-page/campaign-list-page.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { PageHeaderComponent } from '../ui/layout/page-header/page-header.component';
import { DelayedInputDirective } from '../ui/delayed-input/delayed-input.directive';
import { TableModule } from '../ui/table/table.module';
import { CheckboxComponent } from '../ui/checkbox/checkbox.component';


@NgModule({
  declarations: [
    CampaignListPageComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    PageHeaderComponent,
    DelayedInputDirective,
    TableModule,
    CheckboxComponent
  ]
})
export class CampaignModule { }
