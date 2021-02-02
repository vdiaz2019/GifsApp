import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _serviciosUrl: string = 'https://api.giphy.com/v1/gifs';
  private _apiKey: string = '84RHhuUd1GsUCMKPe0PFUF2X6ik7wLI7';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
  }

  buscarGifs( query: string ): void {

    if ( this._historial.includes(query) ) {
      this._historial = this._historial.filter(item => item != query);
    }

    this._historial.unshift( query );
    this._historial = this._historial.splice(0, 10);

    localStorage.setItem('historial', JSON.stringify(this._historial));

    const params = new HttpParams()
        .set('api_key', this._apiKey)
        .set('limit', '10')
        .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this._serviciosUrl }/search`, { params })
      .subscribe( resp => {
        console.log( resp.data );
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
