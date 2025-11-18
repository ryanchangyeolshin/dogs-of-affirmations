export interface DogAPIResponseType {
  message: string;
  status: string;
}

export interface MotivationalQuoteResponseType {
  quote: string | null;
  author: string | null;
  categories: string[] | null;
  work: string | null;
}
