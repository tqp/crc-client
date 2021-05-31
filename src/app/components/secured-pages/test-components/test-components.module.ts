import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { TestComponentsRoutingModule } from './test-components-routing.module';
import { FacetingComponent } from './faceting/faceting.component';


@NgModule({
  declarations: [
    TestComponent,
    FacetingComponent
  ],
  imports: [
    CommonModule,
    TestComponentsRoutingModule
  ]
})
export class TestComponentsModule {
}
