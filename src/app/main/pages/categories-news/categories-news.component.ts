import {Component, OnInit} from '@angular/core';
import {Category} from "../../../../models/category";
import {PageEvent} from "@angular/material/paginator";
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import {EditNewsCategoryComponent} from "../dialog/edit-news-category/edit-news-category.component";


@Component({
  selector: 'app-categories-news',
  templateUrl: './categories-news.component.html',
  styleUrls: ['./categories-news.component.scss']
})
export class CategoriesNewsComponent implements OnInit {

    displayedColumns: string[] = ['category_id', 'name_en', 'name_ar',  'status', 'action'];
    dataSource: any;
    page = 0;
    categories: Category[] = [];
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    id: number;
    decoded: any;


    constructor(public restService: DataService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    updateCategory(category: Category, value) {
        // tslint:disable-next-line:prefer-const
        category.active = value;
        this.restService.updateCategoryNews(category).then((res) => {
            this.toastr.success('The category has been updated successfully', '');

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    getCategories() {
        this.restService.getCategoriesNews().then((res) => {
            this.categories = res.results;
            this.dataSource = new MatTableDataSource(this.categories);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    openEditDialog(category: Category) {
        let dialog = this.dialog.open(EditNewsCategoryComponent);
        dialog.componentInstance.data = category;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(category);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditNewsCategoryComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    ngOnInit() {
        this.getCategories();
    }


}
