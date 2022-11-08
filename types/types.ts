export type NewsItem = {
  categories: string[];
  content: string;
  contentSnippet: string;
  "dc:creator": string;
  guid: string;
  image: { $: { height: string; url: string; width: string } };
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
};
