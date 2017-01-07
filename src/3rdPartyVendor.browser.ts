// For  example Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module


import 'angular2-jwt';
import 'angular2-select';
import 'base64-js';
import 'buffer';
import 'convert-hex';
import 'convert-string';
import 'isarray';
import 'angular2-select';
import 'ng2-bootstrap';
import 'reflect-metadata';
import 'sha256';
import 'underscore';


// Some 3rdParty libraries are not working moving to 3rdPartyVendor bundle, So commenting for now
/*
import  'ng2-dropdown';
import  'ng2-modal';
import  'ng2-popover';
import  'ng2-tooltip';
import  'angular2-dynamic-component';
import  'ts-metadata-helper';
 */



if ('production' === ENV) {
  // Production


} else {
  // Development

}