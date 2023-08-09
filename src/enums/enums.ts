export enum AddressType {
    PostalAddress = 'PostalAddress'
}

export enum LocationType {
    // For location type 'Place'
    // You need to provide following fields
    // 1. name
    // 2. address
    //      i. streetAddress
    //      ii. addressLocality
    //      iii. postalCode
    //      iv. addressRegion
    //      v. addressCountry
    Place = 'Place',
    // For location type 'VirtualLocation'
    // You need to provide following data
    // 1. url
    VirtualLocation = 'VirtualLocation'
}