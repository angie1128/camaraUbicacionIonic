import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearNotaPage } from './crear-nota.page';

describe('CrearNotaPage', () => {
  let component: CrearNotaPage;
  let fixture: ComponentFixture<CrearNotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearNotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
