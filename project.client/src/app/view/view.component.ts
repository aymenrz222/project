import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  @Input() project: any;
  @Output() ClosePopup: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }
  ngOnInit(){
    console.log('open pop-up' , this.project)
  }
  closeModal(): void {
    this.ClosePopup.emit();
    // Émettre un événement ou implémenter la logique pour fermer la boîte de dialogue pop-up
  }
}
