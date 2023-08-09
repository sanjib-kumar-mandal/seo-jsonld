import { CreatorInterface } from "../interfaces/common";

export const createOrganisationObject = (org: CreatorInterface) => {
    const orgData = (data: CreatorInterface) => {
        return org ? {
            "@type": data.type ?? 'Organization',
            ...(data.url && { "url": data.url }),
            ...(data.name && { "name": data.name }),
            ...(data.sameAs && { "sameAs": data.sameAs }),
            ...(data.logo && {
                "logo": {
                    "@type": data.logo.type ?? "ImageObject",
                    ...(data.logo.url && { "url": data.logo.url })
                }
            }),
            ...(data.contactPoint && {
                "contactPoint": {
                    "@type": data.contactPoint.type ?? 'ContactPoint',
                    ...(data.contactPoint.contactType && { "contactType": data.contactPoint.contactType }),
                    ...(data.contactPoint.telephone && { "telephone": data.contactPoint.telephone }),
                    ...(data.contactPoint.email && { "email": data.contactPoint.email })
                }
            })
        } : null;
    }
    return org ? (org instanceof Array ? org.map(el => orgData(el)) : orgData(org)) : null;
}