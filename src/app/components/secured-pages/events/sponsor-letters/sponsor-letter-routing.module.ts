import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorLetterListComponent } from './sponsor-letter-list/sponsor-letter-list.component';
import { SponsorLetterDetailComponent } from './sponsor-letter-detail/sponsor-letter-detail.component';
import { SponsorLetterDetailEditComponent } from './sponsor-letter-detail-edit/sponsor-letter-detail-edit.component';


const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Sponsor Letters'
    },
    children: [
      {
        path: '',
        redirectTo: 'sponsor-letter-list',
        pathMatch: 'full'
      },
      {
        path: 'sponsor-letter-create',
        component: SponsorLetterDetailEditComponent,
        data: {
          title: 'Sponsor Letter Create'
        }
      },
      {
        path: 'sponsor-letter-list',
        component: SponsorLetterListComponent,
        data: {
          title: 'Sponsor Letter List'
        }
      },
      {
        path: 'sponsor-letter-detail/:id',
        component: SponsorLetterDetailComponent,
        data: {
          title: 'Sponsor Letter Detail'
        }
      },
      {
        path: 'sponsor-letter-detail-edit/:id',
        component: SponsorLetterDetailEditComponent,
        data: {
          title: 'Sponsor Letter Detail Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorLetterRoutingModule {
}
