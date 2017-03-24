import {BusForm} from "./lib/BusForm";

function busform(opts){
    let instance;

    if(typeof opts === 'string'){
        instance = new BusForm(opts)
    }

    return instance.middleWare;

}

export = busform;