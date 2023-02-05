import * as util from 'util';
import * as clone from 'clone';
import * as merge from 'lodash.merge';

interface PickKeysOptions {
    redactString: string
}

const DEFAULT_OPTS = { redactString: '*****' }
const PICK_KEY_MAP = { "-": 0, "*": 2 };

/**
 * Convert string formatted fields to object formatted ones
 *
 * @param fields
 * @return {Object}
 */
function normalizeFields(fields) {
    if (!fields) return;

    if (fields.constructor.name === 'Object') {
        return fields;
    } else if ('string' === typeof fields) {
        let _fields = {};

        fields.split(/\s+/).forEach(function (field) {
            if (!field) return;

            const include = PICK_KEY_MAP[field[0]] ?? 1;

            field = include == 1 ? field : field.substring(1);
            _fields[field] = include;
        });
        return _fields;
    }

    throw new TypeError('Invalid select fields. Must be a string or object.');
}

/**
 * Create an empty object or array as a destination to copy
 * @param obj
 * @return {Object | []}
 */
function emptyObject(obj) {
    if (obj && obj.constructor.name === 'Object') {
        return {};
    } else if (util.isArray(obj)) {
        return [];
    }
}


/**
 * Copy a value recursively
 *
 * @param src
 * @param dst
 * @param field
 */
function pick(src, dst, field: string[], redactString?: string) {
    if (!src || !dst) return;

    if (Array.isArray(src)) {
        pickArray(src, dst, field, redactString);
        return;
    }

    let _field = field[0],
        transformedName = _field,
        pipeArr = _field.split('|'),
        _src, _dst;

    if (pipeArr.length === 2) {
        _field = redactString ? pipeArr[1] : pipeArr[0]; // if redaction, only func would have already renamed 
        transformedName = pipeArr[1];
    }

    if (!(_field in src)) return;
    _src = src[_field];

    if (field.length > 1) {
        if (_field in dst) {
            // get a reference when a value already exists
            _dst = dst[transformedName];
        } else {
            _dst = emptyObject(_src);
            if (_dst) {
                dst[transformedName] = _dst;
            }
        }

        // continue to search nested objects
        pick(_src, _dst, field.slice(1), redactString);
        return;
    }

    dst[transformedName] = redactString ? redactString : clone(_src);
}


/**
 * Pick only objects and arrays from a array
 *
 * @param src
 * @param dst
 * @param field
 */
function pickArray(src, dst, field, redactString?: string) {
    let i = 0;


    src.forEach(function (_src) {

        let _dst;

        if (dst.length > i) {
            _dst = dst[i];
            i++;
        } else {
            _dst = emptyObject(_src);
            if (_dst) {
                dst.push(_dst);
                i++;
            }
        }

        pick(_src, _dst, field, redactString);
    });
}

function only(data, fields) {

    if (!fields.length) return data;

    const _data = Array.isArray(data) ? [] : {};
    const _fields = fields.filter(v => v !== '...');

    _fields.forEach(function (field) {
        pick(data, _data, field.split('.'));
    });


    /**
     * TODO: make spread work for array
     */
    if ((fields.includes('...') || fields.find(v => v.includes('|'))) && !Array.isArray(data)) {
        const untouched = except(data, _fields);
        return merge(untouched, _data);
    }

    return _data;
}

function redact(data: any, fields: string[], redactStr: string) {

    if (!fields.length) return data;

    const _fields = fields.filter(v => v !== '...');

    _fields.forEach(function (field) {
        pick(data, data, field.split('.'), redactStr);
    });

    return data;
}

/**
 * Delete a value recursively
 * @param data
 * @param field
 */
function omit(data, field) {
    if (!data) return;

    if (Array.isArray(data)) {
        data.forEach(function (_data) {
            omit(_data, field);
        });
        return;
    }

    let _field = field[0],
        pipeArr = _field.split('|');


    if (pipeArr.length === 2) {
        _field = pipeArr[0];
    }

    if (field.length > 1) {
        omit(data[_field], field.slice(1));
        return;
    }

    if (data.constructor.name === 'Object') {
        delete data[_field];
    }
}

function except(data, fields) {
    const _data = clone(data);

    fields.forEach(function (field) {
        omit(_data, field.split('.'));
    });

    return _data;
}


export default function pickKeys(data: any, spaceSeparatedStr: string | Record<string, 0 | 1 | 2>, opts?: PickKeysOptions) {
    if (!spaceSeparatedStr) return data;
    opts = opts ?? DEFAULT_OPTS;

    const inclusive = [], exclusive = [], redaction = [];

    const fields = normalizeFields(spaceSeparatedStr);

    Object.keys(fields).forEach(function (field) {

        if (fields[field] > 0) {
            inclusive.push(field);
        }

        if (fields[field] == 0) {
            exclusive.push(field);
        }

        if (fields[field] == 2) {
            redaction.push(field);
        }
    });

    data = inclusive.length ? only(data, inclusive) : data;
    data = redaction.length ? redact(data, redaction, opts.redactString) : data;
    const v = exclusive.length ? except(data, exclusive) : data;
    return v;
}
