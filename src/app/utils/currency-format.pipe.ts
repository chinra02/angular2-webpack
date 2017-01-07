import { Pipe, PipeTransform } from "@angular/core";

const PADDING = "000000";

@Pipe({ name: "currencyFormatter" })
export class CurrencyFormatPipe implements PipeTransform {

  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;

  constructor() {
    // TODO comes from configuration settings
    this.DECIMAL_SEPARATOR = ".";
    this.THOUSANDS_SEPARATOR = ",";
  }

  transform(value: number | string, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").toString()
      .split(this.DECIMAL_SEPARATOR);

    fraction = fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
    let transformedValue =  this.hanldleSymbol(integer,fraction);
    return transformedValue;
  }

  parse(value: string, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").split(this.DECIMAL_SEPARATOR);

    integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, "g"), "");

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
      : "";
    let transformedValue =  this.hanldleSymbol(integer,fraction);
    return transformedValue;
  }

  hanldleSymbol = function hanldleSymbol(integer,fraction):string{
     let transformedValue = integer + fraction;
    if(transformedValue && transformedValue.indexOf('$')<0){
         transformedValue= this.currencySymbol(null) + transformedValue;
    }
   
    return transformedValue;
  }

  currencySymbol = function currencySymbol(currencySymbol):string {
        if (currencySymbol) {
              return currencySymbol;
        } else {
              return '$ ';
        }
  }

}