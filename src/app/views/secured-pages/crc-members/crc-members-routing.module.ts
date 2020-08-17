import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { CaseManagerListComponent } from './case-managers/case-manager-list/case-manager-list.component';
import { CaregiverListComponent } from './caregivers/caregiver-list/caregiver-list.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'CRC Members'
    },
    children: [
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full'
      },
      {
        path: 'student-list',
        component: StudentListComponent,
        data: {
          title: 'Student List'
        }
      },
      {
        path: 'case-manager-list',
        component: CaseManagerListComponent,
        data: {
          title: 'Case Manager List'
        }
      },
      {
        path: 'caregiver-list',
        component: CaregiverListComponent,
        data: {
          title: 'Caregiver List'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrcMembersRoutingModule {
}
