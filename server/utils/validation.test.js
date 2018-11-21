const expect = require('expect');

const {isRealString} = require('./validation');

describe('Is real string', () => {
    it('should reject non-string values', () =>{
        var response = isRealString(549);
        expect(response).toBe(false);
    });

    it('should reject string with only spaces', () =>{
        var response = isRealString('      ');
        expect(response).toBe(false);
    });

    it('should allow string with non-space characters', () =>{
        var response = isRealString(' Jack    ');
        expect(response).toBe(true);
    });
});