import { Component, OnInit } from '@angular/core';
import {Category} from "../../../../../models/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {TypeModel} from "../../../../../models/type.model";

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent implements OnInit {

    data: TypeModel;
    typeForm: FormGroup;
    categories: Category[] =[];

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditTypeComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.typeForm.controls;
    }

    addNewType() {
        // tslint:disable-next-line:prefer-const
        let typeModel: TypeModel = this.typeForm.value as TypeModel;
        this.restService.addType(typeModel).then((res) => {
            this.toastr.success('The type has been added successfully', '');
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
        let typeModel: TypeModel = this.typeForm.value as TypeModel;
        this.restService.updateType(typeModel).then((res) => {
            this.toastr.success('The type has been updated successfully', '');
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

    getCategories() {
        this.restService.getCategories().then((res) => {
            this.categories = res.results;
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
        this.typeForm = this._formBuilder.group({
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            active: [null, [Validators.required]],
            category: [null , [Validators.required]],
            _id: [null]
        });

    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {
        this.prepareForm();
        this.getCategories();
        if (this.data) {
            this.typeForm.patchValue(this.data);
            this.f.category.setValue(this.data.category._id);
        }
    }

}
