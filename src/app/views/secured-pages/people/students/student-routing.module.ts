import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentDetailEditComponent } from './student-detail-edit/student-detail-edit.component';
import { StudentListByCaseManagerComponent } from './student-list-by-case-manager/student-list-by-case-manager.component';

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
        path: 'student-list-by-case-manager',
        component: StudentListByCaseManagerComponent,
        data: {
          title: 'Student List'
        }
      },
      {
        path: 'student-detail/:id',
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
        path: 'student-detail-edit/:id',
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
