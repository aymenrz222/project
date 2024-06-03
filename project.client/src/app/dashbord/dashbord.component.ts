import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../services/projet.service';
import { MembreService } from '../services/membre.service';
import { TacheService } from '../services/tache.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  nombreProjets: number = 0;
  nombreMembres: number = 0;
  nombreTaches: number = 0;
  performance: number = 0;
  projects: any[] = []; // Liste des projets
  debutDates: string[] = []; // Dates de début des projets
  chartOptions: any; // Options du graphique

  // Déclaration de Highcharts
  Highcharts: any = Highcharts;

  constructor(
    private projetService: ProjetService,
    private membreService: MembreService,
    private tacheService: TacheService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.getProjectsCount();
    this.getProjects();
  }

  getProjectsCount(): void {
    this.projetService.countProjects().subscribe(
      count => {
        this.nombreProjets = count;
        this.calculatePerformance();
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du nombre de projets : ', error);
      }
    );

    this.membreService.countMembres().subscribe(
      count => {
        this.nombreMembres = count;
        this.calculatePerformance();
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du nombre de membres : ', error);
      }
    );
  }

  getProjects(): void {
    this.projetService.getListProjects().subscribe(
      (response: { data: any[] }) => {
        const projects: any[] = response.data;
        this.projects = projects;
        this.debutDates = projects.map(project => project.debutDate);
        this.setupChart(projects);
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des projets : ', error);
      }
    );
  }

  calculatePerformance(): void {
    if (this.nombreMembres > 0) {
      this.performance = (this.nombreProjets / this.nombreMembres) * 100;
    } else {
      this.performance = 0;
    }
  }

  setupChart(projects: any[]): void {
    const chartData: any[][] = this.calculateChartData(projects);

    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Nombre de projets par date'
      },
      xAxis: {
        categories: this.debutDates,
        labels: {
          rotation: -45,
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        title: {
          text: 'Nombre de projets'
        }
      },
      series: [{
        name: 'Nombre de projets',
        data: chartData
      }]
    };
  }

  calculateChartData(projects: any[]): any[][] {
    const projectCountByDate: { [key: string]: number } = {};
    
    projects.forEach(project => {
      const debutDate = project.debutDate;
      if (projectCountByDate[debutDate]) {
        projectCountByDate[debutDate]++;
      } else {
        projectCountByDate[debutDate] = 1;
      }
    });

    const chartData: any[][] = [];
    Object.keys(projectCountByDate).forEach(date => {
      chartData.push([date, projectCountByDate[date]]);
    });

    return chartData;
  }
}
