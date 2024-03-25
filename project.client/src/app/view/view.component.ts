import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
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
