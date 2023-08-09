import { UpdateDOMInterface } from "../interfaces/common";

const attachElement = (data: any, id: string, document: Document): void => {
    const element = document.createElement('script');
    element.type = 'application/ld+json';
    element.innerText = data;
    element.id = id;
    document.head.append(element);
}

const deleteElement = (id: string, document: Document): void => {
    const allScripts = document.head.getElementsByTagName("script");
    for (let i = 0, l = allScripts.length; i < l; ++i) { 
        if (allScripts[i].id === id && allScripts[i].type === 'application/ld+json') {
            allScripts[i].remove();
        }
    }
}

const updateElement = (id: string, data: any, document: Document): void => {
    if (!document) throw new Error("[Document] not provided");
    if (!data) deleteElement(id, document);
    const allScripts = document.head.getElementsByTagName('script');
    for (let i = 0, l = allScripts.length; i < l; ++i) { 
        if (allScripts[i].id === id && allScripts[i].type === 'application/ld+json') {
            allScripts[i].innerText = data;
        }
    }
}

/**
 * Call this method for adding any provided jsonld to the head element of the DOM
 * @param options - UpdateDOMInterface
 */
export const appendToHeadElement = (options: UpdateDOMInterface): void => {
    if (!options) throw new Error("Please provide options.");
    if (!options.document) throw new Error("[document] is missing");
    if (!options.type) throw new Error("[StructureDataType] not provided");
    const id = options.uniqueIdentifier ?? options.type;
    if (options.data) {
        const result = (options.data instanceof Array) ? options.data.map(el => JSON.stringify(el)) : JSON.stringify(options.data);
        const allScripts = document.head.getElementsByTagName("script");
        let isExists = false;
        for (let i = 0, l = allScripts.length; i < l; ++i) { 
            if (allScripts[i].id === id && allScripts[i].type === 'application/ld+json') {
                isExists = true;
                updateElement(id, result, document);
                break;
            }
        }
        if (!isExists) attachElement(result, id, options.document);
    } else {
        deleteElement(id, options.document);
        throw new Error("Need a [json or object] to build a structure. Please use provided interfaces for creating json.");
    }
}