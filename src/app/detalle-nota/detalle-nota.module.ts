import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleNotaPageRoutingModule } from './detalle-nota-routing.module';

import { DetalleNotaPage } from './detalle-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleNotaPageRoutingModule
  ],
  declarations: [DetalleNotaPage]
})
export class DetalleNotaPageModule {}
