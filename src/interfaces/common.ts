import { Author, Creator, Publisher, StructureDataType } from "../types/types";

export interface ReviewInterface {
  type?: "Rating" | "AggregateRating";
  /**
   * Rating Options
   * Any rating options to show on card or any where
   */
  ratingValue?: number | string; // Rating option
  bestRating?: string | number; // Rating option
  bestValue?: string | number; // Rating option
  worstRating?: string | number; // Rating option
  alternateName?: boolean; // Rating option
  /*
    * AggregateRating
    * This options is most useful
    * When generating palystore / appstore review object for web
    */
  value: string | number; // AggregateRating option
  count: string | number; // // AggregateRating option
}

export interface CreatorInterface {
  type?: Creator;
  url?: string;
  name?: string;
  sameAs?: string;
  contactPoint?: {
      type?: 'ContactPoint';
      contactType?: 'customer service';
      telephone?: string;
      email?: string;
  },
  logo?: {
    type?: "ImageObject";
    url: string;
  }
}

export interface AuthorInterface {
  type?: Author;  // Default 'Person'
  name: string;
  sameAs?: string;
  profileUrl?: string;
  givenName?: string;
  familyName?: string;
}

export interface PublisherInterface {
  type?: Publisher;
  name: string;
  logo: {
    type?: "ImageObject";
    url: string;
  }
}

export interface AddressInterface {
  type?: 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  postalCode: string | number;
  addressRegion: string;
  addressCountry: string;
}

export interface GeoInterface {
  type?: 'GeoCoordinates' | 'GeoShape';
  // GeoCoordinates options
  latitude: number;
  longitude: number;
  // GeoShape options
  box: string;
}

// DOM Update interface


export interface UpdateDOMInterface {
  type: StructureDataType;
  data: any;
  document: Document;
  uniqueIdentifier?: string
}