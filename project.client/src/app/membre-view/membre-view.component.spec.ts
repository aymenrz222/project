import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembreViewComponent } from './membre-view.component';

describe('MembreViewComponent', () => {
  let component: MembreViewComponent;
  let fixture: ComponentFixture<MembreViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembreViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MembreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
