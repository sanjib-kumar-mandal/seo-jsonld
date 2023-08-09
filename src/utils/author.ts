import { AuthorInterface } from "../interfaces/common";

export const createAuthorObject = (author: AuthorInterface) => {
    return author ? {
        "@type": author.type ?? 'Person',
        ...(author.name && { "name": author.name }),
        ...(author.sameAs && {"sameAs": author.sameAs}),
        ...(author.givenName && {"givenName": author.givenName}),
        ...(author.familyName && {"familyName": author.familyName}),
        ...(author.profileUrl && {"profileUrl": author.profileUrl}),
    } : null;
}