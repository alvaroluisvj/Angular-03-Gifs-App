import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >
  `,
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  // @ViewChild coge el tag y gestiona el valor del input igual que la antigua forma ( el @ViewChild nos silve para tomar una referencia local)
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  // Si queremos inyectar algun elemento tenemos que hacerlo a traves del constructor.
  constructor( private gifsService: GifsService ){}

  // searchTag(newTag: string){
  //   console.log({ newTag });

  // }

  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    // esta comando es para guardar en el arreglo en gifs.service.ts
    this.gifsService.searchTag( newTag );

    // esto es para que se limpie la caja de texto cuando le damos enter
    this.tagInput.nativeElement.value = '';

  }

}
// #txtTagInput este tag nos ayuda a que este input se reconozca con este nombre y mira como podemos exportar el valor a nuestro metodo
// (keyup.enter) el .enter nos especifica que se va a enviar el valor del input cuando precionemos enter
// (keyup.enter)="searchTag( txtTagInput.value)" otra opcion de entrar valor sin el @ViewChild
