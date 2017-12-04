import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { SurveyObject } from '../models/surveyObject';
import { SurveySubject } from '../models/surveySubject';

@Injectable()
export class SurveyService {
  
    //private URL = 'http://localhost:8086/sm345/api/';
    private URL = 'http://220.230.112.31:8081/sm345/api/';

    constructor(private http: Http) { 
    }

    //관리자 - 객관식 설문조사 항목등록
    createSurveyObj(surveyObj: Array<string>) {
        let url = this.URL + 'surveyOB/insert';
        return this.http.post(url, surveyObj)
            .toPromise()
            .catch(this.handleError);
    }

    //관리자 - 주관식 설문조사 항목등록
    createSurveySubj(surveySubj: Array<string>) {
        let url = this.URL + 'surveySQ /insert';
        return this.http.post(url, surveySubj)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}

