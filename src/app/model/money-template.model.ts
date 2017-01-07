import { ObjectUtils } from './../utils/object-utils';
export class MoneyTemplateModel {

    private range: Range = new Range();

    public get $range(): Range {
        return this.range;
    }

    public set $range(value: Range) {
        this.range = value;
    }


    constructor(private newRange: Range = null) {
        if (ObjectUtils.isNotNullAndUndefined(newRange))
            this.$range = newRange;
        else
            this.range = new Range();
    }


}

export class Range {


    constructor(private lowValue: any = null, private highValue: any = null) {
        this.$high = highValue;
        this.$low = lowValue;
    }


    private low: any;
    private high: any;

    public get $low(): any {
        return this.low;
    }

    public set $low(value: any) {
        this.low = value;
    }

    public get $high(): any {
        return this.high;
    }

    public set $high(value: any) {
        this.high = value;
    }

    static isHighAlone(value:Range): boolean {
        return ObjectUtils.isNotNullAndUndefined(value.$high) && ObjectUtils.isNullOrUndefined(value.$low);
    }

    static isLowAlone(value:Range): boolean {
        return ObjectUtils.isNotNullAndUndefined(value.$low) && ObjectUtils.isNullOrUndefined(value.$high);
    }

    static isHighAndLowAvailable(value:Range): boolean {
        return ObjectUtils.isNotNullAndUndefined(value.$high) && ObjectUtils.isNotNullAndUndefined(value.$low);
    }



}