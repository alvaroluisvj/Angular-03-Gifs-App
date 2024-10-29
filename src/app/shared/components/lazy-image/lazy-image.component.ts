import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit{

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if( !this.url ) throw new Error('URL property is required');
  }

  // Metodo que carga el loader en la imagen
  onLoad(){
    setTimeout(() => {
      this.hasLoaded = true;
    }, 700);

  }

}
