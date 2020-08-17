import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from './components/confirm-dialog/confirm-dialog.module';
import { CountdownTimerModule } from './components/countdown-timer/countdown-timer.module';
import { DurationModule } from './components/duration/duration.module';
import { ListAddRemoveItemsBasicModule } from './components/list-add-remove-items-basic/list-add-remove-items-basic.module';
import { MillisecondsToDateStringModule } from './components/milliseconds-to-date-string/milliseconds-to-date-string.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // Custom Modules
    ConfirmDialogModule,
    CountdownTimerModule,
    DurationModule,
    ListAddRemoveItemsBasicModule,
    MillisecondsToDateStringModule
  ]
})
export class SharedModule {
}
