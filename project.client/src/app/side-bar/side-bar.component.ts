import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  newEmployeeForm: FormGroup;
  showEditPopup: boolean = false;
  showConfirmation: boolean = false;
  employeeToDelete: any;
  employeeToEdit: any;
  searchQuery: string = '';
    filteredEmployees: any[] = [];
  employees: Array<{
    name: string,
    firstName: string,
    cin: string,
    age: string,
    phoneNumber: string,
    
    actions: Array<{ type: string, callback: Function }>
  }> = [];
  openpopup: boolean = false;
  employeer: any;

  currentPage: number = 1;
  entriesPerPage: number = 3;
  showAddPopup: boolean = false;
  isSortedAscending: boolean = true;

  constructor() {
    this.newEmployeeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      cin: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      dueDate:new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      description:new FormControl('', Validators.required),
      category:new FormControl('', Validators.required),
      budget:new FormControl('', Validators.required),
    });
  }
  toggleAddPopup(): void {
    this.showAddPopup = !this.showAddPopup;
  }
  

  handleClosePopup(): void {
    this.openpopup = false;
    this.showAddPopup = false;
  }
  handeleClosePopup(): void {
    this.openpopup = false;
  }
  addEmployee(newEmployeeData: any): void {
    const { nom, prenom, cin, age, telephone, duedate, description, category, pudget, } = newEmployeeData;
    const statusElement = document.querySelector('input[name="status"]:checked');
    const status = statusElement ? prenom.value : 'En cours'; // Valeur par défaut si aucun bouton n'est sélectionné

    // Check if all required fields are filled
   

    // Check if CIN is unique
    const isCinUnique = !this.employees.some(employee => employee.cin === cin);

    if (isCinUnique) {
        const newEmployee = {
            name: nom,
            firstName: prenom,
            cin: cin,
            age: age,
            phoneNumber: telephone,
            dueDate: duedate,
            description: description,
            category: category,
            budget: pudget,
            status: status, // Include the project status
            actions: [
               
            ]
        };

        // Only add the employee if the CIN is unique
        this.employees.push(newEmployee);
    } else {
        const message = 'Le CIN doit être unique pour chaque employé. Employé non ajouté.';
        alert(message);
    }
}

}
