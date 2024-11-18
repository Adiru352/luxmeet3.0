export type SocialPlatform = 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'tiktok';

export interface SocialPost {
  id: string;
  content: string;
  media?: {
    url: string;
    type: 'image' | 'video';
    alt?: string;
  }[];
  platforms: SocialPlatform[];
  scheduledFor: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  analytics?: PostAnalytics;
  category?: string;
  campaign?: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  customizations: {
    [key in SocialPlatform]?: {
      content?: string;
      firstComment?: string;
      hashtags?: string[];
    };
  };
}

export interface PostAnalytics {
  impressions: number;
  engagement: number;
  clicks: number;
  shares: number;
  likes: number;
  comments: number;
  platform: SocialPlatform;
  timestamp: Date;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'draft' | 'completed';
  posts: SocialPost[];
  analytics: {
    totalImpressions: number;
    totalEngagement: number;
    conversionRate: number;
    roi?: number;
  };
  goals: {
    impressions?: number;
    engagement?: number;
    clicks?: number;
    conversions?: number;
  };
}

export interface ContentCalendar {
  id: string;
  name: string;
  posts: SocialPost[];
  categories: string[];
  workflowStages: WorkflowStage[];
  team: TeamMember[];
}

export interface WorkflowStage {
  id: string;
  name: string;
  order: number;
  approvers: string[];
  requiredApprovals: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'approver' | 'viewer';
  permissions: string[];
}