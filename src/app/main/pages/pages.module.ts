import {NgModule} from '@angular/core';

import {LoginModule} from 'app/main/pages/authentication/login/login.module';
import {RegisterModule} from 'app/main/pages/authentication/register/register.module';
import {ForgotPasswordModule} from 'app/main/pages/authentication/forgot-password/forgot-password.module';
import {ResetPasswordModule} from 'app/main/pages/authentication/reset-password/reset-password.module';
import {ComingSoonModule} from 'app/main/pages/coming-soon/coming-soon.module';
import {Error404Module} from 'app/main/pages/errors/404/error-404.module';
import {Error500Module} from 'app/main/pages/errors/500/error-500.module';
import {SearchClassicModule} from 'app/main/pages/search/classic/search-classic.module';
import {SearchModernModule} from 'app/main/pages/search/modern/search-modern.module';
import {EditCategoryComponent} from "./dialog/edit-category/edit-category.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../@fuse/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {ImageCropperComponent, ImageCropperModule} from "ngx-image-cropper";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {MatGoogleMapsAutocompleteModule} from "@angular-material-extensions/google-maps-autocomplete";
import {AgmCoreModule} from "@agm/core";
import {RouterModule} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {CategoriesModule} from "./categories/categories.module";
import {ProfileModule} from "./profile/profile.module";
import {FeedbackModule} from "./feedbacks/feedback.module";
import {EditTypeComponent} from './dialog/edit-type/edit-type.component';
import {TypesModule} from "./types/types.module";
import {DurationsModule} from "./durations/durations.module";
import {UnitesModule} from "./unites/unites.module";
import {CountriesModule} from "./countries/countries.module";
import {EditCountryComponent} from './dialog/edit-country/edit-country.component';
import {CroppedImageComponent} from "./cropped-image/cropped-image.component";
import {EditUnitComponent} from './dialog/edit-unit/edit-unit.component';
import {EditDurationComponent} from './dialog/edit-duration/edit-duration.component';
import {CategoriesNewsModule} from "./categories-news/categories-news.module";
import { EditNewsCategoryComponent } from './dialog/edit-news-category/edit-news-category.component';
import {UsersModule} from "./users/users.module";
import {NewUserModule} from "./new-user/new-user.module";
import {ImageCroppedDialogComponent} from "./dialog/image-cropped-dialog/image-cropped-dialog.component";
import {EditNewsModule} from "./edit-news/edit-news.module";
import {NewsModule} from "./news/news.module";
import {ContentModule} from "./content/content.module";
import { EditContentComponent } from './dialog/edit-content/edit-content.component';
import {CKEditorModule} from "ng2-ckeditor";


@NgModule({
    imports: [
        LoginModule,
        RegisterModule,
        ForgotPasswordModule,
        ResetPasswordModule,
        ComingSoonModule,
        Error404Module,
        Error500Module,
        SearchClassicModule,
        SearchModernModule,
        ImageCropperModule,
        MatIconModule,
        CategoriesModule,
        ProfileModule,
        FeedbackModule,
        TypesModule,
        CountriesModule,
        DurationsModule,
        EditNewsModule,
        NewsModule,
        UnitesModule,
        UsersModule,
        ContentModule,
        NewUserModule,
        ImageCropperModule,
        CategoriesNewsModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatOptionModule,
        MatRadioModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatRadioModule,
        RouterModule,
        CategoriesNewsModule,
        MatGoogleMapsAutocompleteModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAl_KkpIB-kNu2GIhc4Kxejd0DDESQWMRM',
            libraries: ['places']
        }),
        NgMultiSelectDropDownModule.forRoot(),
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        CKEditorModule,
    ],
    exports: [],
    providers: [],
    entryComponents: [EditCategoryComponent, EditTypeComponent, EditCountryComponent,
        EditDurationComponent, EditUnitComponent , EditNewsCategoryComponent , ImageCroppedDialogComponent , EditContentComponent


    ],
    declarations: [
        EditCategoryComponent,
        EditTypeComponent,
        EditCountryComponent,
        CroppedImageComponent,
        EditUnitComponent,
        EditDurationComponent,
        EditNewsCategoryComponent,
        ImageCroppedDialogComponent,
        EditContentComponent,




    ]
})
export class PagesModule {

}
