import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.css'
})
export class TasksViewComponent {
  
  @Input() employeer: any;
  @Output() ClosePopup: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
  ngOnInit(){
    console.log('open pop-up' , this.employeer)
  }
  closeModal(): void {
    this.ClosePopup.emit();
    // Émettre un événement ou implémenter la logique pour fermer la boîte de dialogue pop-up
  }
}
