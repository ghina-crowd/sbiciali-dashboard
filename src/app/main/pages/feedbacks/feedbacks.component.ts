import {Component, OnInit} from '@angular/core';
import {FeedbackModel} from "../../../../models/user.model";
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {PaginationModel} from "../../../../models/pagination.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-feedbacks',
    templateUrl: './feedbacks.component.html',
    styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {
    dataSource: any;
    pageEvent: PageEvent;


    displayedColumns: string[] = ['type' , 'name', 'email'  , 'phone' , 'facebook' , 'instagram'  , 'details', 'date'];
    page = 0;
    categories: FeedbackModel[] = [];
    length: number;
    id: number;
    pagination = new PaginationModel();


    constructor(public restService: DataService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private toastr: ToastrService) {
        this.pagination.page = 0 ;
        this.pagination.limit = 20 ;

    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    updateFeedback(feed: FeedbackModel, value) {
        // tslint:disable-next-line:prefer-const
        feed.active = value;
        this.restService.updateFeedback(feed).then((res) => {
            if (res.code === 200) {
                this.toastr.success('The feedback has been updated successfully', '');
            } else {
                this.toastr.error(res.message, '');
            }
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    getFeedbacks() {
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
        }
        this.restService.getFeedbacks(this.pagination).then((res) => {
            this.length = res.totalResults;
            this.dataSource = new MatTableDataSource(res.results);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }

        });
    }


    ngOnInit() {
        this.getFeedbacks();
    }

}
