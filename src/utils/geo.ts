import { GeoInterface } from "../interfaces/common";

export const createGeoObject = (geo: GeoInterface) => {
    return geo ? {
        "@type": geo.type ?? 'GeoCoordinates',
        ...(geo.latitude && { "latitude": geo.latitude }),
        ...(geo.longitude && { "longitude": geo.longitude }),
        ...(geo.box && {"box": geo.box})
    } : null;
}