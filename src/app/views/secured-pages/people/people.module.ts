import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaregiverModule } from './caregivers/caregiver.module';
import { CaseManagerModule } from './case-managers/case-manager.module';
import { SponsorModule } from './sponsors/sponsor.module';
import { StudentModule } from './students/student.module';
import { CaseManagerRevisedDetailComponent } from './case-managers-revised/case-manager-revised-detail/case-manager-revised-detail.component';
import { CaseManagerRevisedListComponent } from './case-managers-revised/case-manager-revised-list/case-manager-revised-list.component';
import { CaseManagerRevisedDetailEditComponent } from './case-managers-revised/case-manager-revised-detail-edit/case-manager-revised-detail-edit.component';
import { CaseManagerRevisedModule } from './case-managers-revised/case-manager-revised.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CaregiverModule,
    CaseManagerModule,
    CaseManagerRevisedModule,
    SponsorModule,
    StudentModule
  ]
})
export class PeopleModule { }
