import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReplaceToMockInterceptor } from './replace-to-mock.interceptor';
import { CampaignService } from './campaign-services/campaign.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class DataAccessModule {

  static forRoot(): ModuleWithProviders<DataAccessModule> { 
    return {
      ngModule: DataAccessModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ReplaceToMockInterceptor,
          multi: true
        },
        {
          // MOCKING
          provide: APP_INITIALIZER,
          useFactory: (campaignService: CampaignService) => { 
            return () => { 
              return campaignService.loadCampaigns();
            }
          },
          deps: [CampaignService, HttpClientModule],
          multi: true
        }
      ]
    }
  }
}
