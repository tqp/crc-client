import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaregiverModule } from './caregivers/caregiver.module';
import { CaseManagerModule } from './case-managers/case-manager.module';
import { SponsorModule } from './sponsors/sponsor.module';
import { StudentModule } from './students/student.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CaregiverModule,
    CaseManagerModule,
    SponsorModule,
    StudentModule
  ]
})
export class PeopleModule { }
