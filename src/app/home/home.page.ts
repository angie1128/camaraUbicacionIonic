import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotasService, Nota } from '../services/notas';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  notas: Nota[] = [];

  constructor(
    private notasService: NotasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarNotas();
  }

  ionViewWillEnter() {
    this.cargarNotas();
  }

  cargarNotas() {
    this.notas = this.notasService.getNotas();
  }

  crearNota() {
    this.router.navigate(['/crear-nota']);
  }

  verDetalle(nota: Nota) {
    this.router.navigate(['/detalle-nota', nota.id]);
  }

}
