import { Injectable} from "@angular/core";
import { Http, Headers} from "@angular/http";

@Injectable ()
export class HttpService {

  private url: string = "https://omgvamp-hearthstone-v1.p.mashape.com/cards?locale=frFR";

  constructor(private myHttp: Http){}

  getHeader() {
    let headers = new Headers();
    headers.append('X-Mashape-Key', 'DCWCoATV3YmshWVzsdC6XDiq0aJTp1XxCAUjsnHXYm6M8Xf6Hz');
    return headers;
  }

  getDataFromApi(){
    return this.myHttp.get(this.url, { headers: this.getHeader() });
  }

  getDataClasses(classe:string){
    let url = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/"+classe+"?locale=frFR";
    return this.myHttp.get(url, { headers: this.getHeader()});
  }
}
