export enum TopLevelCategory {
  Courses = 0,
  School = 4,
  Student = 5,
}

export interface PageAdvantage {
  title: string;
  description: string;
  _id: string;
}

export interface HhData {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
  updatedAt: Date;
  _id: string;
}

export interface PageBlog {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  views: number;
  _id: string;
}

export interface PageModel {
  tags: string[];
  _id: string;
  secondCategory: string;
  alias: string;
  title: string;
  category: string;
  seoText?: string;
  tagsTitle: string;
  metaTitle: string;
  metaDescription: string;
  firstCategory: TopLevelCategory;
  advantages?: PageAdvantage[];
  createdAt: Date;
  updatedAt: Date;
  hh?: HhData;
  qas?: PageQa[];
}
export interface PageQa {
  question: string;
  answer: string;
}
