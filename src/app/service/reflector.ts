import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum HOOK {
    JWT,
    USER_DETAILS
};

@Injectable({
    providedIn: 'root'
})
export class Reflector<T>{

    private reactions: any = {}
    private model: any = {}

  

    constructor() {

        
        try {
            this.model = JSON.parse(localStorage.getItem('reflectStore') + '')
            console.log('REFLECT:', this.model);
            
            if (this.model == undefined || this.model == 'undefined') {
                this.model = {}
            }

        } catch (e) { }
    }

    public set(key: HOOK, value: T) {
        this.model[key] = value
        if (this.reactions[key] == undefined) {
            this.reactions[key] = new Subject<T>()
        }
        localStorage.setItem('reflectStore', JSON.stringify(this.model))
        this.reactions[key].next(value)
    }
    public get(key: HOOK):T {
        return this.model[key]
    }
    public observe(key: HOOK): Observable<T> {
        if (this.reactions[key] == undefined) {
            this.reactions[key] = new Subject<T>()
        }
        return this.reactions[key];
    }
    public clear(key: HOOK) {
        this.model[key] = undefined
        if (this.reactions[key] == undefined) {
            this.reactions[key] = new Subject<T>()
        }
        localStorage.setItem('reflectStore', JSON.stringify(this.model))
        this.reactions[key].next(undefined)
    }
}