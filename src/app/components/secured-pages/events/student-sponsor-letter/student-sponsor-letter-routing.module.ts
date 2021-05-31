import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentSponsorLetterListComponent } from './student-sponsor-letter-list/student-sponsor-letter-list.component';


const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Student-Sponsor Letters'
    },
    children: [
      {
        path: '',
        redirectTo: 'student-sponsor-letter-list',
        pathMatch: 'full'
      },
      {
        path: 'student-sponsor-letter-list',
        component: StudentSponsorLetterListComponent,
        data: {
          title: 'Student-Sponsor Letter List'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentSponsorLetterRoutingModule {
}
