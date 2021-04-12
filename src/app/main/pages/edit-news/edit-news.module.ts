import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsComponent} from "../news/news.component";
import {AuthGuard} from "../../../../guard/auth.guard";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FuseSharedModule} from "../../../../@fuse/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {EditNewsComponent} from "./edit-news.component";
import {MatRadioModule} from "@angular/material/radio";
import {CKEditorModule} from "ng2-ckeditor";
import {MatDatepickerModule} from "@angular/material/datepicker";

const routes = [
    {
        path     : 'edit-news/:id',
        component: EditNewsComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
    declarations: [EditNewsComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FuseSharedModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        MatRadioModule,
        CKEditorModule,
        MatDatepickerModule
    ]
})


export class EditNewsModule { }
