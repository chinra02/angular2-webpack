import { ObjectUtils } from './../../../../../utils/object-utils';
import { PagerModel } from '../../lib/pager.model';
import { ExceptionInfo } from '_debugger';
import { RowAction } from "./../actions/row-action.component";
import { DataSource } from '../../lib/data-source/data-source';
import { OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ng2-smart-table-pager',
    moduleId: module.id,
    templateUrl: './pager.component.html'
})
export class PagerComponent implements OnChanges {

    @Input() perPage: number;
    @Input() source: DataSource;
    @Output() paginated: EventEmitter<any> = new EventEmitter();

    protected pages: Array<any>;
    protected page: number;
    protected count: number = 0;
    protected pagerData: any;

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
        if (this.source && changes['source']) {
            this.source.onChanged().subscribe((changes) => {

                if (ObjectUtils.isNullOrUndefined(this.pagerData)) {
                    this.page = this.source.getPaging().page;
                    this.count = this.source.count();
                    this.perPage = this.source.getPaging().perPage;

                    if (this.isPageOutOfBounce()) {
                        this.source.setPage(--this.page);
                    }

                    this.processPageChange(changes);
                    this.initPages();
                }

            });

            this.source.onPagerDataChange().subscribe((pagerData: any) => {
                    this.pagerData = pagerData;
                    this.page = pagerData.start / pagerData.limit <= 0 ? 1 : (pagerData.start / pagerData.limit + 1);
                    this.count = pagerData.total;
                    this.perPage = pagerData.limit;

                if (this.isPageOutOfBounce()) {
                    this.source.setPage(--this.page);
                }
                this.initPages();
            });
        }

    }

    /* ngOnInit(): void {
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

     } */

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
        return (this.source && this.source.count() > this.perPage || this.count > this.perPage);
    }

    paginate(page: number): boolean {
        if (ObjectUtils.isNullOrUndefined(this.pagerData))
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
        this.processPages(showPagesCount, pagesCount);

    }

    private processPages(showPagesCount: number, pagesCount: number) {
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
