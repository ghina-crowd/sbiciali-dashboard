import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {ApiService} from './api.service';
import {ContentModel, FeedbackModel, TokenModel, UserModel} from '../models/user.model';
import {environment} from '../environments/environment';
import {AppService} from '../app/app.service';
import {Category} from "../models/category";
import {TypeModel} from "../models/type.model";
import {CountryModel} from "../models/country.model";
import {UnitModel} from "../models/unit.model";
import {DurationModel} from "../models/duration.model";
import {PaginationModel} from "../models/pagination.model";
import {NewsModel} from "../models/news.model";
import { Filter } from 'models/filter';


@Injectable({
    providedIn: 'root'
})
export class DataService extends ApiService {
    baseUrl = '';
    progressCount = 0;
    data: any;
    image = '';
    notifyCount = 0;

    constructor(public httpClient: HttpClient, private ngZone: NgZone,
                private appService: AppService,
    ) {
        super(httpClient);

        this.baseUrl = environment.baseUrl;
        this.currentProgress.subscribe((progress: string) => {
            this.ngZone.run(() => {
                this.progressCount = Number(progress);
            });
        });
    }


    getCategories() {
        return this.restRequest(null, `${this.baseUrl}/v1/category?isPagination=false`, null, 'GET');
    }

    getContent() {
        return this.restRequest(null, `${this.baseUrl}/v1/content`, null, 'GET');
    }

    getNews(model: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/news?limit=${model.limit}&page=${model.page}`, null, 'GET');
    }

    getNewsDetails(id) {
        return this.restRequest(null, `${this.baseUrl}/v1/news/${id}`, null, 'GET');
    }

    getCategoriesNews() {
        return this.restRequest(null, `${this.baseUrl}/v1/news/category?isPagination=false`, null, 'GET');
    }

    getTypes() {
        return this.restRequest(null, `${this.baseUrl}/v1/type?isPagination=false`, null, 'GET');
    }

    getUsers(page: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/users?limit=${page.limit}&page=${page.page}&role=${page.role}`, null, 'GET');
    }

    getDurations(type: string) {
        return this.restRequest(null, `${this.baseUrl}/v1/duration?isPagination=false&type=${type}`, null, 'GET');
    }

    getUserByID(id: string) {
        return this.restRequest(null, `${this.baseUrl}/v1/users/${id}`, null, 'GET');
    }

    getCountries() {
        return this.restRequest(null, `${this.baseUrl}/v1/country`, null, 'GET');
    }

    getUnites() {
        return this.restRequest(null, `${this.baseUrl}/v1/unit?isPagination=false`, null, 'GET');
    }

    getFeedbacks(model: PaginationModel) {
        return this.restRequest(null, `${this.baseUrl}/v1/contact?limit=${model.limit}&page=${model.page}`, null, 'GET');
    }


    updateCategory(model: Category, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/category/${model._id}`, null, type);
    }

    updateContent(model: ContentModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/content/${model._id}`, null, type);
    }

    updateCategoryNews(model: Category, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/news/category/${model._id}`, null, type);
    }

    updateNews(model: NewsModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/news/${model._id}`, null, type);
    }

    updateType(model: TypeModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/type/${model._id}`, null, type);
    }

    updateCountry(model: CountryModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/country/${model._id}`, null, type);
    }

    updateUnit(model: UnitModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/unit/${model._id}`, null, type);
    }

    updateDuration(model: DurationModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/duration/${model._id}`, null, type);
    }

    updateFeedback(model: FeedbackModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/feedback/admin/update`, null, type);
    }

    addCategory(model: Category, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/category`, null, type);
    }

    addExplore(model: Filter, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/explore`, null, type);
    }

    addContent(model: ContentModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/content`, null, type);
    }

    addCategoryNews(model: Category, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/news/category`, null, type);
    }

    addUnit(model: UnitModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/unit`, null, type);
    }

    addType(model: TypeModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/type`, null, type);
    }

    createCelebrity(model: UserModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/users`, null, type);
    }

    addCountry(model: CountryModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/country`, null, type);
    }


    addNews(model: NewsModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/news`, null, type);
    }

    addDuration(model: DurationModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/duration`, null, type);
    }

    forgetPassword(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/authenticate/sent_otp_by_email`, null, type);
    }


    login(model: UserModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/v1/auth/login`, null, type);
    }


    editProfile(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/users`, null, type);
    }

    editUser(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/users/${model._id}`, null, type);
    }

    EditCelebrity(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/v1/users`, null, type);
    }

    getProfile() {
        return this.restRequest(null, `${this.baseUrl}/v1/users/profile`, null, 'GET');
    }

    verification(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/authenticate/activate`, null, type);
    }

    resetPassword(model: UserModel, type: string = 'PUT') {
        return this.restRequest(model, `${this.baseUrl}/authenticate/reset_password`, null, type);
    }

    uploadImage(formdata: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/v1/file/image`, null, type, false, formdata);
    }

    uploadTextFile(formdata: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/v1/file/base64/image`, null, type, false, formdata);
    }

    uploadVideo(formdata: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/v1/file/mp4`, null, type, false, formdata);
    }

    uploadGIF(formdata: FormData, type: string = 'POST') {
        return this.restRequest(null, `${this.baseUrl}/v1/file/gif`, null, type, false, formdata);
    }

    deleteUnit(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/unit/${id}`, null, type, null);
    }

    deleteCategory(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/category/${id}`, null, type, null);
    }

    deleteType(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/type/${id}`, null, type, null);
    }

    deleteCountry(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/country/${id}`, null, type, null);
    }

    deleteUser(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/users/${id}`, null, type, null);
    }

    deleteNews(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/news/${id}`, null, type, null);
    }

    deleteCategoryNews(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/news/category/${id}`, null, type, null);
    }

    deleteDuration(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/duration/${id}`, null, type, null);
    }

    deleteImageUser(id: string, type: string = 'Delete') {
        return this.restRequest(null, `${this.baseUrl}/v1/users/image/video/${id}`, null, type, null);
    }

    refreshToken(model: TokenModel, type: string = 'POST') {
        return this.restRequest(model, `${this.baseUrl}/auth/refresh-tokens`, null, type);
    }


    refreshTokenUser() {
        const token = new TokenModel();
        token.refreshToken = localStorage.getItem('auth_sbisiali_admin_refresh');

        this.refreshToken(token).then((res) => {
            localStorage.setItem('auth_sbisiali_admin', res.access.token);
            localStorage.setItem('auth_sbisiali_admin_refresh', res.refresh.token);
        }).catch((err: HttpErrorResponse) => {
            if (err.status) {
                localStorage.removeItem('auth_sbisiali_admin');
                localStorage.removeItem('auth_sbisiali_admin_refresh');
                window.location.href = '/pages/login';
            }
        });
    }

}
