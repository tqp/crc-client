import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentModule } from './students/student.module';
import { CaregiverModule } from './caregivers/caregiver.module';
import { CaseManagerModule } from './case-managers/case-manager.module';
import { RelationModule } from './relations/relation.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Custom Modules
    StudentModule,
    CaregiverModule,
    CaseManagerModule,
    RelationModule
  ]
})
export class CrcMembersModule {
}
