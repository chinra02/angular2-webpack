export class ObjectUtils {

    static getArrayOfObjects(data: Array<string>): Array<Object> {
        let listOfObjects = new Array();
        data.forEach(item => {
            let obj: Object = new Object();
            obj['id'] = item;
            obj['label'] = item;
            obj['value'] = item;
            listOfObjects.push(obj);
        });
        return listOfObjects;

    }

    static contains(list: Array<any>, inputItem: any, checker: string): any {
        let matchedItem: any;
        if (ObjectUtils.isNotNullAndUndefined(list) && ObjectUtils.isNotNullAndUndefined(inputItem)) {
            list.forEach(item => {
                if (item[checker] === inputItem[checker])
                    matchedItem = item;
                return;
            })
        }
        return matchedItem;
    }

    static containsList(list: Array<any>, inputItem: any, checker: string): any {
        let matchedItem: Array<any> = new Array();
        if (ObjectUtils.isNotNullAndUndefined(list) && ObjectUtils.isNotNullAndUndefined(inputItem)) {
            list.forEach(item => {
                if (item[checker] === inputItem[checker])
                    matchedItem.push(item);

            })
        }
        return matchedItem;
    }

    static objectIsEmpty(obj: Object) {
        let isEmpty: boolean = true;
        if (ObjectUtils.isNotNullAndUndefined(obj)) {
            Object.keys(obj).forEach(item => {
                if (!ObjectUtils.isEmpty(obj[item]))
                    isEmpty = false;

            });
        }

        return isEmpty;
    }

    static containsItem(obj: Object, inputItem: any): boolean {
        let isEqual = false;
        if (ObjectUtils.isNotNullAndUndefined(obj) && ObjectUtils.isNotNullAndUndefined(inputItem)) {
            Object.keys(obj).forEach(item => {
                if (item === inputItem)
                    isEqual = true;
                return;
            })
        }
        return isEqual;
    }

    static containsItemWithChecker(obj: Object, inputItem: any, checker: string): boolean {
        let isEqual = false;
        if (ObjectUtils.isNotNullAndUndefined(obj) && ObjectUtils.isNotNullAndUndefined(inputItem))
            isEqual = obj[checker] === inputItem[checker];
        return isEqual;
    }

    static getIn(object: any, pathElems: (string | number)[]): any {
        if (!object) {
            return object;
        }

        // If this is an ImmutableJS structure, use existing getIn function
        if (typeof object.getIn === 'function') {
            return object.getIn(pathElems);
        }

        const [firstElem, ...restElems] = pathElems;

        if (undefined === object[firstElem]) {
            return undefined;
        }

        if (restElems.length === 0) {
            return object[firstElem];
        }

        return ObjectUtils.getIn(object[firstElem], restElems);
    }


    static isNullOrUndefined(value: any) {
        return value === null || value === undefined;
    }

    static isNotNullAndUndefined(value: any) {
        return value != null && value != undefined;
    }

    static isEmpty(value: string) {
        return value === null || value === undefined || (Object.keys(value.trim()).length === 0);
    }

    static isEmptyArray(value: Array<any>) {
        return value === null || value === undefined || (Object.keys(value).length === 0);
    }

    static crudRightToLeft(leftArray: Array<any>, rightArray: Array<any>) {
        let finalArray: Array<any> = new Array();
        rightArray.forEach(item => {
            let matchedItem = ObjectUtils.contains(leftArray, item, 'id');
            if (ObjectUtils.isNotNullAndUndefined(matchedItem)) {
                Object.keys(item).forEach(itemKey => {
                    matchedItem[itemKey] = item[itemKey];
                });
            }
            else {
                leftArray.push(item);
            }
        });
        return leftArray;
    }

    static getHeaderValue(response: any, headerKey: string): any {
        let returnValue: any = null;
        if (response.headers && response.headers._headers) {
            let map: Map<any, any> = response.headers._headers;
            map.forEach((value, key, map) => {
                if (key === headerKey) {
                    returnValue = value[0];

                }
            })
        }

        return JSON.parse(returnValue);
    }

    static joinObjectPropertyValues(objectArr: Array<any>, property: string, joiner: string): string {
        let filtedArray: Array<any> = new Array();
        if (!ObjectUtils.isEmptyArray(objectArr)) {
            objectArr.forEach(item => {
                if (item && item[property]) {
                    filtedArray.push(item[property]);
                }
            })
        }
        return filtedArray.join(joiner);

    }


}
