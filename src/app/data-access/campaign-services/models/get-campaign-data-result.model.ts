import { CampaignMetricsModel } from "./campaign-metrics.model";
import { CampaignModel } from "./campaign.model";

export interface GetCampaignDataResultModel {
    totalDataCount: number;
    items: Array<CampaignItemsModel>;
}

export interface CampaignItemsModel { 
    campaign: CampaignModel,
    metrics: CampaignMetricsModel
}