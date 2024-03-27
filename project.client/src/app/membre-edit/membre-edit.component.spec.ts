import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreEditComponent } from './membre-edit.component';

describe('MembreEditComponent', () => {
  let component: MembreEditComponent;
  let fixture: ComponentFixture<MembreEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembreEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
