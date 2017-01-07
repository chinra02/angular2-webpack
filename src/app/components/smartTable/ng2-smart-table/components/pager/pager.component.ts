import { RowAction } from "./../actions/row-action.component";
import { DataSource } from '../../lib/data-source/data-source';
import { OnChanges, SimpleChange, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ng2-smart-table-pager',
    moduleId: module.id,
    templateUrl: './pager.component.html',
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class PagerComponent implements OnInit {

    @Input() perPage: number;
    @Input() source: DataSource;
    @Output() paginated: EventEmitter<any> = new EventEmitter();

    protected pages: Array<any>;
    protected page: number;
    protected count: number = 0;

    constructor(private changeDetector:ChangeDetectorRef){}

    /*  ngOnChanges(changes:{ [propertyName: string]: SimpleChange }):void {
          if (this.source && changes['source']) {
              this.source.onChanged().subscribe((changes) => {
                  this.page = this.source.getPaging().page;
                  this.count = this.source.count();
                  this.perPage = this.source.getPaging().perPage;
  
                  if (this.isPageOutOfBounce()) {
                      this.source.setPage(--this.page);
                  }
  
                  this.processPageChange(changes);
                  this.initPages();
              });
          }
  
      } */

    ngOnInit(): void {
        this.source.onChanged().subscribe((changes) => {
            if (changes['elements'] && changes['elements'].length > 0) {
                console.log(changes)
                this.page = this.source.getPaging().page;
                this.count = this.source.count();
                this.perPage = this.source.getPaging().perPage;

                if (this.isPageOutOfBounce()) {
                    this.source.setPage(--this.page);
                }

                this.processPageChange(changes);
                this.initPages();
                this.changeDetector.markForCheck();
            }

        });

    }

    /**
     * We change the page here depending on the action performed against data source
     * if a new element was added to the end of the table - then change the page to the last
     * if a new element was added to the beginning of the table - then to the first page
     * @param changes
     */
    processPageChange(changes: any): void {
        if (changes['action'] === 'prepend') {
            this.source.setPage(1);
        }
        if (changes['action'] === 'append') {
            this.source.setPage(this.getLast());
        }

    }

    shouldShow(): boolean {
        return this.source && this.source.count() > this.perPage;
    }

    paginate(page: number): boolean {
        this.source.setPage(page);
        this.page = page;
        this.paginated.emit(this);
        return false;
    }

    getPage(): number {
        return this.page;
    }

    getPages(): Array<any> {
        return this.pages;
    }

    getLast(): number {
        return Math.ceil(this.count / this.perPage);
    }

    protected isPageOutOfBounce(): boolean {
        return (this.page * this.perPage) >= (this.count + this.perPage) && this.page > 1;
    }

    protected initPages() {
        let pagesCount = this.getLast();
        let showPagesCount = 4;
        showPagesCount = pagesCount < showPagesCount ? pagesCount : showPagesCount;
        this.pages = [];

        if (this.shouldShow()) {

            let middleOne = Math.ceil(showPagesCount / 2);
            middleOne = this.page >= middleOne ? this.page : middleOne;

            let lastOne = middleOne + Math.floor(showPagesCount / 2);
            lastOne = lastOne >= pagesCount ? pagesCount : lastOne;

            let firstOne = lastOne - showPagesCount + 1;

            for (let i = firstOne; i <= lastOne; i++) {
                this.pages.push(i);
            }
        }
    }
}
