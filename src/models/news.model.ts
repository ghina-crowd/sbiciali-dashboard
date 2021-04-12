export interface NewsModel {
    _id: string;
    source_link: string;
    active: string;
    link: string;
    advertising: AdvertisingModel[];
    description_ar: string;
    description_en: string;
    category: string;
    images: string[];
    source_name_ar: string;
    source_name_en: string;
    title_ar: string;
    title_en: string;
}


export interface AdvertisingModel {
    link: string;
    url: string;
    createdAt: string;
    _id: string;
}