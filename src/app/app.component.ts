import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 't1';
  tbl1Data: any[] | undefined;

  constructor(private http: HttpClient, private databaseService: DatabaseService) { }

  // ngOnInit() {
  //   console.log('AppComponent ngOnInit');

  //   // this.http.get('/api/tbl1').subscribe(data => {
  //   //   console.log('data', data);
  //   //   this.tbl1Data = data as any[];
  //   // }
  //   // );

  // }
  async ngOnInit() {
    try {
      this.tbl1Data = await this.databaseService.query('SELECT * FROM tbl1');
      console.log('Data from database:', this.tbl1Data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }
}
