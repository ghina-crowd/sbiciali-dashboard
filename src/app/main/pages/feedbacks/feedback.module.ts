import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "../../../../guard/auth.guard";
import {FeedbacksComponent} from "./feedbacks.component";
import {RouterModule} from "@angular/router";
import {CKEditorModule} from "ng2-ckeditor";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";



const routes = [
    {
        path     : 'feedbacks',
        component: FeedbacksComponent,
        canActivate: [AuthGuard],
    }
];

@NgModule({
  declarations: [FeedbacksComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatTableModule,
        MatTabsModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
    ]
})
export class FeedbackModule { }
