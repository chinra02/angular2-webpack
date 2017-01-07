/**
 * This function returns true if input is String, Date, or RegExp
 *
 * @param val
 * @returns {boolean}
 */
function isStringDateOrRegExp(val: any) {
    return (val instanceof String
    || val instanceof Date
    || val instanceof RegExp);
}

/**
 * This function returns clones input of String, Date, or RegExp
 *
 * @param val
 * @returns {boolean}
 */
function cloneStringDateOrRegExp(val: any): any {
    if (val instanceof String) {
        return String(val.length);
    } else if (val instanceof Date) {
        return new Date(val.getTime());
    } else if (val instanceof RegExp) {
        return new RegExp(val);
    } else {
        throw new Error('Unexpected situation');
    }
}

/**
 * This will recursively clone an array.
 *
 * @param array
 * @returns {Array}
 */
function deepCloneArray(array: any): any {
    let clone = [];
    array.forEach(function (item: any, index: any) {
        if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                clone[index] = deepCloneArray(item);
            } else if (isStringDateOrRegExp(item)) {
                clone[index] = cloneStringDateOrRegExp(item);
            } else {
                clone[index] = deepExtend({}, item);
            }
        } else {
            clone[index] = item;
        }
    });
    return clone;
}

/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 *     deepExtend(objectYouWantToExtend, objectToAdd_1[, objectToAdd_N]);
 *
 * If you wish to clone source object (without modifying it), just use empty new
 * object as first argument, like this:
 *
 *     deepExtend({}, yourObj_1, [yourObj_N]);
 *
 * @param objects
 * @returns {any}
 */
export const deepExtend = function (...objects: any[]): any {
    if (arguments == null || arguments == undefined || arguments.length < 1 || typeof arguments[0] !== 'object') {
        return false;
    }

    if (arguments.length < 2) {
        return arguments[0];
    }

    let targetObject = arguments[0];

    let otherObjects = Array.prototype.slice.call(arguments, 1);

    otherObjects.forEach(function (obj: any) {
        addOtherObjectToTarget(obj, targetObject);
    });

    return targetObject;
};

function addOtherObjectToTarget(obj: Object, targetObject: Object): void {
    // skip argument if it is array or isn't object
    if (obj == null || obj == undefined || typeof obj !== 'object' || Array.isArray(obj)) {
        return;
    }

    Object.keys(obj).forEach(function (key) {

        let source = targetObject[key]; // source value
        let newVal = obj[key]; // new value

        // recursion prevention
        if (newVal === targetObject) return;

        // if new value isn't object then just overwrite with new value instead of extending.
        if (typeof newVal !== 'object' || newVal === null) {
            targetObject[key] = newVal;
            return;
        }
        // Clone arrays (and recursively clone objects inside)
        if (Array.isArray(newVal)) {
            targetObject[key] = deepCloneArray(newVal);
            return;
        }
        // Custom cloning and overwrite for String, Date, RegExp objects
        if (isStringDateOrRegExp(newVal)) {
            targetObject[key] = cloneStringDateOrRegExp(newVal);
            return;
        }
        // if source isn't object or array overwrite with new value
        if (typeof source !== 'object' || source === null || Array.isArray(source)) {
            targetObject[key] = deepExtend({}, newVal); // TODO: Unexpected side effects of deleting?
            return;
        }
        // source value and new value are both objects, extending...
        targetObject[key] = deepExtend(source, newVal);
        return;
    });
}

export class Deferred {

    promise: Promise<any>;

    resolve: any;
    reject: any;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        })
    }
}