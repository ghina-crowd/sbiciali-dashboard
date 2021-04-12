import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {UserModel} from "../../../../../models/user.model";
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {PaginationModel} from "../../../../../models/pagination.model";

@Component({
  selector: 'app-normal-user',
  templateUrl: './normal-user.component.html',
  styleUrls: ['./normal-user.component.scss']
})
export class NormalUserComponent implements OnInit {

    displayedColumns: string[] = ['user_admin_id', 'first_name', 'last_name', 'email', 'phone' ,  'active', 'action'];
    dataSource: any;
    pageEvent: PageEvent;
    pageSize = 12;
    length: number;
    type: string;
    users: UserModel[];
    pagination = new PaginationModel();


    constructor(private restService: DataService,
                private toastr: ToastrService) {
        this.pagination.page = 0 ;
        this.pagination.limit = 20 ;
        this.pagination.role = 'normal' ;
    }

    applyFilter(filterValue: string) {
        if (this.pageEvent) {
            this.pageEvent.pageIndex = 0;
        }
        this.getUsers();
    }

    getUsers() {
        // tslint:disable-next-line:prefer-const
        if (this.pageEvent) {
            this.pagination.page = this.pageEvent.pageIndex;
        }
        this.restService.getUsers(this.pagination).then((res) => {
            this.length = res.totalResults;
                this.dataSource = new MatTableDataSource(res.results);
                this.users = res.results;

        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }



    activeBlock(data: UserModel, status) {
        // tslint:disable-next-line:prefer-const
        data.active = status;
        // this.restService.activeBlockUser(data).then((res) => {
        //     if (res.code === 200) {
        //         let index = this.users.findIndex(item => item.user_id == data.user_id);
        //         this.users[index].active = status;
        //         this.dataSource = new MatTableDataSource(this.users);
        //
        //         Swal.fire(
        //             'Update!',
        //             'the user status has been updated.',
        //             'success'
        //         );
        //     } else {
        //         this.toastr.error(res.message, '');
        //     }
        // }).catch((err: HttpErrorResponse) => {

        // });
    }


    confirmeActiveBlock(item, status) {
        let statusName: string;
        if (status == 1) {
            statusName = 'active';
        } else if (status == 0) {
            statusName = 'unactive';
        } else if (status == 2) {
            statusName = 'block';
        } else {
            statusName = 'active';
        }

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure you want to ' + statusName + ' this user ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, ' + statusName + ' it!',
            cancelButtonText: 'No, keep it'
        })
            .then(result => {
                if (result.value) {
                    this.activeBlock(item, status);

                }
            });
    }


    ngOnInit() {
        this.getUsers();

    }

}
