import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTasksComponent } from './popup-tasks.component';

describe('PopupTasksComponent', () => {
  let component: PopupTasksComponent;
  let fixture: ComponentFixture<PopupTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
