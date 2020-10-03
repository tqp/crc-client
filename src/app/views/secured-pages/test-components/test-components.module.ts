import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { TestComponentsRoutingModule } from './test-components-routing.module';



@NgModule({
  declarations: [
    TestComponent,
    PlaceholderComponent
  ],
  imports: [
    CommonModule,
    TestComponentsRoutingModule
  ]
})
export class TestComponentsModule { }
