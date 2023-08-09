import { AddressInterface } from "../interfaces/common";

export const createAddressObject = (address: AddressInterface) => {
    return address ? {
        "@type": address.type ?? 'PostalAddress',
        ...(address.streetAddress && { "streetAddress": address.streetAddress }),
        ...(address.addressLocality && { "addressLocality": address.addressLocality }),
        ...(address.addressRegion && { "addressRegion": address.addressRegion }),
        ...(address.postalCode && { "postalCode": address.postalCode }),
        ...(address.addressCountry && { "addressCountry": address.addressCountry })
    } : null;
}