import { LocationType } from "../enums/enums";
import { ApplicationCategory, Education, Employment, LearningResourceType, Review, WeekDays, WorkTimeUnit } from "../types/types";
import { AddressInterface, AuthorInterface, CreatorInterface, GeoInterface, PublisherInterface, ReviewInterface } from "./common";

export interface ArticalStructuredData {
    headline?: string;
    images?: Array<string>;
    datePublished?: Date | string;
    dateModified?: Date | string;
    authors?: Array<AuthorInterface>;
}

export interface BreadcrumbStructureData {
    type?: 'BreadcrumbList';
    items?: Array<{
        type?: 'ListItem';
        name: string;
        url: string;
    }>;
}

export interface CourseStructureData {
    type?: 'Course';
    name?: string;
    description?: string;
    provider?: {
        type?: 'Organization';
        name?: string;
        sameAs?: string;
    }
}

export interface Covid19StructuredData {
    type?: 'SpecialAnnouncement';
    name?: string;
    // ex. "As of 11:59 pm on March 17, 2020, all individuals in the 3 counties must strictly follow the provisions in this new Order. This new Order will be in effect through March 30, 2020."
    description?: string;
    datePosted?: string;
    expires?: string;
    // Guide line url
    quarantineGuidelines?: string;
    // details url. ex. "https://example.org/california/prevention-tips/"
    diseasePreventionInfo?: string;
    // Name with coutry code text
    spatialCoverage?: Array<string>;
}

export interface DatasetStructureData {
    type?: 'Dataset';
    name?: string;
    alternateName?: Array<string> | string;
    description?: string;
    url?: string;
    sameAs?: string;
    // ex. ["https://doi.org/10.1000/182", "https://identifiers.org/ark:/12345/fk1234"]
    identifier?: Array<string>;
    // ex. [ "ATMOSPHERE > ATMOSPHERIC PHENOMENA > CYCLONES", "ATMOSPHERE > ATMOSPHERIC PHENOMENA > FREEZE" ]
    keywords?: Array<string>;
    // ex. "https://creativecommons.org/publicdomain/zero/1.0/"
    license?: string;
    isAccessibleForFree?: boolean;
    version?: string | number;
    variableMeasured?: string;
    measurementTechnique?: string;
    creator?: CreatorInterface;
    founder?: CreatorInterface;
    includedInDataCatalog?: {
        type?: 'DataCatalog';
        name: string;
    };
    temporalCoverage?: Date | string;
    spatialCoverage?: {
        type?: 'Place';
        geo: GeoInterface;
    };
    distribution?: Array<{
        type?: 'DataDownload';
        encodingFormat: 'CSV' | 'XML' | 'PDF';
        contentUrl: string;
    }>;
    subDataset?: Array<{
        type?: 'Dataset';
        name: string;
        description: string;
        license: string;
        creator?: CreatorInterface;
    }>;
}

export interface EducationalQAStructuredData {
    type?: 'Quiz';
    about?: {
        type?: 'Thing';
        name: string;
    };
    educationalAlignment?: Array<{
        type?: 'AlignmentObject';
        alignmentType?: 'educationalSubject';
        targetName?: string;
    }>;
    questionAnswer?: Array<{
        type?: 'Question';
        cardType?: 'Flashcard';
        question?: string;
        answer?: {
            type?: "Answer";
            text?: string;
        }
    }>;
}

export interface EventStructuredData {
    type: 'standard' | 'online';
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location?: {
      type?: LocationType;
      name: string;
      url?: string;
      address?: AddressInterface;
    },
    image?: Array<string>;
    offers?: {
      url: string;
      price: string | number;
      priceCurrency: string;
      validFrom: string;
    },
    performer?: string;
  organizer?: CreatorInterface;
}

export interface FactCheckStructuredData {
    type?: "ClaimReview";
    url: string;
    claimReviewed: string;
    itemReviewed: {
        type?: "Claim";
        author?: AuthorInterface;
        datePublished?: string;
        appearance?: {
            type?: "OpinionNewsArticle";
            author?: AuthorInterface;
            datePublished?: string | Date;
            headline?: string;
            image: string;
            publisher: PublisherInterface;
            url: string;
        };
    }
    author?: AuthorInterface;
    reviewRating?: ReviewInterface;
}

export interface FAQStructuredData {
    type?: 'FAQPage';
    mainEntity: Array<{
        type?: 'Question';
        name: string;
        acceptedAnswer: {
            type?: 'Answer';
            text: string;
        }
    }>;
}

