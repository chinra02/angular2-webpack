export class FilterParamsUtil {
    static prepareEqualParam(key: string, value: string): string {
        return '"' + key + '-eq"~' + '"' + value + '"';

    }
    static prepareContainsParam(key: string, value: string) {
        return '"' + key + '-contains"~' + '"' + value + '"';
    }
    static prepareGreaterThanParam(key: string, value: number|string) {
        return '"' + key + '-gt"~' + '"' + value + '"';
    }
    static prepareLessThanParam(key: string, value: number|string) {
        return '"' + key + '-gt"~' + '"' + value + '"';
    }
}