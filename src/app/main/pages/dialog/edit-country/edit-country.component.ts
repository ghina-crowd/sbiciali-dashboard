import { Component, OnInit } from '@angular/core';
import {TypeModel} from "../../../../../models/type.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../../models/category";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {CountryModel} from "../../../../../models/country.model";

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent implements OnInit {

    data: CountryModel;
    countryForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditCountryComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.countryForm.controls;
    }

    addNewType() {
        // tslint:disable-next-line:prefer-const
        let countryModel: CountryModel = this.countryForm.value as CountryModel;
        this.restService.addCountry(countryModel).then((res) => {
            this.toastr.success('The country has been added successfully', '');
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
        let countryModel: CountryModel = this.countryForm.value as CountryModel;
        this.restService.updateCountry(countryModel).then((res) => {
            this.toastr.success('The country has been updated successfully', '');
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
        this.countryForm = this._formBuilder.group({
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            active: [null, [Validators.required]],
            image: [null , [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {
        this.prepareForm();
        if (this.data) {
            this.countryForm.patchValue(this.data);
        }
    }

}
