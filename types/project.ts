export type TextBlockType = "title" | "subtitle" | "text";

export type TextBlock = {
  type: TextBlockType;
  value: string;
};

export type MediaBlockType = "image" | "video";

export type MediaBlock = {
  type: MediaBlockType;
  url: string;
};

export type ContentBlock = TextBlock | MediaBlock;

export type Project = {
  image: string;
  title: string;
  excerpt: string;
  content: ContentBlock[]; // ordered list — best for multiple of each kind
};