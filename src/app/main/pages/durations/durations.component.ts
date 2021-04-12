import { Component, OnInit } from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {DurationModel} from "../../../../models/duration.model";
import {EditDurationComponent} from "../dialog/edit-duration/edit-duration.component";

@Component({
  selector: 'app-durations',
  templateUrl: './durations.component.html',
  styleUrls: ['./durations.component.scss']
})
export class DurationsComponent implements OnInit {


    displayedColumns: string[] = ['_id', 'duration', 'type', 'unit', 'action'];
    dataSource: any;
    page = 0;
    types: DurationModel[] = [];
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


    deleteDuration(id) {
        // tslint:disable-next-line:prefer-const
        this.restService.deleteDuration(id).then((res) => {
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

    getDurations(type) {
        this.restService.getDurations(type).then((res) => {
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

    openEditDialog(duration: DurationModel) {
        let dialog = this.dialog.open(EditDurationComponent);
        dialog.componentInstance.data = duration;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(duration);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditDurationComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    ngOnInit() {
        this.getDurations('video');
    }

}
