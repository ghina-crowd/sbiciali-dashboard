import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {DurationModel} from "../../../../../models/duration.model";
import {UnitModel} from "../../../../../models/unit.model";

@Component({
  selector: 'app-edit-duration',
  templateUrl: './edit-duration.component.html',
  styleUrls: ['./edit-duration.component.scss']
})
export class EditDurationComponent implements OnInit {
    data: DurationModel;
    durationForm: FormGroup;
    unites: UnitModel[] =[] ;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditDurationComponent>,
                private toastr: ToastrService) {
        dialogRef.disableClose = true;

    }


    get f() {
        return this.durationForm.controls;
    }

    addNewDuration() {
        // tslint:disable-next-line:prefer-const
        let durationModel: DurationModel = this.durationForm.value as DurationModel;
        this.restService.addDuration(durationModel).then((res) => {
            this.toastr.success('The duration has been added successfully', '');
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
        let durationModel: DurationModel = this.durationForm.value as DurationModel;
        this.restService.updateDuration(durationModel).then((res) => {
            this.toastr.success('The duration has been updated successfully', '');
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
        this.durationForm = this._formBuilder.group({
            type: [null, [Validators.required]],
            unit: [null, [Validators.required]],
            range: [null],
            costCounter: [null],
            _id: [null]

        });

    }

    getUnites() {
        this.restService.getUnites().then((res) => {
            this.unites = res.results;
        }).catch((err: HttpErrorResponse) => {
           if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    close() {
        this._dialog.closeAll();
    }


    ngOnInit() {
        this.prepareForm();
        this.getUnites();
        if (this.data) {
            this.durationForm.patchValue(this.data);
            this.f.unit.setValue(this.data.unit._id);
        }
    }

}
