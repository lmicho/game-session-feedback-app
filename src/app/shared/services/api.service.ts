import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  /**
   * Build API URL
   *
   * @param url
   * @returns {string}
   * @private
   */
  private _buildApiUrl(url: string) {
    return environment.baseUrl + url
  }

  /**
   * Build request options
   *
   * @param options
   * @returns {{}&{headers: HttpHeaders}&V}
   * @private
   */
  private _buildOptions(options: any) {
    return Object.assign({}, httpOptions, options, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("id_token")
      }
    });
  }


  /**
   * Perform GET request
   *
   * @param url
   * @param options
   */
  public get(url: string, options?: any): Observable<any> {
    return this._http.get(this._buildApiUrl(url), this._buildOptions(options))
  }


  /**
   * Perform POST request
   *
   * @param url
   * @param data
   * @param options
   */
  public post(url: string, data?: any, options?: any): Observable<any> {
    return this._http.post(this._buildApiUrl(url), data, this._buildOptions(options))
  }

  /**
   * Perform PUT request
   *
   * @param url
   * @param data
   * @param options
   */
  public put(url: string, data?: any, options?: any): Observable<any> {
    return this._http.put(this._buildApiUrl(url), data, this._buildOptions(options))
  }

  /**
   * Perform DELETE request
   *
   * @param url
   * @param options
   */
  public delete(url: string, options?: any): Observable<any> {
    return this._http.delete(this._buildApiUrl(url), this._buildOptions(options))
  }

}