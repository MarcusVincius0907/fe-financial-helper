import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly PREFIX = 'FFH-';

  get(key: string){
    try{
        return JSON.parse(localStorage.getItem(this.PREFIX+key));
    }catch(e){
        console.error('Error local storage service: ',e)
    }

    return null;
  }

  set(key:string, value: any){
    try{
        localStorage.setItem(this.PREFIX+key, JSON.stringify(value));
        return true;
    }catch(e){
        console.error('Error local storage service: ',e)
    }

    return null;
  }

  removeItem(key: string){
    return localStorage.removeItem(key);
  }


}
