import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreDeletComponent } from './membre-delet.component';

describe('MembreDeletComponent', () => {
  let component: MembreDeletComponent;
  let fixture: ComponentFixture<MembreDeletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembreDeletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembreDeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
