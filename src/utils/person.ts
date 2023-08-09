export const createPersonObject = (person: any) => {
    return person ? {
        "@type": person.type ?? "Person",
        ...(person.name && { "name": person.name }),
        ...(person.profileUrl && { "url": person.profileUrl })
    } : null;
}