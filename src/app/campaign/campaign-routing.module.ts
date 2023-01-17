import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListPageComponent } from './campaign-list-page/campaign-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
