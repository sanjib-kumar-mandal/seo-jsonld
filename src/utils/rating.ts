import { ReviewInterface } from "../interfaces/common";

export const createRatingObject = (data: ReviewInterface) => {
    return data ? {
        "@type": data.type ?? 'Rating',
        ...(data.alternateName && { "alternateName": data.alternateName }),
        ...(data.bestRating && { "bestRating": data.bestRating }),
        ...(data.bestValue && { "bestValue": data.bestValue }),
        ...(data.ratingValue && { "ratingValue": data.ratingValue }),
        ...(data.worstRating && { "worstRating": data.worstRating }),
        ...(data.value && { "ratingValue": data.value }),
        ...(data.count && { "ratingCount": data.count })
    } : null;
}