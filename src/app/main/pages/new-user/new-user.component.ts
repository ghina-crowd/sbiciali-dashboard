import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../app.service";
import {Category} from "../../../../models/category";
import {CountryModel} from "../../../../models/country.model";
import {ImageUser, UserModel, VideoModel} from "../../../../models/user.model";
import {ImageCroppedDialogComponent} from "../dialog/image-cropped-dialog/image-cropped-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {Filter} from "../../../../models/filter";


@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
    id: string;
    UserForm: FormGroup;
    categories: Category[] = [];
    countries: CountryModel[] = [];
    data: UserModel;
    images: ImageUser[] = [];
    imagesUploaded: ImageUser[] = [];
    progress = false;
    filter = new Filter();
    videosList: VideoModel[] = [];


    constructor(private _formBuilder: FormBuilder,
                private appService: AppService,
                public restService: DataService,
                private toastr: ToastrService,
                private dialog: MatDialog,
                private activatedRouter: ActivatedRoute
    ) {

    }


    get f() {
        return this.UserForm.controls;
    }


    getCategories() {
        this.restService.getCategories().then((res) => {
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

    getCountries() {
        this.restService.getCountries().then((res) => {
            this.countries = res.results;
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
        this.UserForm = this._formBuilder.group({
            active: [null, [Validators.required]],
            birthday: [null, [Validators.required]],
            category: [null, [Validators.required]],
            city: [null, [Validators.required]],
            country: [null, [Validators.required]],
            description_v2_en: [null, [Validators.required]],
            description_v2_ar: [null, [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            name_v2_ar: [null, [Validators.required]],
            name_v2_en: [null, [Validators.required]],
            gender: [null, [Validators.required]],
            instagram: [null, [Validators.required]],
            instagram_count: [null, [Validators.required]],
            images: [null],
            imagesList: [null],
            videosList: [null],
            // videos: [null],
            facebook: [null, [Validators.required]],
            cover_image: [null, [Validators.required]],
            facebook_count: [null, [Validators.required]],
            youtube: [null, [Validators.required]],
            youtube_count: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            profession: [null, [Validators.required]],
            role: [null],
            _id: [null]

        });

    }

    uploadTextFile(file, type) {
        let formData = new FormData();
        formData.append('base64', file);
        this.restService.uploadTextFile(formData).then((res) => {
            if (type === 'image') {
                let Image: ImageUser = {description: 'text', url: res.medium.filename};
                this.imagesUploaded.push(Image);
                this.f.imagesList.setValue(this.imagesUploaded);
                console.log(this.f.imagesList.value);
            } else if (type === 'cover') {
                this.f.cover_image.setValue(res.medium.filename);

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


    explore(id, value, type) {
        this.filter.id = id;
        this.filter.isExplore = value;

        this.restService.addExplore(this.filter).then((res) => {
            if (type === 'old_image') {
                const images: ImageUser[] = this.images.filter(item => item._id === id);
                let index = this.images.indexOf(images[0]);
                this.images[index].isExplore = value;
            } else if (type === 'new_image') {
                const images: ImageUser[] = this.imagesUploaded.filter(item => item._id === id);
                let index = this.imagesUploaded.indexOf(images[0]);
                this.imagesUploaded[index].isExplore = value;
                this.f.imagesList.setValue(this.imagesUploaded);
            } else {
                const videos: VideoModel[] = this.videosList.filter(item => item._id === id);
                let index = this.videosList.indexOf(videos[0]);
                this.videosList[index].isExplore = value;
                this.f.videosList.setValue(this.imagesUploaded);

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

    uploadVideoFile(event) {
        this.progress = true;
        let file = <File>event.target.files[0];
        this.UploadVideo(file);
    }

    UploadVideo(file) {
        let formData = new FormData();
        formData.append('video', file);
        this.restService.uploadVideo(formData).then((res) => {
            this.f.videos.setValue(res.url);
            this.progress = false;

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }


    openDialog(type) {
        let dialog = this.dialog.open(ImageCroppedDialogComponent);
        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.uploadTextFile(result, type);
            }
        });
    }

    createCelebrity() {
        let model: UserModel = this.UserForm.value as UserModel;
        this.restService.createCelebrity(model).then((res) => {
            this.UserForm.reset();
            this.images = [];
            this.imagesUploaded = [];

            this.f.active.setValue('1');
            this.toastr.success('success', '');

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    EditCelebrity() {
        let model: UserModel = this.UserForm.value as UserModel;
        this.restService.editUser(model).then((res) => {
            this.f.active.setValue('1');
            this.toastr.success('success', '');

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }


    deleteImageUploaded(id) {
        this.imagesUploaded = this.imagesUploaded.filter(item => item._id != id);
    }

    deleteImage(id) {
        this.restService.deleteImageUser(id).then((res) => {
            this.images = this.images.filter(item => item._id != id);

        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }


    getUserInfo(id) {
        this.restService.getUserByID(id).then((res) => {
            this.UserForm.patchValue(res);
            this.f.country.setValue(res.country._id);
            this.f.active.setValue(this.f.active.value.toString());
            this.f.imagesList.value.forEach(item => {
                this.images.push(item);
            });

            this.f.videosList.value.forEach(item => {
                this.videosList.push(item);
            });
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
        this.getCountries();

        this.activatedRouter.params.subscribe(params => {
            this.id = params.id;
            if (params.id === '0') {
                this.f.role.setValue('celebrity');
                this.f.active.setValue('1');
            } else {
                this.getUserInfo(this.id);


            }
        });

    }

}
