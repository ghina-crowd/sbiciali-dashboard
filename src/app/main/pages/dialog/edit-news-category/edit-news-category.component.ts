import { Component, OnInit } from '@angular/core';
import {Category} from "../../../../../models/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-news-category',
  templateUrl: './edit-news-category.component.html',
  styleUrls: ['./edit-news-category.component.scss']
})
export class EditNewsCategoryComponent implements OnInit {
    data: Category;
    categoryForm: FormGroup;


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditNewsCategoryComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.categoryForm.controls;
    }

    addNewCategory() {
        // tslint:disable-next-line:prefer-const
        let categoryModel: Category = this.categoryForm.value as Category;
        this.restService.addCategoryNews(categoryModel).then((res) => {
            this.toastr.success('The category has been added successfully', '');
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }



    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let categoryModel: Category = this.categoryForm.value as Category;
        this.restService.updateCategoryNews(categoryModel).then((res) => {
            this.toastr.success('The category has been updated successfully', '');
            this.dialogRef.close(res);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    prepareForm() {
        this.categoryForm = this._formBuilder.group({
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            active: [null, [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {

        this.prepareForm();
        if (this.data) {
            this.categoryForm.patchValue(this.data);
        }
    }

}
