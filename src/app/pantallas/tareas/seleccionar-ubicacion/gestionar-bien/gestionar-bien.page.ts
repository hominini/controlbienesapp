import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BienesService } from '../../../../servicios/bienes.service';
import { UbicacionesService } from './../../../../servicios/ubicaciones.service';

@Component({
  selector: 'app-gestionar-bien',
  templateUrl: './gestionar-bien.page.html',
  styleUrls: ['./gestionar-bien.page.scss'],
})
export class GestionarBienPage implements OnInit {

  // variables
  ubicacion: any;
  fecha: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioBienes: BienesService,
    private ubicacionesService: UbicacionesService,

  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        // llenar la variable
        this.ubicacion = this.router.getCurrentNavigation().extras.state.ubicacion;
        console.log(this.ubicacion);
      }
    });
  }

  bienes: any[];

  // cuando se genere la pagina
  ngOnInit() {
    this.obtenerFechaActual();

    // y guardarle en una variable ubicaciones
    this.bienes = this.servicioBienes.traerBienes();
    console.log(this.bienes);
  }

  obtenerFechaActual(){
    this.fecha = new Date();
  }
}
