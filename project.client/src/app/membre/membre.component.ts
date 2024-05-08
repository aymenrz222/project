import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembreService } from '../services/membre.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.css']
})
export class MembreComponent {
  newMembreForm: FormGroup;
  showEditPopup: boolean = false;
  showConfirmation: boolean = false;
  membreToDelete: any;
  membreToEdit: any;
  searchQuery: string = '';
  filteredMembres: any[] = [];
  membres: Array<{
    Nom: string,
    Prenom: string,
    Cin: Int32Array,
    Poste: string, // Remplacez "age" par "poste" ici
    Telepohne: Int32Array,
    Email: string,
    actions: Array<{ type: string, callback: Function }>
  }> = [];
  openpopup: boolean = false;
  membreToShow: any;
  currentPage: number = 1;
  entriesPerPage: number = 5;
  showAddPopup: boolean = false;
  isSortedAscending: boolean = true; // 1 pour trier de A à Z, -1 pour trier de Z à A
  sortField: string = 'nom';
  membre: any;
  member: any;
  database : any;
  membreId = false;
  showlistesmembre = false;
  constructor(private membreService: MembreService) {
    this.newMembreForm = new FormGroup({
      Nom: new FormControl('', Validators.required),
      Prenom: new FormControl('', Validators.required),
      Cin: new FormControl('', Validators.required),
      Poste: new FormControl('', Validators.required),
      Telephone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}-[0-9]{3}')]),
      Email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  
  ngOnInit(): void {
    this.team();
  }

  team(): void{
    this.membreService.getmembre().subscribe((database) => {
      console.log("data" ,database)
       this.membre = database
       this.showlistesmembre = true;
       this.membreId = true;
       this.searchMembre();
    });
  }  

  toggleAddPopup(): void {
    this.showAddPopup = !this.showAddPopup;
  }

  
  
  handleClosePopup(): void {
    this.openpopup = false;
    this.showAddPopup = false;
    
  }

  closeEditPopup(): void {
    this.showEditPopup = false;
  }

  checkDuplicateMembre(cin: Int32Array): boolean {
    return this.membres.some(membre => membre.Cin === cin);
  }

  addMembre(): void {
    this.showlistesmembre = false;
    this.team();
    console.log (this.showlistesmembre)
  }

  viewMembre(member: any): void {
    this.member = member;
    this.openpopup = true;
  }

  openEditPopup(membre: any): void {
    this.showEditPopup = true;
    this.database = membre;
  
  }

  saveModifiedMembre(): void {
    this.showlistesmembre = false;
    this.team();
    this.membreId = false;
  }

  deletemembreConfirmation( membre:any): void {
    this.showConfirmation = true;
    this.database = membre;
   }

  deletemembre(): void {
    this.showConfirmation = false;
   
  }
  searchMembre(): void {
    if (!this.searchQuery) {
      // Si la valeur de recherche est vide, afficher tous les membres
      this.filteredMembres = this.membres;
    } else {
      // Filtrer les membres en fonction de la recherche (ignorer la casse)
      this.filteredMembres = this.membres.filter(membre =>
        membre.Nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        membre.Prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        membre.Cin.toString().includes(this.searchQuery)
        // Ajoutez d'autres champs si nécessaire
      );
    }
  }
  displayMembreDetails(membre: any): void {
    // Display details of the membre
  }

  getMembresForCurrentPage(): Array<any> {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;
    return this.membre.slice(startIndex, endIndex);
  }

  getFirstEntryIndex(): number {
    return (this.currentPage - 1) * this.entriesPerPage + 1;
  }

  getLastEntryIndex(): number {
    const endIndex = this.currentPage * this.entriesPerPage;
    return endIndex > this.membre.length ? this.membre.length : endIndex;
  }

  getTotalPages(): number {
    return Math.ceil(this.membre.length / this.entriesPerPage);
  }

  getPages(): Array<number> {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.getTotalPages()) {
      this.currentPage = newPage;
    }
  }

  onEntriesPerPageChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.entriesPerPage = +selectedValue; // Convert the selected value to a number
    this.currentPage = 1; // Reset the current page to 1 when entries per page changes
  }

  sortByName(): void {
    this.isSortedAscending = !this.isSortedAscending;
    this.membres.sort((a, b) => {
      const order = this.isSortedAscending ? 1 : -1;
      return a.Nom.localeCompare(b.Nom) * order;
    });
  }
}
