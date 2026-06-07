export type TextBlockType = "title" | "subtitle" | "text";

export type TextBlock = {
    type: TextBlockType;
    value: string;
    styles?: string;
};

export type MediaBlockType = "image" | "video";

export type MediaBlock = {
    type: MediaBlockType;
    url: string;
    styles?: string;
};

export type ContentBlock = TextBlock | MediaBlock;

export type Project = {
    title: string;
    excerpt: string;
    tags: string[];
    heroMedia: {
        type: MediaBlockType;
        url: string;
        caption?: string;
    };
    tabs: {
        title: string;
        content: ContentBlock[];
    }[];
};