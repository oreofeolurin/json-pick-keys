import pickKeys from "./index";




describe('Space separated syntax', () => {

    let obj;
    beforeAll( ()=> {
        obj = {
            a: 'Hello',
            b: 'World!',
            c: {
                name: "welcome",
                text : "Welcome To",
                font : { family : 'Open Sans', style: 'bold'}
            },
            d: ['is', 'json', 'pick', 'keys']
        };

    });

    describe('inclusion', () => {

        it('should pick keys picked for inclusion', () => {
            const pickedKeys = pickKeys(obj, 'a b c');
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys).not.toHaveProperty('d');
        });

        it('should deep pick keys picked for inclusion', () => {
            const pickedKeys = pickKeys(obj, 'c.font.style');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys['c']).not.toHaveProperty('name');
            expect(pickedKeys['c']).not.toHaveProperty('text');
            expect(pickedKeys['c']['font']).toHaveProperty('style');
            expect(pickedKeys['c']['font']).not.toHaveProperty('family');
        });

    });


    describe('exclusion', () => {

        it('should deselect keys picked for exclusion', () => {
            const pickedKeys = pickKeys(obj, '-a -c');
            expect(pickedKeys).not.toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).not.toHaveProperty('c');
            expect(pickedKeys).toHaveProperty('d');
        });

        it('should deep deselect keys picked for exclusion', () => {
            const pickedKeys = pickKeys(obj, '-c.font.style');
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('d');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys['c']).toHaveProperty('name');
            expect(pickedKeys['c']).toHaveProperty('text');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
            expect(pickedKeys['c']['font']).toHaveProperty('family');
        });
    });


    describe('pick', () => {

        it('should select keys for inclusion and deselect for exclusion', () => {
            const pickedKeys = pickKeys(obj, '-a -c b');
            expect(pickedKeys).not.toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).not.toHaveProperty('c');
            expect(pickedKeys).not.toHaveProperty('d');
        });

        it('should deep deselect keys picked for exclusion', () => {
            const pickedKeys = pickKeys(obj, 'a b -d -c.font.style c');
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).not.toHaveProperty('d');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys['c']).toHaveProperty('name');
            expect(pickedKeys['c']).toHaveProperty('text');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
            expect(pickedKeys['c']['font']).toHaveProperty('family');
        });
    });

    describe('rename', () => {

        it('should rename a key for inclusion with the pipe symbol', () => {
            const pickedKeys = pickKeys(obj, 'a b c.font.style|fontWeight d|array');
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys).not.toHaveProperty('d');
            expect(pickedKeys).toHaveProperty('array');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
            expect(pickedKeys['c']['font']).toHaveProperty('fontWeight');
        });

        it('should remove the key for exclusion with the pipe symbol', () => {
            const pickedKeys = pickKeys(obj, '-a -c.font.style|fontWeight');
            expect(pickedKeys).not.toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys).toHaveProperty('d');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
        });
    });

});

describe('Object syntax', () => {

    let obj;
    beforeAll( ()=> {
        obj = {
            a: 'Hello',
            b: 'World!',
            c: {
                name: "welcome",
                text : "Welcome To",
                font : { family : 'Open Sans', style: 'bold'}
            },
            d: ['is', 'json', 'pick', 'keys']
        };

    });

    describe('inclusion', () => {

        it('should pick keys picked for inclusion', () => {
            const pickedKeys = pickKeys(obj, {a : 1, b : 1, c : 1});
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys).not.toHaveProperty('d');
        });

        it('should deep pick keys picked for inclusion', () => {
            const pickedKeys = pickKeys(obj, {'c.font.style': 1});
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys['c']).not.toHaveProperty('name');
            expect(pickedKeys['c']).not.toHaveProperty('text');
            expect(pickedKeys['c']['font']).toHaveProperty('style');
            expect(pickedKeys['c']['font']).not.toHaveProperty('family');
        });

    });


    describe('exclusion', () => {

        it('should deselect keys picked for exclusion', () => {
            const pickedKeys = pickKeys(obj, {'a' : 0, 'c' : 0});
            expect(pickedKeys).not.toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).not.toHaveProperty('c');
            expect(pickedKeys).toHaveProperty('d');
        });

        it('should deep deselect keys picked for exclusion', () => {
            const pickedKeys = pickKeys(obj, {'c.font.style' : 0});
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('d');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys['c']).toHaveProperty('name');
            expect(pickedKeys['c']).toHaveProperty('text');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
            expect(pickedKeys['c']['font']).toHaveProperty('family');
        });
    });


    describe('pick', () => {

        it('should select keys for inclusion and deselect for exclusion', () => {
            const pickedKeys = pickKeys(obj, {'a' : 0, 'c' : 0,  'b': 1 });
            expect(pickedKeys).not.toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).not.toHaveProperty('c');
            expect(pickedKeys).not.toHaveProperty('d');
        });

        it('should deep deselect keys picked for exclusion', () => {
            const pickedKeys = pickKeys(obj, {'a' : 1, 'b': 1, 'c': 1, 'c.font.style' : 0});
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).not.toHaveProperty('d');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys['c']).toHaveProperty('name');
            expect(pickedKeys['c']).toHaveProperty('text');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
            expect(pickedKeys['c']['font']).toHaveProperty('family');
        });
    });

    describe('rename', () => {

        it('should rename a key for inclusion with the pipe symbol', () => {
            const pickedKeys = pickKeys(obj, {'a' : 1, 'b': 1, 'c.font.style|fontWeight' : 1, 'd|array' : 1});
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys).not.toHaveProperty('d');
            expect(pickedKeys).toHaveProperty('array');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
            expect(pickedKeys['c']['font']).toHaveProperty('fontWeight');
        });

        it('should remove the key for exclusion with the pipe symbol', () => {
            const pickedKeys = pickKeys(obj, {'a' : 0, 'c.font.style|fontWeight' : 0});
            expect(pickedKeys).not.toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys).toHaveProperty('d');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
        });
    });

});



