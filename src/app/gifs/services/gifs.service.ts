import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';



@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  public gifList: Gif[] =[];
  private apikey:     string = 'vRmof0yD9Ycce9lmji0ye15AwlwRxCvS';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    //Aqui llamamos el loadLocalStorage() para cargar la deta desde que se llame el constructor que es lo primero que se llama.
    this.loadLocalStorage();
   }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string){
    tag = tag.toLowerCase();

    if( this._tagsHistory.includes(tag) ){
      // este filter lo que hace que dice si el tag se encuentra dentro del arreglo, devuelve un nuevo arreglo que este no este en el.
    this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
    }
    // aqui es: como el nuevo arreglo no tiene el nuevo valor, introducelo al principio con el unshift
    this._tagsHistory.unshift( tag );

    // aqui le especifico que el arreglo se va a cortar cuando este de 0 a 10
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    // Llamano aqui el localStorage porque es la ultima parte donde se establece todo lo relacionado al tagsHistory
    this.saveLocalStore();
  }

  // Metodo que guarda en el localStore ** el LocalStorage guarda solo items string, osea no un arreglo, por esta razón se utiliza el JSON.stringify
  private saveLocalStore():void {
      localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  // Aqui leemos el localStorage.
  private loadLocalStorage(): void {

    // Si el localStorage no tiene esta data has un return
    if( !localStorage.getItem('history')) return;

    // Aqui hacemos el proceso contrario al JSON.stringify que lo sacamos del LocalStorage que guarda solo string
    // y lo pasamos al arreglo de _tagsHistory. Un punto importante es que hay que ponerle ! para decirle a typeScript que siempre viene data.
      this._tagsHistory = JSON.parse(localStorage.getItem('history')! );
      if( this._tagsHistory.length === 0 ) return;

        this.searchTag(this._tagsHistory[0]);


  }

  public searchTag( tag: string ): void{
    if( tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apikey )
    .set( 'limit', '10')
    .set('q', tag)
// Aqui en los params se pueden enviar muchas cosas comos los header y otros parametros,
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
    .subscribe( resp => {
      this.gifList = resp.data;
      // console.log({ gifs: this.gifList });


    })
  }

  // Ejemplo de una peticion sencilla, normal en javascript
  // async searchTag( tag: string ):Promise<void>{
  //   if( tag.length === 0) return;
  //   this.organizeHistory(tag);
  //   fetch('http://api.giphy.com/v1/gifs/search?api_key=vRmof0yD9Ycce9lmji0ye15AwlwRxCvS&q=goku&limit=20')
  //   .then( resp => resp.json() )
  //   .then( data => console.log( data) );
  // }


}
