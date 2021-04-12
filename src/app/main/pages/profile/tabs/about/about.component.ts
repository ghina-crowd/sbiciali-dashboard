import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {fuseAnimations} from '@fuse/animations';
import {ProfileService} from 'app/main/pages/profile/profile.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../../authentication/reset-password/reset-password.component";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../../../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {UserModel} from "../../../../../../models/user.model";
import {AppService} from "../../../../../app.service";

@Component({
    selector: 'profile-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy {
    personalInformation: FormGroup;

    about: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private restService: DataService,
        private appService: AppService,
        private toastr: ToastrService,
        private _profileService: ProfileService,
        private _formBuilder: FormBuilder,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    get p() {
        return this.personalInformation.controls;
    }


    getCompantInfo() {
        // tslint:disable-next-line:prefer-const
        this.restService.getProfile().then(res => {
            const result: UserModel = res as UserModel;
            this.personalInformation.patchValue(result);
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                this.toastr.error(err.error.message, '');
                if (err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }
        });
    }

    prepare() {
        this.personalInformation = this._formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: [''],
            phone: ['', [Validators.required]],
            // old_password: ['', [Validators.minLength(8), Validators.maxLength(16)]],
            // passwordConfirm: ['', [confirmPasswordValidator]],
            // new_password: ['', [Validators.minLength(8), Validators.maxLength(16)]],
        });


    }

    onSubmit() {
        // tslint:disable-next-line:prefer-const
        let userModel: UserModel = this.personalInformation.value as UserModel;
        if (userModel.password == '' && userModel.currentPassword == '' || userModel.password != '' && userModel.currentPassword != '') {
            this.restService.editProfile(userModel).then((res) => {
                this.toastr.success('', '');
            }).catch((err: HttpErrorResponse) => {
               if (err.status) {
                this.toastr.error(err.error.message, '');
                if(err.error.code === 401) {
                    this.restService.refreshTokenUser();
                }
            }

            });
        } else {
            this.toastr.error('Please enter new password');
        }
    }


    ngOnInit(): void {

        this.prepare();
        this.getCompantInfo();
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
