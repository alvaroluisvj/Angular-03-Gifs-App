import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  // inyeccion del servicio.
constructor(private gifsService: GifsService){


}

get tags(): string[]{
  return this.gifsService.tagsHistory;

}

public repeatTitle(title: string): void {
    this.gifsService.searchTag(title);
}


}
