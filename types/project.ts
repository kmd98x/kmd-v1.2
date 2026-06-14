
export type TextBlock = {
    type: "title" | "subtitle" | "text";
    value: string;
    styles?: string;
};

export type MediaBlock = {
    type: "image" | "video";
    url: string;
    styles?: string;
};

export type GalleryBlock = {
    type: "gallery";
    lightboxTag?: string;
    images: string[];
    styles?: string;
};

export type LinkBlock = {
    type: "link";
    url: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
    rel?: "noopener noreferrer";
    text: string;
    styles?: string;
};

export type TitleTextBlock = {
    type: "title-text";
    title: string;
    text: string;
    blockStyles?: string;
    titleStyles?: string;
    textStyles?: string;
    media?: MediaBlock;
};

export type ContentBlock = TextBlock | MediaBlock | TitleTextBlock | LinkBlock | GalleryBlock;

export type Project = {
    title: string;
    excerpt: string;
    tags: string[];
    heroMedia: {
        type: "image" | "video";
        url: string;
        caption?: string;
    };
    tabs: {
        title: string;
        content: ContentBlock[];
    }[];
};