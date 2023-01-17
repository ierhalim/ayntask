import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { CampaignItemsModel, GetCampaignDataResultModel } from "./models/get-campaign-data-result.model";
import { GetCampaignRequestModel } from "./models/get-campaign-request.model";

@Injectable({ providedIn: 'root' })
export class CampaignService {

    constructor(
        private readonly httpClient: HttpClient
    ) { }

    // Mocking
    loadedCampaigns: GetCampaignDataResultModel = {
        items: [],
        totalDataCount: 0
    };

    loadCampaigns(): Observable<GetCampaignDataResultModel> {
        return this.httpClient.get<GetCampaignDataResultModel>('/api/campaigns')
            .pipe(
                map(((campaignResponse: any) => ({
                    ...campaignResponse,
                    items: campaignResponse.items.map((item: CampaignItemsModel, idx: number) => ({
                        ...item,
                        campaign: {
                            ...item.campaign,
                            // MockId
                            id: (idx + 1).toString(),
                            // Mock Name 
                            name: `${item.campaign.name}-${(idx + 1)}`,
                            startDate: new Date(item.campaign.startDate),
                            endDate: new Date(item.campaign.endDate)
                        }
                    }))
                }))
                ))
            .pipe(tap((campaignData: GetCampaignDataResultModel) => {
                this.loadedCampaigns = campaignData;
            }));
    }

    // End of mocking

    getCampaigns(requestModel: GetCampaignRequestModel): Observable<GetCampaignDataResultModel> {
        let mockCampaigns = [...this.loadedCampaigns.items];
        if (!!requestModel.search && requestModel.search !== '') {
            const filterValue = (requestModel.search as string).toLowerCase();
            mockCampaigns = mockCampaigns.filter(
                x =>
                    x.campaign.id === requestModel.search ||
                    x.campaign.name.toLowerCase().indexOf(filterValue) > -1
            );
        }
        const slicedCampaigns = mockCampaigns.slice((requestModel.currentPage - 1) * requestModel.pageSize, requestModel.pageSize * requestModel.currentPage);
        return of({
            totalDataCount: mockCampaigns.length,
            items: slicedCampaigns
        });
    }


}