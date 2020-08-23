import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentDetailEditComponent } from './student-detail-edit/student-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Students'
    },
    children: [
      {
        path: '',
        redirectTo: 'student-list',
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
        path: 'student-detail/:guid',
        component: StudentDetailComponent,
        data: {
          title: 'Student Detail'
        }
      },
      {
        path: 'student-create',
        component: StudentDetailEditComponent,
        data: {
          title: 'Create Student'
        }
      },
      {
        path: 'student-detail-edit/:guid',
        component: StudentDetailEditComponent,
        data: {
          title: 'Edit Student'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
