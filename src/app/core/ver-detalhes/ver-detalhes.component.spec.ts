import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalhesComponent } from './ver-detalhes.component';

describe('VerDetalhesComponent', () => {
  let component: VerDetalhesComponent;
  let fixture: ComponentFixture<VerDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerDetalhesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
