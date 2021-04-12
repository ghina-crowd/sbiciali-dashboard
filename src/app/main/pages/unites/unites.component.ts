import { Component, OnInit } from '@angular/core';
import {TypeModel} from "../../../../models/type.model";
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {EditUnitComponent} from "../dialog/edit-unit/edit-unit.component";

@Component({
  selector: 'app-unites',
  templateUrl: './unites.component.html',
  styleUrls: ['./unites.component.scss']
})
export class UnitesComponent implements OnInit {


    displayedColumns: string[] = ['_id', 'name_en', 'name_ar', 'action'];
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


    deleteUnit(id) {
        // tslint:disable-next-line:prefer-const

        this.restService.deleteUnit(id).then((res) => {
            this.dataSource.filteredData = this.dataSource.filteredData.filter(item => item._id !== id);
            this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            this.toastr.success('The unit has been deleted successfully', '');
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    getUnites() {
        this.restService.getUnites().then((res) => {
            this.dataSource = new MatTableDataSource(res.results);
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
        let dialog = this.dialog.open(EditUnitComponent);
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
        let dialog = this.dialog.open(EditUnitComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    ngOnInit() {
        this.getUnites();
    }

}
