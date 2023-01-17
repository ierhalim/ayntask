import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'campaign',
    loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'campaign'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
