import { Injectable } from '@angular/core';

export interface Nota {
  id: string;
  titulo: string;
  contenido: string;
  foto?: string;
  ubicacion?: {
    lat: number;
    lng: number;
  };
  fechaCreacion: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private readonly STORAGE_KEY = 'notas';

  constructor() { }

  getNotas(): Nota[] {
    const notasJson = localStorage.getItem(this.STORAGE_KEY);
    if (notasJson) {
      const notas = JSON.parse(notasJson);
      return notas.map((nota: any) => ({
        ...nota,
        fechaCreacion: new Date(nota.fechaCreacion)
      }));
    }
    return [];
  }

  guardarNota(nota: Omit<Nota, 'id' | 'fechaCreacion'>): void {
    const notas = this.getNotas();
    const nuevaNota: Nota = {
      ...nota,
      id: this.generarId(),
      fechaCreacion: new Date()
    };
    notas.push(nuevaNota);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notas));
  }

  actualizarNota(nota: Nota): void {
    const notas = this.getNotas();
    const index = notas.findIndex(n => n.id === nota.id);
    if (index !== -1) {
      notas[index] = nota;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notas));
    }
  }

  eliminarNota(id: string): void {
    const notas = this.getNotas().filter(n => n.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notas));
  }

  getNota(id: string): Nota | undefined {
    return this.getNotas().find(n => n.id === id);
  }

  private generarId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
