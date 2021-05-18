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
import Swal from "sweetalert2";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

    pagination = new PaginationModel();
    displayedColumns: string[] = ['title_ar', 'title_en', 'status' , 'action'];
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

    deleteConfirm(id) {
        // tslint:disable-next-line:prefer-const
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete this news ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.deleteNews(id);

                }
            });
    }

    deleteNews(id) {
        // tslint:disable-next-line:prefer-const
        this.restService.deleteNews(id).then((res) => {
            this.dataSource.filteredData = this.dataSource.filteredData.filter(item => item._id !== id);
            this.dataSource = new MatTableDataSource(this.dataSource.filteredData);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
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
