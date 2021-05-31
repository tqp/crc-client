import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes: Routes = [

  {
    path: '',
    data: {
      title: 'Test Components'
    },
    children: [
      {
        path: '',
        redirectTo: 'placeholder',
        pathMatch: 'full'
      },
      {
        path: 'test',
        component: TestComponent,
        data: {
          title: 'Test Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestComponentsRoutingModule {
}
