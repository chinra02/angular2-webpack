export class NameTemplateModel {

    private first: string;
    private last: string;
    private middle: string;
    public  param: string;

    public get $first(): string {
        return this.first;
    }

    public set $first(value: string) {
        this.first = value;
    }
    public get $last(): string {
        return this.last;
    }

    public set $last(value: string) {
        this.last = value;
    }


    public get $middle(): string {
        return this.middle;
    }

    constructor(private firstName: string = null, private middleName: string = null, private lastName: string = null) {
        this.first = firstName;
        this.last = lastName;
        this.$middle = middleName;
    }
    public set $middle(value: string) {
        this.middle = value;
    }


}