describe('Array Data', () => {

    let obj;
    beforeAll( ()=> {
        obj = [{
            a: 'Hello',
            b: 'World!',
            c: {
                name: "welcome",
                text : "Welcome To",
                font : { family : 'Open Sans', style: 'bold'}
            },
            d: ['is', 'json', 'pick', 'keys']
        }];

    });

    describe('inclusion', () => {

        it('should pick keys picked for inclusion', () => {
            const pickedKeys = pickKeys(obj, 'a b c')[0];
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys).not.toHaveProperty('d');
        });

        it('should deep pick keys picked for inclusion', () => {
            const pickedKeys = pickKeys(obj, 'c.font.style')[0];
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys['c']).not.toHaveProperty('name');
            expect(pickedKeys['c']).not.toHaveProperty('text');
            expect(pickedKeys['c']['font']).toHaveProperty('style');
            expect(pickedKeys['c']['font']).not.toHaveProperty('family');
        });

    });


    describe('exclusion', () => {

        it('should deselect keys picked for exclusion', () => {
            const pickedKeys = pickKeys(obj, '-a -c')[0];
            expect(pickedKeys).not.toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).not.toHaveProperty('c');
            expect(pickedKeys).toHaveProperty('d');
        });

        it('should deep deselect keys picked for exclusion', () => {
            const pickedKeys = pickKeys(obj, '-c.font.style')[0];
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('d');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys['c']).toHaveProperty('name');
            expect(pickedKeys['c']).toHaveProperty('text');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
            expect(pickedKeys['c']['font']).toHaveProperty('family');
        });
    });


    describe('pick', () => {

        it('should select keys for inclusion and deselect for exclusion', () => {
            const pickedKeys = pickKeys(obj, '-a -c b')[0];
            expect(pickedKeys).not.toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).not.toHaveProperty('c');
            expect(pickedKeys).not.toHaveProperty('d');
        });

        it('should deep deselect keys picked for exclusion', () => {
            const pickedKeys = pickKeys(obj, 'a b -d -c.font.style c')[0];
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).not.toHaveProperty('d');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys['c']).toHaveProperty('name');
            expect(pickedKeys['c']).toHaveProperty('text');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
            expect(pickedKeys['c']['font']).toHaveProperty('family');
        });
    });

    describe('rename', () => {

        it('should rename a key for inclusion with the pipe symbol', () => {
            const pickedKeys = pickKeys(obj, 'a b c.font.style|fontWeight d|array')[0];
            expect(pickedKeys).toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys).not.toHaveProperty('d');
            expect(pickedKeys).toHaveProperty('array');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
            expect(pickedKeys['c']['font']).toHaveProperty('fontWeight');
        });

        it('should remove the key for exclusion with the pipe symbol', () => {
            const pickedKeys = pickKeys(obj, '-a -c.font.style|fontWeight')[0];
            expect(pickedKeys).not.toHaveProperty('a');
            expect(pickedKeys).toHaveProperty('b');
            expect(pickedKeys).toHaveProperty('c');
            expect(pickedKeys).toHaveProperty('d');
            expect(pickedKeys['c']['font']).not.toHaveProperty('style');
        });
    });

});