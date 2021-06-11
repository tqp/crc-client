import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsiRecordListComponent } from './csi-record-list/csi-record-list.component';
import { CsiRecordDetailComponent } from './csi-record-detail/csi-record-detail.component';
import { CsiRecordDetailEditComponent } from './csi-record-detail-edit/csi-record-detail-edit.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'CSI Records'
    },
    children: [
      {
        path: '',
        redirectTo: 'csi-record-list',
        pathMatch: 'full'
      },
      {
        path: 'csi-record-create',
        component: CsiRecordDetailEditComponent,
        data: {
          title: 'Create CSI Record'
        }
      },
      {
        path: 'csi-record-list',
        component: CsiRecordListComponent,
        data: {
          title: 'CSI Record List'
        }
      },
      {
        path: 'csi-record-detail/:id',
        component: CsiRecordDetailComponent,
        data: {
          title: 'CSI Record Detail'
        }
      },
      {
        path: 'csi-record-detail-edit/:id',
        component: CsiRecordDetailEditComponent,
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
export class CsiRecordRoutingModule {
}
