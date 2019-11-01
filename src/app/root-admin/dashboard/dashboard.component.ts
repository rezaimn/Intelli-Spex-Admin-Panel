import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    public AdminPieChartLabels: string[] = ['Admin consoles Owned', 'Admin consoles Used'];
    public AdminPieChartData: number[] = [200, 1000];
    public MobilePieChartLabels: string[] = ['Mobile consoles Owned', 'Mobile consoles Used'];
    public MobilePieChartData: number[] = [50, 800];
    public PieChartType = 'pie';
}
