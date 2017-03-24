/// <reference types="express" />
/// <reference types="core-js" />
import * as express from 'express';
export declare class BusForm {
    middleWare: any;
    private fileFields;
    private formData;
    constructor(fieldName: any);
    makeMiddleWare(req: express.Request, res: express.Response, next: any): Promise<any>;
    getFormData(req: express.Request): Promise<{}>;
}
