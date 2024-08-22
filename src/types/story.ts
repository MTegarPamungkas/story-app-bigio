import { Chapter } from "./chapter";

  export interface Story {
    _id?: string;
    title: string;
    writer: string;
    synopsis: string;
    category: string;
    tags: string[];
    status: string;
    coverImage?: File | null | string;
    chapters?: Chapter[]; 
  }
  