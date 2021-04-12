import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {PaginationModel} from "../../../../models/pagination.model";
import {NewsModel} from "../../../../models/news.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    pagination = new PaginationModel();
    displayedColumns: string[] = ['_id', 'title_ar', 'title_en', 'status' , 'action'];
    dataSource: any;
    page = 0;
    news: NewsModel[] = [];
    length: number;
    id: number;
    pageEvent: PageEvent;


    constructor(public restService: DataService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private toastr: ToastrService) {
        this.pagination.page = 0;
        this.pagination.limit = 20;

    }


    update(data: NewsModel , status) {
        data.active = status.toString();
        this.restService.updateNews(data).then((res) => {
            this.toastr.success('updated successfully', '');
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }


    getNews() {
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
        }
        this.restService.getNews(this.pagination).then((res) => {
            this.news = res.results;
            this.length = res.totalResults;
            this.dataSource = new MatTableDataSource(this.news);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }



    ngOnInit() {
      this.getNews();
  }

}
