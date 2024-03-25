import { Component,Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() employeeToDelete: any;
  

  constructor() { }
  ngOnInit(){
    console.log('open pop-up' , this.employeeToDelete)
  }
  confirmDelete(): void {
    this.confirmed.emit(true);
  }

  cancelDelete(): void {
    this.confirmed.emit(false);
}
}