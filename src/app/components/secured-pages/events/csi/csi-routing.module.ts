import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsiDetailComponent } from './csi-detail/csi-detail.component';
import { CsiDetailEditComponent } from './csi-detail-edit/csi-detail-edit.component';
import { CsiListComponent } from './csi-list/csi-list.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'CSI Records'
    },
    children: [
      {
        path: '',
        redirectTo: 'csi-list',
        pathMatch: 'full'
      },
      {
        path: 'csi-list',
        component: CsiListComponent,
        data: {
          title: 'CSI List'
        }
      },
      {
        path: 'csi-detail/:id',
        component: CsiDetailComponent,
        data: {
          title: 'CSI Record Detail'
        }
      },
      {
        path: 'csi-create',
        component: CsiDetailEditComponent,
        data: {
          title: 'Create CSI Record'
        }
      },
      {
        path: 'csi-detail-edit/:id',
        component: CsiDetailEditComponent,
        data: {
          title: 'Edit CSI Record'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsiRoutingModule {
}
