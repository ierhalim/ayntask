export interface CampaignModel { 
    resourceName: string;
    status: 'ACTIVE' | 'PAUSED';
    networkSettings: {
        targetGoogleSearch: boolean;
        targetSearchNetwork: boolean;
        targetContentNetwork: boolean;
        targetPartnerSearchNetwork: boolean;
    }
    name: string;
    campaignGroupId: string;
    id: string;
    campaignBudget: string;
    startDate: Date;
    endDate: Date;
    campaignBudgetDetail: {
        campaign: {
            resourceName: string;
            id: string;
        }
        campaignBudget: {
            resourceName: string;
            period: string;
            id: string;
            amountMicros: string;
            currency: string;
        }
    }
    campaignDeviceList: Array<string>;
}