export interface JobPostingStructureData {
    type?: 'JobPosting';
    title: string;
    description: string;
    datePosted: string;
    validThrough: string;
    employmentType: Employment | Array<Employment>;
    hiringOrganization: CreatorInterface,
    jobLocationType?: 'TELECOMMUTE'; // if work from home
    jobLocation: {
        type?: 'Place';
        address: AddressInterface;
    },
    baseSalary: {
        type?: 'MonetaryAmount';
        currency: string;
        value: {
            type?: 'QuantitativeValue';
            value: number;
            unit: WorkTimeUnit;
        }
    },
    identifier: {
        type?: 'PropertyValue';
        name: string;
        value: string | number;
    };
    applicantLocationRequirements?: Array<{
        type?: 'State' | 'Country';
        name: string;
    }>;
    educationRequirements?: Array<{
        type?: 'EducationalOccupationalCredential';
        credentialCategory: Education;
    }>;
    experienceRequirements?: number; // in months
}

export interface LearningVideoStructuredData {
    type?: string | Array<string>;
    name?: string;
    description?: string;
    educationalLevel?: string;
    learningResourceType?: string;
    text?: string;
    contentUrl?: string;
    uploadDate?: string | Date;
    educationalAlignment?: {
        type?: 'AlignmentObject';
        educationalFramework?: string;
        targetName?: string;
        targetUrl?: string;
    };
    thumbnailUrls?: Array<string>;
    hasPart?: Array<{
        type?: string | Array<string>;
        learningResourceType?: LearningResourceType;
        name?: string;
        startOffset?: number;
        endOffset?: number;
        url?: string;
    }>;
}

export interface LocalBusinessStructuredData {
    type: 'Restaurant',
    name: string;
    image: Array<string>;
    address: AddressInterface;
    review: {
        type?: 'Rating';
        rating: ReviewInterface;
        author: AuthorInterface;
    },
    geo: GeoInterface;
    url: string;
    telephone: string;
    servesCuisine: string; // ex. "Italian"
    priceRange: string;
    menu: string;
    acceptsReservations: boolean;
    openingHoursSpecification: Array<{
        dayOfWeek: WeekDays | Array<WeekDays>;
        opens: string; // 24 hours format
        closes: string; // // 24 hours format
    }>;
}

export interface LogoStructuredData {
    type: 'Organization';
    url: string;
    logo: string;
}

export interface MovieStructuredData {
    type?: 'ListItem' | string;
    url?: string; // use for Summary page
    item?: Array<{ // use for Details list
        type?: 'Movie' | string;
        url: string;
        name: string;
        image: string | Array<string>;
        dateCreated: string | Date;
        director?: {
            type?: 'Person';
            name: string;
        };
        review: {
            type?: "Review";
            reviewBody: string;
            reviewRating: ReviewInterface;
            author: AuthorInterface;
        };
        aggregateRating: ReviewInterface;
    }>
}

export interface ReviewStructuredData {
    type?: Review;
    name?: string;
    itemReviewed?: {
        image?: string;
        name?: string;
        servesCuisine?: string;
        priceRange?: string;
        telephone?: string;
        address?: AddressInterface;
    },
    reviewRating?: ReviewInterface;
    author?: AuthorInterface;
    publisher?: PublisherInterface;
}

export interface SearchBoxStructuredDataPotentialAction {
    type?: 'SearchAction';
    queryInput: string; // ex. "required name=search_term_string"
    target: {
        type?: 'EntryPoint';
        urlTemplate: string; // ex. "https://query.example.com/search?q={search_term_string}"
    }
}

export interface SearchBoxStructuredData {
    type?: 'WebSite';
    url: string;
    potentialAction: SearchBoxStructuredDataPotentialAction | Array<SearchBoxStructuredDataPotentialAction>;
}

export interface SoftwareApplicationStructureData {
    type?: 'SoftwareApplication';
    name?: string;
    operatingSystem?: 'ANDROID' | 'IOS';
    category?: ApplicationCategory;
    applicationLink?: string;
    rating?: ReviewInterface;
}

export interface VideoStructureData {
    type?: 'VideoObject';
    name?: string;
    description?: string;
    thumbnailUrl?: string | Array<string>;
    uploadDate?: string;
    duration?: string;
    contentUrl?: string;
    embedUrl?: string;
    regionsAllowed?: string;
    expires?: string | Date;
    // for view count of this video
    viewCount?: string | number;
    // Use below option for live batch or for broadcasting
    publication?: Array<{
        type?: "BroadcastEvent";
        isLiveBroadcast: boolean;
        startDate: string | Date;
        endDate: string | Date;
    }>;
    // Use below option to add video clips
    clips?: Array<{
        type?: "Clip";
        name: string;
        startOffset: number;
        endOffset: number;
        url: string;
    }>;
}