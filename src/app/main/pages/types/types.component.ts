import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {TypeModel} from "../../../../models/type.model";
import {EditTypeComponent} from "../dialog/edit-type/edit-type.component";
import Swal from "sweetalert2";
import {typeofExpr} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

    displayedColumns: string[] = [ 'name_en', 'name_ar', 'category', 'status', 'action'];
    dataSource: any;
    page = 0;
    types: TypeModel[] = [];
    length: number;
    id: number;


    constructor(public restService: DataService,
                private activatedRoute: ActivatedRoute,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    deleteConfirm(id) {
        // tslint:disable-next-line:prefer-const
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to type this user ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.deleteType(id);

                }
            });
    }

    deleteType(id) {
        // tslint:disable-next-line:prefer-const
        this.restService.deleteType(id).then((res) => {
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



    updateType(type: TypeModel, value) {
        // tslint:disable-next-line:prefer-const
        type.active = value;
        type.category = type.category._id;
        this.restService.updateType(type).then((res) => {
            this.toastr.success('The type has been updated successfully', '');
            type.category = res.category;

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    getTypes() {
        this.restService.getTypes().then((res) => {
            this.types = res.results;
            this.dataSource = new MatTableDataSource(this.types);
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    openEditDialog(type: TypeModel) {
        let dialog = this.dialog.open(EditTypeComponent);
        dialog.componentInstance.data = type;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(type);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditTypeComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    ngOnInit() {
        this.getTypes();
    }

}
