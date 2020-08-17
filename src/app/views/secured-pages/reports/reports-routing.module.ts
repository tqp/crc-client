import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExportComponent } from './export/export.component';
import { CrcMetricsComponent } from './crc-metrics/crc-metrics.component';
import { StudentHomeMapComponent } from './student-home-map/student-home-map.component';
import { StudentSchoolMapComponent } from './student-school-map/student-school-map.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Reports'
    },
    children: [
      {
        path: '',
        redirectTo: 'student-home-map',
        pathMatch: 'full'
      },
      {
        path: 'student-home-map',
        component: StudentHomeMapComponent,
        data: {
          title: 'Student Home Map'
        }
      },
      {
        path: 'student-school-map',
        component: StudentSchoolMapComponent,
        data: {
          title: 'Student School Map'
        }
      },
      {
        path: 'crc-metrics',
        component: CrcMetricsComponent,
        data: {
          title: 'CRC Metrics'
        }
      },
      {
        path: 'export',
        component: ExportComponent,
        data: {
          title: 'Export'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {
}
