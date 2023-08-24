import {
    ArticalStructuredData,
    BreadcrumbStructureData,
    CourseStructureData,
    Covid19StructuredData,
    DatasetStructureData,
    EducationalQAStructuredData,
    EventStructuredData,
    FAQStructuredData,
    FactCheckStructuredData,
    JobPostingStructureData,
    LearningVideoStructuredData,
    LocalBusinessStructuredData,
    LogoStructuredData,
    MovieStructuredData,
    ReviewStructuredData,
    SearchBoxStructuredData,
    SearchBoxStructuredDataPotentialAction,
    SoftwareApplicationStructureData,
    VideoStructureData
} from "../interfaces/definitions";
import { createAddressObject } from "../utils/address";
import { createAuthorObject } from "../utils/author";
import { createGeoObject } from "../utils/geo";
import { createLocationObject } from "../utils/location";
import { createOrganisationObject } from "../utils/organisation";
import { createPersonObject } from "../utils/person";
import { createRatingObject } from "../utils/rating";

export class SeoJsonLd {

    /**
     * Article structured data
     * @param data - ArticalStructuredData
     * @returns artical JsonLd
     * Read: https://developers.google.com/search/docs/appearance/structured-data/article
     * Usage Area:
     * 1. Article
     * 2. NewsArticle
     * 3. BlogPosting
     */
    artical(data: ArticalStructuredData | Array<ArticalStructuredData>) {
        const create = (data: ArticalStructuredData) => {
            return {
                "@context": "https://schema.org",
                "@type": "NewsArticle",
                ...(data.headline && { "headline": data.headline }),
                ...(data.images?.length && { "image": data.images }),
                ...(data.datePublished && { "datePublished": new Date(data.datePublished).toISOString() }),
                ...(data.dateModified && { "dateModified": new Date(data.dateModified).toISOString() }),
                ...(data.authors?.length && { "author": data.authors.map(el => createPersonObject(el)) })
            };
        }
        return data ? ((data instanceof Array) ? data.map(elm => create(elm)).filter(x => x !== null) : create(data)) : null;        
    }
    
    /**
     * Breadcrumb structured data
     * @param data - BreadcrumbStructureData
     * @returns - breadCrump JsonLd
     * Read: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
     * Usage Area:
     * 1. Any Child pages of an web / web app
     */
    breadCrump(data: BreadcrumbStructureData | Array<BreadcrumbStructureData>) {
        const crump = (brd: BreadcrumbStructureData) => {
            return {
                "@context": "https://schema.org",
                "@type": brd.type ?? "BreadcrumbList",
                ...(brd.items?.length && {
                    "itemListElement": brd.items.map((el, i) => {
                        return {
                            "@type": el.type ?? "ListItem",
                            "position": i + 1,
                            ...(el.name && { "name": el.name }),
                            ...(el.url && { "item": el.url })
                        }
                    })
                })
            }
        }
        return data ? ((data instanceof Array) ? data.map(elm => crump(elm)).filter(x => x !== null) : crump(data)) : null;
    }
    
