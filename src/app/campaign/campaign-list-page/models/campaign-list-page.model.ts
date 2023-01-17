export interface CampaignListPageModel {
    totalDataCount: number;
    items: Array<CampaignTableRowModel>;

}

export interface CampaignTableRowModel {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    budgetMicros: string;
    budgetPeriod: string;
    budgetCurrency: string;
    isActive: boolean;
    result: string;
    impressions: string;
    clicks: string;
    averageCpc: number;
    spend: number;
}