export class ObjectUtils {

    static getArrayOfObjects(data: Array<string>): Array<Object> {
        let listOfObjects = new Array<Object>();
        data.forEach(item => {
            let obj: Object = new Object();
            obj['id'] = item;
            obj['label'] = item;
            obj['value'] = item;
            listOfObjects.push(obj);
        });
        return listOfObjects;

    }

    static contains(list: Array<any>, inputItem: any,checker:string): any {
        let matchedItem:any;
        if (ObjectUtils.isNotNullAndUndefined(list) && ObjectUtils.isNotNullAndUndefined(inputItem)) {
            list.forEach(item => {
                if (item[checker] === inputItem[checker])
                    matchedItem = item;
                return;
            })
        }
        return matchedItem;
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

    static getIn(object:any, pathElems: (string | number)[]): any {
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

    static crudRightToLeft(leftArray:Array<any>,rightArray:Array<any>){
      let finalArray:Array<any> = new Array<any>();
      rightArray.forEach(item=>{
          let matchedItem = ObjectUtils.contains(leftArray,item,'id');
          if(ObjectUtils.isNotNullAndUndefined(matchedItem)){
             Object.keys(item).forEach(itemKey=>{
                 matchedItem[itemKey]=item[itemKey];
             })
          }
          else {
             leftArray.push(item); 
          }
      });
      return leftArray;
    }


}

