export class NavItemModal{
    private id:string;
    private navItemName:string;
    private url:string;
    private selected:boolean;

    constructor(private itemId:string, private itemName:string,private itemUrl:string){
       this.id=itemId;
       this.itemName = itemName;
       this.url = itemUrl;
    }
}