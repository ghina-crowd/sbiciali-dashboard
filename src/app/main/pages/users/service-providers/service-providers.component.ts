import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {UserModel} from "../../../../../models/user.model";
import {DataService} from "../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {MatTableDataSource} from "@angular/material/table";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {PaginationModel} from "../../../../../models/pagination.model";

@Component({
    selector: 'app-service-providers',
    templateUrl: './service-providers.component.html',
    styleUrls: ['./service-providers.component.scss']
})
export class ServiceProvidersComponent implements OnInit {

    displayedColumns: string[] = ['name', 'email', 'phone', 'active', 'action'];
    dataSource: any;
    pageEvent: PageEvent;
    length: number;
    pageSize = 12;
    type: string;
    users: UserModel[];
    pagination = new PaginationModel();


    constructor(private restService: DataService,
                private toastr: ToastrService) {
        this.pagination.page = 0;
        this.pagination.limit = 20;
        this.pagination.role = 'celebrity';
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
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }


    activeBlock(data: UserModel, status) {
        // tslint:disable-next-line:prefer-const
        data.active = status;
        this.restService.editUser(data).then((res) => {
            if (res.code === 200) {
                let index = this.users.findIndex(item => item._id == data._id);
                this.users[index].active = status;
                this.dataSource = new MatTableDataSource(this.users);

                Swal.fire(
                    'Update!',
                    'the user status has been updated.',
                    'success'
                );
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
