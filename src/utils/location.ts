import { AddressType, LocationType } from "../enums/enums"
import { createAddressObject } from "./address";

export const createLocationObject = (data: any) => {
    return data ? {
        "@type": data.type ?? LocationType.Place,
        ...(data.name && { "name": data.name }),
        ...(data.address && {
            "address": createAddressObject(data.address)
        }),
        ...(data.url && { "url": data.url })
    } : null;
}