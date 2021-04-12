export interface UserModel {
    active: string;
    birthday: Date;
    category: string;
    city: string;
    costPerGiftVideo?: number;
    costPerMinute?: number;
    country: string;
    description_v2_en: string;
    description_v2_ar: string;
    email: string;
    facebook: string;
    facebook_count: number;
    fcm: [];
    first_name: string;
    gender: string;
    images: ImageUser[];
    imagesList: ImageUser[];
    instagram: string;
    instagram_count: number;
    last_name: string;
    name_v2_ar: string;
    name_v2_en: string;
    login_with: string;
    phone: string;
    pinterest?: string;
    pinterest_count?: number;
    profession: string;
    role: string;
    snapchat?: string;
    snapchat_count?: number;
    twitter: string;
    twitter_count: number;
    video: [];
    youtube: string;
    youtube_count: number;
    _id: string;
    password: string;
    currentPassword: string;
    videosList: VideoModel[];


}


export interface ContentModel {
    _id: number;
    content_en: string;
    content_ar: string;
    type: string;
}

export interface FeedbackModel {
    name: string;
    message: string;
    feedback_id: number;
    active: string;
    date?: string;

}


export class TokenModel {
    refreshToken: string;
}

export interface ImageUser {
    description: string;
    isLike?: boolean;
    isPrivate?: boolean;
    isExplore?: boolean;
    likes?: number;
    title?: string;
    url: string;
    views?: number;
    _id?: string;
}


export interface VideoModel {
    description: string;
    isLike?: boolean;
    isPrivate?: boolean;
    isExplore?: boolean;
    likes?: number;
    title?: string;
    url: string;
    views?: number;
    _id?: string;
}
