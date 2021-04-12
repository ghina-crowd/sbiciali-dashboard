import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {DataService} from "../../../../services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {EditContentComponent} from "../dialog/edit-content/edit-content.component";
import {ContentModel} from "../../../../models/user.model";

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    displayedColumns: string[] = ['content', 'type', 'action'];
    dataSource: any;
    page = 0;
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    id: number;
    public dummyElem = document.createElement('DIV');


    constructor(public restService: DataService,
                private dialog: MatDialog,
                private toastr: ToastrService) {

    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    getContent() {
        this.restService.getContent().then((res) => {
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

    openEditDialog(content: ContentModel) {
        let dialog = this.dialog.open(EditContentComponent);
        dialog.componentInstance.data = content;
        dialog.afterClosed().subscribe(result => {
            if (result) {
                let index = this.dataSource.filteredData.indexOf(content);
                this.dataSource.filteredData[index] = result;
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }

    openAddDialog() {
        let dialog = this.dialog.open(EditContentComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.dataSource.filteredData.push(result);
                this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
            }
        });
    }


    decode(text: string): string {
        var ret:string = "";
        this.dummyElem.innerHTML = text;
        document.body.appendChild(this.dummyElem);
        ret = this.dummyElem.textContent; // just grap the decoded string which contains the desired HTML tags
        document.body.removeChild(this.dummyElem);
        return ret;
    }


    ngOnInit() {
        this.getContent();
    }


}
