import { Component, OnInit } from '@angular/core';
import {TypeModel} from "../../../../../models/type.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../../../models/category";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {UnitModel} from "../../../../../models/unit.model";

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent implements OnInit {

    data: TypeModel;
    unitForm: FormGroup;
    categories: Category[] =[];

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditUnitComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.unitForm.controls;
    }

    addNewUnit() {
        // tslint:disable-next-line:prefer-const
        let unitModel: UnitModel = this.unitForm.value as UnitModel;
        this.restService.addUnit(unitModel).then((res) => {
            this.toastr.success('The unit has been added successfully', '');
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
        let unitModel: UnitModel = this.unitForm.value as UnitModel;
        this.restService.updateUnit(unitModel).then((res) => {
            this.toastr.success('The unit has been updated successfully', '');
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
        this.unitForm = this._formBuilder.group({
            title_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {
        this.prepareForm();
        if (this.data) {
            this.unitForm.patchValue(this.data);
        }
    }


}
