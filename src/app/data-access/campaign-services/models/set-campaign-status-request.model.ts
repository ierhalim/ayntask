export interface SetCampaignStatusRequestModel {
    campaignId: string;
    newStatus: 'ACTIVE' | 'PAUSED';
}
