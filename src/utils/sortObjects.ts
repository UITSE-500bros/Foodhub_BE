export function sortObject(obj: { [key: string]: any }): { [key: string]: string } {
    const sorted: { [key: string]: string } = {};
    const keys: string[] = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(encodeURIComponent(key));
        }
    }

    keys.sort();

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        sorted[key] = encodeURIComponent(obj[decodeURIComponent(key)]).replace(/%20/g, "+");
    }

    return sorted;
}