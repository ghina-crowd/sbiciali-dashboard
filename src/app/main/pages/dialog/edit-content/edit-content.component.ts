import { Component, OnInit } from '@angular/core';
import {Category} from "../../../../../models/category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../../app.service";
import {DataService} from "../../../../../services/data.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {ContentModel} from "../../../../../models/user.model";

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit {

    data: ContentModel;
    contentForm: FormGroup;
    ckeConfig: any;
    public dummyElem = document.createElement('DIV');


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private _dialog: MatDialog,
                public dialogRef: MatDialogRef<EditContentComponent>,
                private toastr: ToastrService) {

        dialogRef.disableClose = true;

    }


    get f() {
        return this.contentForm.controls;
    }

    addNewContent() {
        // tslint:disable-next-line:prefer-const
        let contentModel: ContentModel = this.contentForm.value as ContentModel;
        this.restService.addContent(contentModel).then((res) => {
            this.toastr.success('The content has been added successfully', '');
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
        let ContentModel: ContentModel = this.contentForm.value as ContentModel;
        this.restService.updateContent(ContentModel).then((res) => {
            this.toastr.success('The content has been updated successfully', '');
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
        this.contentForm = this._formBuilder.group({
            content_en: [null, [Validators.required]],
            content_ar: [null, [Validators.required]],
            type: [null, [Validators.required]],
            _id: [null]

        });

    }

    close() {
        this._dialog.closeAll();
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
        this.prepareForm();
        if (this.data) {
            this.data.content_ar = this.decode(this.data.content_ar);
            this.data.content_en = this.decode(this.data.content_en);
            this.contentForm.patchValue(this.data);
            this.ckeConfig = {
                allowedContent: false,
                extraPlugins: 'divarea',
                forcePasteAsPlainText: true
            };
        }
    }

}
