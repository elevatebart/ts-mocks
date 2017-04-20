const UNDEFINED_STRING = 'undefined';
const FUNCTION_STRING = 'function';

export class Setup<T, TReturn> {
    
    private spy: jasmine.Spy;
    
    private object: T;
    private key: keyof T;

    constructor(object: T, key: keyof T) {
        this.object[<string>key] = <T>{};
        this.spy = spyOn(this.object, key);
    }

    public get Spy() {
        return this.spy;
    }

    /** Setup the return value for the setup of the property */
    public is(value: TReturn) : Setup<T, TReturn> {       

        this.object[<string>this.key] = value;            
        if(typeof(value) === FUNCTION_STRING) {
            this.spy = spyOn(this.object, this.key).and.callThrough();
        }
        return this;
    }   

    /** deprecated use is() */
    public returns(value: TReturn) {
        console.warn('returns() is being deprecated, use is()')
        this.is(value);
    } 
}