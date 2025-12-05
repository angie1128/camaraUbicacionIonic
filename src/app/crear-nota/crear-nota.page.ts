import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { NotasService } from '../services/notas';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-nota',
  templateUrl: './crear-nota.page.html',
  styleUrls: ['./crear-nota.page.scss'],
  standalone: false,
})
export class CrearNotaPage implements OnInit {

  titulo: string = '';
  contenido: string = '';
  foto: string | undefined;
  ubicacion: { lat: number; lng: number } | undefined;

  constructor(
    private notasService: NotasService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

 async tomarFoto() {
   try {
     const image = await Camera.getPhoto({
       quality: 90,
       allowEditing: false,
       resultType: CameraResultType.DataUrl,
       source: CameraSource.Camera,
       // En web, usar el modal de cámara (PWA Elements) en lugar de input file
       webUseInput: false,
       promptLabelHeader: 'Tomar Foto',
       promptLabelPhoto: 'Desde Cámara',
       promptLabelPicture: 'Seleccionar de Galería',
       width: 800,
       height: 600,
       correctOrientation: true
     });

     this.foto = image.dataUrl;
     await this.mostrarToast('Foto tomada correctamente');
   } catch (error) {
     console.error('Error al tomar foto:', error);
     await this.mostrarToast('Error al tomar la foto');
   }
 }

  async obtenerUbicacion() {
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
      this.ubicacion = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
      await this.mostrarToast('Ubicación obtenida correctamente');
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      await this.mostrarToast('Error al obtener la ubicación');
    }
  }

  guardarNota() {
    if (!this.titulo.trim() || !this.contenido.trim()) {
      this.mostrarToast('Por favor completa título y contenido');
      return;
    }

    this.notasService.guardarNota({
      titulo: this.titulo.trim(),
      contenido: this.contenido.trim(),
      foto: this.foto,
      ubicacion: this.ubicacion
    });

    this.mostrarToast('Nota guardada correctamente');
    this.router.navigate(['/home']);
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
