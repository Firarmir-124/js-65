export interface Content {
  title: string;
  content: string;
}

export interface ContentMutation extends Content {
  id: string;
}

export interface ContentList {
  [id: string]: Content
}