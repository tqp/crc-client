import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsModule } from './students/students.module';
import { CaregiversModule } from './caregivers/caregivers.module';
import { CaseManagersModule } from './case-managers/case-managers.module';
import { CrcMembersRoutingModule } from './crc-members-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Custom Routing
    CrcMembersRoutingModule,
    // Custom Modules
    StudentsModule,
    CaregiversModule,
    CaseManagersModule,
  ]
})
export class CrcMembersModule {
}
