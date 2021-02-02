import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../service/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) {}

  buscar(): void {
    const valor = this.txtBuscar.nativeElement.value;
    if (valor.trim() != '') {
      this.gifsService.buscarGifs( valor );
    }
    this.txtBuscar.nativeElement.value = '';
  }
}
