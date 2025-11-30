export interface NewsItem {
  categories: string[];
  content: string;
  contentSnippet: string;
  "dc:creator"?: string;
  guid: string;
  image?: { $: { height: string; url: string; width: string } };
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
}

type TeamType = {
  id: string;
  name: string;
  nat: string;
  formation: string;
  $t: string;
  winning: boolean;
  scored: boolean;
};

export type Rcard = {
  team: number;
  type: string;
};

export type ScoreItem = {
  id: string;
  date?: string;
  time?: string;
  spectators?: string;
  stadium?: string;
  week?: string;
  live?: string;
  league_id?: string;
  league_name?: string;
  minute?: string;
  gamestatus?: string;
  season?: string;
  couponGr?: string;
  upd?: string;
  del?: string;
  teams?: {
    hometeam: TeamType;
    awayteam: TeamType;
  };
  score: {
    goal1: string;
    goal2: string;
    ht_goal1: string;
    ht_goal2: string;
    et_goal1: string;
    et_goal2: string;
    pt_goal1: string;
    pt_goal2: string;
  };
  odds?: {
    coupon: string;
    code: string;
    mins: string;
    odd_1: string;
    odd_X: string;
    odd_2: string;
    odd_1X: string;
    odd_X2: string;
    odd_12: string;
    odd_o25: string;
    odd_u25: string;
    odd_HT1: string;
    odd_HTX: string;
    odd_HT2: string;
    odd_G01: string;
    odd_G23: string;
    odd_G46: string;
    odd_G7: string;
    homeAdv: string;
    awayAdv: string;
  };
  events?: [];
  timestamp?: number;
  image_name?: string;
  comp_name?: string;
  isLive?: boolean;
  isHT?: boolean;
  isFinished?: boolean;
  isPP?: boolean;
  result?: boolean;
  rcards?: Rcard[];
  otherOddsCount?: number;
  droppingOdds?: {
    odd_1: string;
    odd_X: string;
    odd_2: string;
    odd_1X: string;
    odd_X2: string;
    odd_12: string;
    odd_o25: string;
    odd_u25: string;
    odd_HT1: string;
    odd_HTX: string;
    odd_HT2: string;
    odd_G01: string;
    odd_G23: string;
    odd_G46: string;
    odd_G7: string;
  };
};

export interface Coord {
  lon: number;
  lat: number;
}

export interface Sys {
  type?: number;
  id?: number;
  country: string;
  sunrise: number;
  sunset: number;
  timezone?: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface WeatherObject {
  city: { id: number; name: string; lat: number; lon: number };
  data: {
    coord: Coord;
    sys: Sys;
    weather: Weather[];
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    id: number;
    name: string;
  };
}

export interface Enclosure {
  url: string;
  length?: number;
  type?: string;
}

export interface Item {
  link?: string;
  guid?: string;
  title?: string;
  pubDate?: string;
  creator?: string;
  summary?: string;
  content?: string;
  isoDate?: string;
  categories?: string[];
  contentSnippet?: string;
  enclosure?: Enclosure;
}

export interface PaginationLinks {
  self?: string;
  first?: string;
  next?: string;
  last?: string;
  prev?: string;
}
export interface RawFeed<U> {
  image?: {
    link?: string;
    url: string;
    title?: string;
  };
  paginationLinks?: PaginationLinks;
  link?: string;
  title?: string;
  items: (U & Item)[];
  feedUrl?: string;
  description?: string;
  itunes?: {
    [key: string]: any;
    image?: string;
    owner?: {
      name?: string;
      email?: string;
    };
    author?: string;
    summary?: string;
    explicit?: string;
    categories?: string[];
    keywords?: string[];
  };
}

export interface NewsFeed {
  [category: string]: Array<NewsItem>;
}

export interface ArticleType {
  title?: string;
  subtitle?: string;
  category?: string;
  date?: Date;
  imgUrl?: string;
  content?: string;
}
export interface Paper {
  title: string;
  img: string;
  url: string;
}

export interface FrontPages {
  papers: Paper[];
}

export interface League {
  [key: string]: ScoreItem[];
}
