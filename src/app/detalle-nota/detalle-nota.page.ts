import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotasService, Nota } from '../services/notas';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-nota',
  templateUrl: './detalle-nota.page.html',
  styleUrls: ['./detalle-nota.page.scss'],
  standalone: false,
})
export class DetalleNotaPage implements OnInit {

  nota: Nota | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notasService: NotasService,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.nota = this.notasService.getNota(id);
    }
  }

  abrirEnGoogleMaps() {
    if (this.nota?.ubicacion) {
      const url = `https://www.google.com/maps?q=${this.nota.ubicacion.lat},${this.nota.ubicacion.lng}`;
      window.open(url, '_blank');
    }
  }

  async eliminarNota() {
    const alert = await this.alertController.create({
      header: 'Eliminar Nota',
      message: '¿Estás seguro de que quieres eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            if (this.nota) {
              this.notasService.eliminarNota(this.nota.id);
              this.mostrarToast('Nota eliminada');
              this.router.navigate(['/home']);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  private async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
