import {Component, OnInit} from '@angular/core';
import {Category} from "../../../../models/category";
import {DataService} from "../../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../app.service";
import {ImageCroppedDialogComponent} from "../dialog/image-cropped-dialog/image-cropped-dialog.component";
import {NewsModel} from "../../../../models/news.model";

@Component({
    selector: 'app-edit-news',
    templateUrl: './edit-news.component.html',
    styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {
    ckeConfig: any;
    categories: Category[] = [];
    images: string[] = [];
    id: number;
    details: NewsModel;
    newsForm: FormGroup;

    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private toastr: ToastrService,
                private ActivatedRouter: ActivatedRoute,
                private dialog: MatDialog
    ) {

    }

    get a() {
        return this.f.advertising as FormArray;
    }

    get f() {
        return this.newsForm.controls;
    }


    getCategories() {
        this.restService.getCategoriesNews().then((res) => {
            this.categories = res.results;
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }


    prepareForm() {
        this.newsForm = this._formBuilder.group({
            active: [null, [Validators.required]],
            source_link: [null, [Validators.required]],
            link: [null, [Validators.required]],
            description_ar: [null, [Validators.required]],
            description_en: [null, [Validators.required]],
            category: ['', [Validators.required]],
            source_name_ar: [null, [Validators.required]],
            source_name_en: [null, [Validators.required]],
            title_ar: [null, [Validators.required]],
            title_en: [null, [Validators.required]],
            istrending: [null, [Validators.required]],
            cover_imaage: [null],
            dateTime: [null, [Validators.required]],
            images: [null, [Validators.required]],
            type: [null, [Validators.required]],
            _id: [null],
            advertising: this._formBuilder.array([]),
        });

        this.addMoreAds();
    }

    cancelAds(form: AbstractControl) {
        this.a.removeAt(this.a.value.findIndex(item => item === form));
    }

    addMoreAds(item = null) {
        // tslint:disable-next-line:prefer-const
        let config = this._formBuilder.group({
            url: [null],
            link: [null, [Validators.required]],
            _id: [null],
        });

        this.a.push(config);
    }

    uploadTextFile(file, type, i) {
        let formData = new FormData();
        formData.append('base64', file);
        this.restService.uploadTextFile(formData).then((res) => {
            if (type === 'images') {
                this.images.push(res.medium.filename);
                this.f.images.setValue(this.images);
            } else {
                // this.a.value[i].url.setValue(res.medium.filename);
                this.a.value[i].url = res.medium.filename;
                console.log(this.a.value);
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

    decodeHTMLEntities(text) {
        var entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', '"']
        ];

        for (var i = 0, max = entities.length; i < max; ++i)
            text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);

        return text;
    }

    addNews() {
        // this.f.desctiption_en.setValue(this.decodeHTMLEntities( this.f.description_en.value));
        // this.f.desctiption_ar.setValue(this.decodeHTMLEntities( this.f.desctiption_ar.value));
        let model: NewsModel = this.newsForm.value as NewsModel;
        this.restService.addNews(model).then((res) => {
            this.details = res.results;
            this.newsForm.reset();
            this.f.active.setValue('1');
            this.images = [];
            this.toastr.success('added successfully', '');

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    onSubmit() {
        // let textEn = this.decodeHTMLEntities(this.f.description_en.value);
        // console.log(textEn);
        // this.f.description_en.setValue(textEn);
        // let textAr = this.decodeHTMLEntities(this.f.description_ar.value);
        // this.f.description_ar.setValue(textAr);


        let model: NewsModel = this.newsForm.value as NewsModel;
        this.restService.updateNews(model).then((res) => {
            this.details = res.results;
            this.toastr.success('updated successfully', '');
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    deleteImage(image) {
        this.images = this.images.filter(item => item !== image);
        this.f.images.setValue(this.images);
    }

    openDialog(type, i) {
        let dialog = this.dialog.open(ImageCroppedDialogComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {

                this.uploadTextFile(result, type, i);
            }
        });
    }

    uploadCover(event) {
        let file = <File>event.target.files[0];
        let formData = new FormData();
        formData.append('file', file);
        this.restService.uploadImage(formData).then((res) => {
                this.f.cover_imaage.setValue(res.medium.filename);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }



    openDialogGif(event, i) {
        let file = <File>event.target.files[0];
        this.UploadGIF(file, i);
    }

    UploadGIF(file, i) {
        let formData = new FormData();
        formData.append('gif', file);
        this.restService.uploadGIF(formData).then((res) => {
            this.a.value[i].url = res.url;
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }


    getNewsDetails() {
        this.restService.getNewsDetails(this.id).then((res) => {
            this.details = res;
            this.newsForm.patchValue(this.details);
            this.f.active.setValue(this.f.active.value.toString());
            this.images = this.f.images.value;
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    ngOnInit() {
        this.prepareForm();
        this.getCategories();
        this.f.active.setValue('1');
        this.ActivatedRouter.params.subscribe(params => {
            this.id = params.id;
            if (params.id != 0) {
                this.getNewsDetails();
            } else {
                this.f.link.setValue('text');
            }
        });

        this.ckeConfig = {
            allowedContent: false,
            extraPlugins: 'divarea',
            forcePasteAsPlainText: true
        };

    }


}
