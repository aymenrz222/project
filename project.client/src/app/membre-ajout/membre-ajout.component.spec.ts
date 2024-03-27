import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreAjoutComponent } from './membre-ajout.component';

describe('MembreAjoutComponent', () => {
  let component: MembreAjoutComponent;
  let fixture: ComponentFixture<MembreAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembreAjoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembreAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
