import * as express from 'express';
import * as Busboy from 'busboy';


interface FileFields{
    name: string,
    limit: number
}

export class BusForm{

    public middleWare = this.makeMiddleWare.bind(this);

    private fileFields : Array<FileFields>;

    private formData;

    constructor(fieldName){
        this.fileFields = [{name : fieldName, limit : 1}];
    }

    public async makeMiddleWare(req: express.Request, res: express.Response, next:any) {

        try {
            req['data'] = await this.getFormData(req);
            return next();

        }catch(err){
            return next(err);
        }

    }

    public getFormData(req: express.Request) {
        const self = this;
        let formData: Object = {};

        return new Promise(function (resolve, reject) {

            let busboy = new Busboy({headers: req.headers});

            //set up file event for busboy
            busboy.on('file', busboyOnFile);

            //Register finish event
            busboy.on("field", busboyOnField);

            //Register finish event
            busboy.once("finish", busboyOnFinish);



            //Start parsing file
            req.pipe(busboy);


            function busboyOnFile(fieldname, file, filename, encoding, mimetype) {

                // Create the initial array containing the stream's chunks
                file.fileRead = [];

                file.on('data', function (chunk) {
                    // Push chunks into the fileRead array
                    this.fileRead.push(chunk);
                });

                file.on('error', function (err) {
                    done(new Error(`Error while buffering the stream: ${err}`));
                });

                file.on('end', function () {

                    let fileField = self.fileFields.find((v) => v.name == fieldname) ;

                    //set the field name in the form data
                    if (typeof formData[fieldname] == 'undefined')
                        formData[fieldname] = [];

                    else if (formData[fieldname].length >= fileField.limit)
                        return done(new Error(`File limit of ${fileField.limit} exceeded for field ${fieldname}`));

                    // Concat the chunks into a Buffer
                    let finalBuffer = Buffer.concat(this.fileRead);

                    let packet = {
                        buffer: finalBuffer,
                        byteSize: finalBuffer.length,
                        fileName: filename,
                        mimeType: mimetype,
                    };

                    formData[fieldname].push(packet);
                });

            }

            function busboyOnField(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
                formData[fieldname] = val;
            }

            function busboyOnFinish() {
                //Check if file was uploaded
                for (let field of self.fileFields) {
                    if (!formData.hasOwnProperty(field.name) || formData[field.name].length == 0)
                        done(new Error(`No photo was specified for field ${field.name}`));
                }
                done(null, formData);
            }

            function done(err, formData?: Object) {
                if (err) return reject(err);

                return resolve(formData);
            }

        });
    }


}