    /**
     * Course list structured data
     * @param data - CourseStructureData
     * @returns - Article structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/course
     * Usage Area:
     * 1. Course
     */
    course(data: CourseStructureData | Array<CourseStructureData>) {
        const create = (data: CourseStructureData) => {
            return data ? {
                "@context": "https://schema.org",
                "@type": data.type ?? 'Course',
                ...(data.name && { "name": data.name }),
                ...(data.description && { "description": data.description }),
                ...(data.provider && {
                    "provider": createOrganisationObject(data.provider)
                })
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * COVID-19 announcement structured data
     * @param data - Covid19StructuredData
     * @returns - COVID-19 announcement structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/special-announcements
     * Usage: 
     * 1. Announcement of a shelter-in-place directive
     * 2. Closure notice (for example, closing a school or public transportation)
     * 3. Announcement of government benefits (for example, unemployment support, paid leave, or one-time payments)
     * 4. Quarantine guidelines
     * 5. Travel restrictions
     * 6. Notification of a new drive-through testing center
     * 7. Announcement of an event transitioning from offline to online, or cancellation
     * 8. Announcement of revised hours and shopping restrictions
     * 9. Disease spread statistics and maps
     */
    covid19(data: Covid19StructuredData | Array<Covid19StructuredData>) {
        const create = (data: Covid19StructuredData) => {
            return data ? {
                "@context": "https://schema.org",
                "@type": data.type ?? 'SpecialAnnouncement',
                ...(data.name && { "name": data.name }),
                ...(data.description && { "text": data.description }),
                ...(data.datePosted && { "datePosted": new Date(data.datePosted).toISOString() }),
                ...(data.expires && { "expires": new Date(data.expires).toISOString() }),
                ...(data.quarantineGuidelines && { "quarantineGuidelines": data.quarantineGuidelines }),
                ...(data.diseasePreventionInfo && { "diseasePreventionInfo": data.diseasePreventionInfo }),
                ...(data.spatialCoverage?.length && {
                    "spatialCoverage": data.spatialCoverage.map(el => {
                        return {
                            "@type": "AdministrativeArea",
                            "name": el
                        }
                    })
                })
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * Dataset structured data
     * @param data - DatasetStructureData
     * @returns - Dataset structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/dataset
     * Usage:
     * 1. A table or a CSV file with some data
     * 2. An organized collection of tables
     * 3. A file in a proprietary format that contains data
     * 4. A collection of files that together constitute some meaningful dataset
     * 5. A structured object with data in some other format that you might want to load into a special tool for processing
     * 6. Images capturing data
     * 7. Files relating to machine learning, such as trained parameters or neural network structure definitions
     */
    dataSet(data: DatasetStructureData | Array<DatasetStructureData>) {
        const create = (data: DatasetStructureData) => {
            return data ? {
                "@context": "https://schema.org/",
                "@type": data.type ?? 'Dataset',
                ...(data.name && { "name": data.name }),
                ...(data.alternateName && { "alternateName": data.alternateName }),
                ...(data.description && { "description": data.description }),
                ...(data.url && { "url": data.url }),
                ...(data.sameAs && { "sameAs": data.sameAs }),
                ...(data.identifier && { "identifier": data.identifier }),
                ...(data.keywords?.length && { "keywords": data.keywords }),
                ...(data.license && { "license": data.license }),
                ...(data.version && { "version": data.version }),
                ...(data.variableMeasured && { "variableMeasured": data.variableMeasured }),
                ...(data.measurementTechnique && { "measurementTechnique": data.measurementTechnique }),
                "isAccessibleForFree": data.hasOwnProperty('isAccessibleForFree') ? data.isAccessibleForFree : true,
                ...(data.subDataset && {
                    "hasPart": data.subDataset.map(el => {
                        return {
                            "@type": el.type ?? 'Dataset',
                            ...(el.name && { "name": el.name }),
                            ...(el.description && { "description": el.description }),
                            ...(el.license && { "license": el.license }),
                            ...(el.creator && {
                                "creator": createOrganisationObject(el.creator)
                            })
                        }
                    })
                }),
                ...(data.creator && {
                    "creator": createOrganisationObject(data.creator)
                }),
                ...(data.founder && {
                    "funder": createOrganisationObject(data.founder)
                }),
                ...(data.includedInDataCatalog && {
                    "includedInDataCatalog": {
                        "@type": data.includedInDataCatalog.type ?? 'DataCatalog',
                        ...(data.includedInDataCatalog.name && { "name": data.includedInDataCatalog.name })
                    }
                }),
                ...(data.distribution && {
                    "distribution": data.distribution.map(el => {
                        return {
                            "@type": el.type ?? 'DataDownload',
                            ...(el.encodingFormat && { "encodingFormat": el.encodingFormat }),
                            ...(el.contentUrl && { "contentUrl": el.contentUrl })
                        }
                    })
                }),
                ...(data.temporalCoverage && { "temporalCoverage": new Date(data.temporalCoverage).toISOString() }),
                ...(data.spatialCoverage && {
                    "spatialCoverage": {
                        "@type": data.spatialCoverage.type ?? 'Place',
                        ...(data.spatialCoverage.geo && {
                            "geo": createGeoObject(data.spatialCoverage.geo)
                        })
                    }
                })
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * Education Q&A structured data
     * @param data - EducationalQAStructuredData
     * @returns - Education Q&A structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/education-qa
     * Usage:
     * 1. Any question answer page
     */
    educationalQA(data: EducationalQAStructuredData | Array<EducationalQAStructuredData>) {
        const create = (data: EducationalQAStructuredData) => {
            return data ? {
                "@context": "https://schema.org/",
                "@type": data.type ?? 'Quiz',
                ...(data.about && {
                    "about": {
                        "@type": data.about.type ?? 'Thing',
                        ...(data.about.name && { "name": data.about.name })
                    }
                }),
                ...(data.educationalAlignment && {
                    "educationalAlignment": data.educationalAlignment.map(el => {
                        return {
                            "@type": el.type ?? 'AlignmentObject',
                            "alignmentType": el.alignmentType ?? 'educationalSubject',
                            ...(el.targetName && { "targetName": el.targetName })
                        }
                    })
                }),
                ...(data.questionAnswer && {
                    "hasPart": data.questionAnswer.map(el => {
                        return {
                            "@context": "https://schema.org/",
                            "@type": el.type ?? "Question",
                            "eduQuestionType": el.cardType ?? 'Flashcard',
                            ...(el.question && { "text": el.question }),
                            ...(el.answer && {
                                "acceptedAnswer": {
                                    "@type": el.answer.type ?? "Answer",
                                    ...(el.answer.text && { "text": el.answer.text })
                                }
                            })
                        }
                    })
                })
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * Event Structured data
     * @param eventInfo - EventStructuredData
     * @returns - Event Structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/event
     * Usage:
     * 1. To publish any Event for any location or online.
     */
    event(eventInfo: EventStructuredData | Array<EventStructuredData>) {
        const create = (eventInfo: EventStructuredData) => {
            return eventInfo ? {
                "@context": "https://schema.org",
                "@type": "Event",
                ...(eventInfo.name && { "name": eventInfo.name }),
                ...(eventInfo.startDate && { "startDate": eventInfo.startDate }),
                ...(eventInfo.endDate && { "endDate": eventInfo.endDate }),
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                ...(eventInfo?.location && { "location": createLocationObject(eventInfo.location) }),
                ...(eventInfo.image?.length && { "image": eventInfo.image }),
                ...(eventInfo.description && { "description": eventInfo.description }),
                ...(eventInfo.offers && {
                    "offers": {
                        "@type": "Offer",
                        ...(eventInfo.offers.url && { "url": eventInfo.offers.url }),
                        ...(eventInfo.offers.hasOwnProperty('price') && { "price": eventInfo.offers.price ?? 0 }),
                        ...(eventInfo.offers.priceCurrency && { "priceCurrency": eventInfo.offers.priceCurrency }),
                        "availability": "https://schema.org/InStock",
                        ...(eventInfo.offers.validFrom && { "validFrom": eventInfo.offers.validFrom })
                    }
                }),
                ...(eventInfo.performer && {
                    "performer": {
                        "@type": "PerformingGroup",
                        "name": eventInfo.performer
                    }
                }),
                ...(eventInfo.organizer && {
                    "organizer": createOrganisationObject(eventInfo?.organizer)
                })
            } : null;
        };
        return (eventInfo instanceof Array) ? eventInfo.map(el => create(el)).filter(x => x !== null) : create(eventInfo);
    }
    
    /**
     * Fact Check structured data
     * @param data - FactCheckStructuredData
     * @returns - Fact Check structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/factcheck
     * Usage: 
     * 1. ClaimReview
     * 2. Claim
     * 3. Rating
     */
    factCheck(data: FactCheckStructuredData | Array<FactCheckStructuredData>) {
        const create = (data: FactCheckStructuredData) => {
            return data ? {
                "@context": "https://schema.org",
                "@type": data.type ?? "ClaimReview",
                ...(data.url && { "url": data.url }),
                ...(data.claimReviewed && { "claimReviewed": data.claimReviewed }),
                ...(data.author && { "author": createAuthorObject(data.author) }),
                ...(data.reviewRating && { "reviewRating": createRatingObject(data.reviewRating) }),
                ...(data.itemReviewed && {
                    "itemReviewed": {
                        "@type": data.itemReviewed.type ?? "Claim",
                        ...(data.itemReviewed.author && { "author": createAuthorObject(data.itemReviewed.author) }),
                        ...(data.itemReviewed.datePublished && { "datePublished": new Date(data.itemReviewed.datePublished).toISOString() }),
                        ...(data.itemReviewed.appearance && {
                            "appearance": {
                                "@type": data.itemReviewed.appearance.type ?? "OpinionNewsArticle",
                                ...(data.itemReviewed.appearance.url && { "url": data.itemReviewed.appearance.url }),
                                ...(data.itemReviewed.appearance.headline && { "headline": data.itemReviewed.appearance.headline }),
                                ...(data.itemReviewed.appearance.datePublished && { "datePublished": new Date(data.itemReviewed.appearance.datePublished).toISOString() }),
                                ...(data.itemReviewed.appearance.author && { "author": createAuthorObject(data.itemReviewed.appearance.author) }),
                                ...(data.itemReviewed.appearance.image && { "image": data.itemReviewed.appearance.image }),
                                ...(data.itemReviewed.appearance.publisher && { "publisher": createOrganisationObject(data.itemReviewed.appearance.publisher) })
                            }
                        })
                    }
                }),
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * FAQ structured data
     * @param data - FAQStructuredData
     * @returns - FAQ structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/faqpage
     * Usage:
     * 1. To show any info of a page
     */
    faq(data: FAQStructuredData | Array<FAQStructuredData>) {
        const create = (data: FAQStructuredData) => {
            return data ? {
                "@context": "https://schema.org",
                "@type": data.type ?? "FAQPage",
                ...(data.mainEntity?.length && {
                    "mainEntity": data.mainEntity.map(el => {
                        return {
                            "@type": el.type ?? "Question",
                            ...(el.name && { "name": el.name }),
                            ...(el.acceptedAnswer && {
                                "acceptedAnswer": {
                                    "@type": el.acceptedAnswer.type ?? "Answer",
                                    "text": el.acceptedAnswer.text
                                }
                            })
                        }
                    })
                })
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * Job posting structured data
     * @param data - JobPostingStructureData
     * @returns - Job posting structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/job-posting
     * Usage:
     * 1. JobPosting on careers page
     */
    jobPosting(data: JobPostingStructureData | Array<JobPostingStructureData>) {
        const create = (data: JobPostingStructureData) => {
            return {
                "@context": "https://schema.org/",
                "@type": data.type ?? 'JobPosting',
                ...(data.title && { "title": data.title }),
                ...(data.description && { "description": data.description }),
                ...(data.datePosted && { "datePosted": data.datePosted }),
                ...(data.validThrough && { "validThrough": new Date(data.validThrough).toISOString() }),
                ...(data.employmentType && { "employmentType": data.employmentType }),
                ...(data.jobLocationType && { "jobLocationType": data.jobLocationType }),
                ...(data.hasOwnProperty('experienceRequirements') && {
                    "experienceRequirements": {
                        "@type": "OccupationalExperienceRequirements",
                        "monthsOfExperience": data.experienceRequirements ?? 0
                    }
                }),
                ...(data.hiringOrganization && {
                    "hiringOrganization": createOrganisationObject(data.hiringOrganization)
                }),
                ...(data.identifier && {
                    "identifier": {
                        "@type": data.identifier.type ?? 'PropertyValue',
                        ...(data.identifier.name && { "name": data.identifier.name }),
                        ...(data.identifier.value && { "value": data.identifier.value })
                    }
                }),
                ...(data.jobLocation && {
                    "jobLocation": {
                        "@type": data.jobLocation.type ?? 'Place',
                        ...(data.jobLocation.address && {
                            "address": createAddressObject(data.jobLocation.address)
                        })
                    }
                }),
                ...(data.baseSalary && {
                    "baseSalary": {
                        "@type": data.baseSalary.type ?? 'MonetaryAmount',
                        ...(data.baseSalary.currency && { "currency": data.baseSalary.currency }),
                        ...(data.baseSalary.value && {
                            "value": {
                                "@type": data.baseSalary.value.type ?? 'QuantitativeValue',
                                ...(data.baseSalary.value.value && { "value": data.baseSalary.value.value }),
                                ...(data.baseSalary.value.unit && { "unitText": data.baseSalary.value.unit })
                            }
                        })
                    }
                }),
                ...(data.applicantLocationRequirements && {
                    "applicantLocationRequirements": data.applicantLocationRequirements?.map(el => {
                        return {
                            "@type": el.type ?? "Country",
                            ...(el.name && { "name": el.name })
                        }
                    })
                }),
                ...(data.educationRequirements && {
                    "educationRequirements": data.educationRequirements.map(el => {
                        return {
                            "@type": el.type ?? "EducationalOccupationalCredential",
                            ...(el.credentialCategory && { "credentialCategory": el.credentialCategory })
                        }
                    })
                })
            };
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }

    /**
     * Learning video structured data
     * @param data - LearningVideoStructuredData
     * @returns - Learning video structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/learning-video
     * Usage: Any video page
     */
    learningVideo(data: LearningVideoStructuredData | Array<LearningVideoStructuredData>) {
        const create = (data: LearningVideoStructuredData) => {
            return data ? {
                "@context": "https://schema.org",
                "@type": data.type ?? ["VideoObject", "LearningResource"],
                ...(data.name && {"name": data.name}),
                ...(data.description && {"description": data.description}),
                ...(data.educationalLevel && {"educationalLevel": data.educationalLevel}),
                ...(data.learningResourceType && {"learningResourceType": data.learningResourceType}),
                ...(data.text && {"text": data.text}),
                ...(data.contentUrl && {"contentUrl": data.contentUrl}),
                ...(data.uploadDate && {"uploadDate": new Date(data.uploadDate ?? new Date()).toISOString()}),
                ...(data.educationalAlignment && {"educationalAlignment": {
                  "@type": data.educationalAlignment.type ?? "AlignmentObject",
                  ...(data.educationalAlignment.educationalFramework && {"educationalFramework": data.educationalAlignment.educationalFramework}),
                  ...(data.educationalAlignment.targetName && {"targetName": data.educationalAlignment.targetName}),
                  ...(data.educationalAlignment.targetUrl && {"targetUrl": data.educationalAlignment.targetUrl})
                }}),
                ...(data.thumbnailUrls && {"thumbnailUrl": data.thumbnailUrls}),
                "hasPart": data.hasPart?.map(el => {
                    return {
                        "@type": el.type ?? ["Clip", "LearningResource"],
                        ...(el.learningResourceType && {"learningResourceType": el.learningResourceType}),
                        ...(el.name && {"name": el.name}),
                        ...(el.startOffset && {"startOffset": el.startOffset}),
                        ...(el.endOffset && {"endOffset": el.endOffset}),
                        ...(el.url && {"url": el.url})
                    }
                })
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * Local business structured data
     * @param data - LocalBusinessStructuredData
     * @returns - Local business structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/local-business
     * Usage: LocalBusiness posting
     */
    localBusiness(data: LocalBusinessStructuredData | Array<LocalBusinessStructuredData>) {
        const create = (data: LocalBusinessStructuredData) => {
            return data ? {
                "@context": "https://schema.org",
                "@type": data.type ?? 'Restaurant',
                ...(data.image && { "image": data.image }),
                ...(data.name && { "name": data.name }),
                ...(data.url && { "url": data.url }),
                ...(data.telephone && { "telephone": data.telephone }),
                ...(data.servesCuisine && { "servesCuisine": data.servesCuisine }),
                ...(data.priceRange && { "priceRange": data.priceRange }),
                ...(data.menu && { "menu": data.menu }),
                "acceptsReservations": data.hasOwnProperty("acceptsReservations") ? data.acceptsReservations : false,
                ...(data.address && {
                    "address": createAddressObject(data.address)
                }),
                ...(data.review && {
                    "review": {
                        "@type": data.review.type ?? 'Rating',
                        ...(data.review.rating && { "reviewRating": createRatingObject(data.review.rating) }),
                        ...(data.review.author && { "author": createAuthorObject(data.review.author) })
                    }
                }),
                ...(data.geo && {
                    "geo": createGeoObject(data.geo)
                }),
                ...(data.openingHoursSpecification?.length && {
                    "openingHoursSpecification": data.openingHoursSpecification.map(el => {
                        return {
                            "@type": "OpeningHoursSpecification",
                            ...(el.hasOwnProperty('dayOfWeek') && { "dayOfWeek": el.dayOfWeek }),
                            ...(el.opens && { "opens": el.opens }),
                            ...(el.closes && { "closes": el.closes })
                        }
                    })
                })
            } : null;
        }

        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * Logo structured data
     * @param data - LogoStructuredData
     * @returns - Logo structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/logo
     * Defines Organization
     */
    logo(data: LogoStructuredData | Array<LogoStructuredData>) {
        const create = (data: LogoStructuredData) => {
            return data ? {
                "@context": "https://schema.org",
                "@type": data.type ?? 'Organization',
                ...(data.url && { "url": data.url }),
                ...(data.logo && { "logo": data.logo })
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * Movie carousel structured data
     * @param data - Array<MovieStructuredData>
     * @returns - Movie carousel structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/movie
     * Usage: Movie list or review page
     */
    movie(data: Array<MovieStructuredData>) {
        return data ? {
            "@context": "https://schema.org",
            "@type": "ItemList",
            ...(data?.length && {
                "itemListElement": data.map((el, i) => {
                    return {
                        "@type": el.type ?? 'ListItem',
                        "position": i + 1,
                        ...(el.url && { "url": el.url }),
                        ...(el.item?.length && {
                            "item": el.item?.map(elm => {
                                return {
                                    "@type": elm.type ?? "Movie",
                                    ...(elm.url && { "url": elm.url }),
                                    ...(elm.name && { "name": elm.name }),
                                    ...(elm.hasOwnProperty('image') && { "image": elm.image }),
                                    ...(elm.dateCreated && { "dateCreated": new Date(elm.dateCreated).toISOString() }),
                                    ...(elm.director && {
                                        "director": {
                                            "@type": elm.director.type ?? "Person",
                                            ...(elm.director.name && { "name": elm.director.name })
                                        }
                                    }),
                                    ...(elm.review && {
                                        "review": {
                                            "@type": elm.review.type ?? "Review",
                                            ...(elm.review.reviewBody && { "reviewBody": elm.review.reviewBody }),
                                            ...(elm.review.reviewRating && { "reviewRating": createRatingObject(elm.review.reviewRating) }),
                                            ...(elm.review.author && { "author": createAuthorObject(elm.review.author) }),
                                        }
                                    }),
                                    ...(elm.aggregateRating && { "aggregateRating": createRatingObject(elm.aggregateRating) })
                                }
                            })
                        })
                    }
                })
            })
        } : null;
    }
    
    /**
     * Review snippet structured data
     * @param data - ReviewStructuredData
     * @returns - Review snippet structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
     * Usage: 
     * 1. Book Review
     * 2. Course Review
     * 3. Event Review
     * 4. Local business Review
     * 5. Movie Review
     * 6. Product Review
     * 7. Recipe Review
     * 8. Software App Review
     */
    review(data: ReviewStructuredData | Array<ReviewStructuredData>) {
        const create = (data: ReviewStructuredData) => {
            return data ? {
                "@context": "https://schema.org/",
                "@type": data.type ?? 'Restaurant',
                ...(data.name && { "name": data.name }),
                ...(data.itemReviewed && {
                    "itemReviewed": {
                        "@type": data.type ?? 'Restaurant',
                        ...(data.itemReviewed.image && { "image": data.itemReviewed.image }),
                        ...(data.itemReviewed.name && { "name": data.itemReviewed.name }),
                        ...(data.itemReviewed.servesCuisine && { "servesCuisine": data.itemReviewed.servesCuisine }),
                        ...(data.itemReviewed.priceRange && { "priceRange": data.itemReviewed.priceRange }),
                        ...(data.itemReviewed.telephone && { "telephone": data.itemReviewed.telephone }),
                        ...(data.itemReviewed.address && {
                            "address": createAddressObject(data.itemReviewed.address)
                        })
                    }
                }),
                ...(data.reviewRating && {
                    "reviewRating": createRatingObject(data.reviewRating)
                }),
                ...(data.author && {
                    "author": createAuthorObject(data.author)
                }),
                ...(data.publisher && {
                    "publisher": createOrganisationObject(data.publisher)
                })
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * Sitelinks search box structured data
     * @param data - SearchBoxStructuredData
     * @returns - Sitelinks search box structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
     * Usage: Landing page of searchable app
     */
    searchBox(data: SearchBoxStructuredData) {
        const potentialAction = (actions: SearchBoxStructuredDataPotentialAction) => {
            return {
                "@type": actions.type ?? "SearchAction",
                ...(actions.target && {
                    "target": {
                        "@type": actions.target.type ?? "EntryPoint",
                        ...(actions.target.urlTemplate && { "urlTemplate": actions.target.urlTemplate })
                    }
                }),
                ...(actions.queryInput && { "query-input": actions.queryInput })
            }
        }
        return data ? {
            "@context": "https://schema.org",
            "@type": data.type ?? 'WebSite',
            ...(data.url && { "url": data.url }),
            ...(data.potentialAction && {
                "potentialAction": (data.potentialAction instanceof Array) ? data.potentialAction.map(el => potentialAction(el)) : potentialAction(data.potentialAction)
            })
        } : null;
    }
    
    /**
     * Software App structured data
     * @param data - SoftwareApplicationStructureData
     * @returns - Software App structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/software-app
     * Usage: 
     * 1. Provide when you have an app of cuurent wesite
     */
    softwareApplication(data: SoftwareApplicationStructureData | Array<SoftwareApplicationStructureData>) {
        const create = (data: SoftwareApplicationStructureData) => {
            return data ? {
                "@context": "https://schema.org",
                "@type": data.type ?? "SoftwareApplication",
                ...(data.name && { "name": data.name }),
                ...(data.operatingSystem && { "operatingSystem": data.operatingSystem }),
                ...(data.category && { "applicationCategory": data.category }),
                ...(data.applicationLink && { "url": data.applicationLink }),
                ...(data.rating && {
                    "aggregateRating": createRatingObject(data.rating)
                })
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
    
    /**
     * Video structured data
     * @param data - VideoStructureData
     * @returns - Video structured data
     * Read: https://developers.google.com/search/docs/appearance/structured-data/video
     * Usage: 
     * 1. Live video page
     * 2. Video list page
     * 3. Faq Video clips page
     * 4. Update blog page
     */
    video(data: VideoStructureData | Array<VideoStructureData>) {
        const create = (data: VideoStructureData) => {
            return data ? {
                "@context": "https://schema.org",
                "@type": data.type ?? 'VideoObject',
                ...(data.name && { "name": data.name }),
                ...(data.description && { "description": data.description }),
                ...(data.thumbnailUrl && { "thumbnailUrl": data.thumbnailUrl }),
                ...(data.uploadDate && { "uploadDate": data.uploadDate }),
                ...(data.duration && { "duration": data.duration }),
                ...(data.contentUrl && { "contentUrl": data.contentUrl }),
                ...(data.embedUrl && { "embedUrl": data.embedUrl }),
                ...(data.regionsAllowed && { "regionsAllowed": data.regionsAllowed }),
                ...(data.viewCount && {
                    "interactionStatistic": {
                        "@type": "InteractionCounter",
                        "interactionType": {
                            "@type": "WatchAction"
                        },
                        ...(data.viewCount && { "userInteractionCount": data.viewCount })
                    }
                }),
                ...(data.publication && {
                    "publication": data.publication?.map(el => {
                        return {
                            "@type": el.type ?? "BroadcastEvent",
                            ...(el.hasOwnProperty('isLiveBroadcast') && { "isLiveBroadcast": !!el.isLiveBroadcast }),
                            ...(el.startDate && { "startDate": new Date(el.startDate).toISOString() }),
                            ...(el.endDate && { "endDate": new Date(el.endDate).toISOString() })
                        }
                    })
                }),
                ...(data.clips?.length && {
                    "hasPart": data.clips.map(el => {
                        return {
                            "@type": el.type ?? "Clip",
                            ...(el.name && { "name": el.name }),
                            ...(el.startOffset && { "startOffset": el.startOffset }),
                            ...(el.endOffset && { "endOffset": el.endOffset }),
                            ...(el.url && { "url": el.url })
                        }
                    })
                })
            } : null;
        }
        return (data instanceof Array) ? data.map(el => create(el)).filter(x => x !== null) : create(data);
    }
}