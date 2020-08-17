import { Injectable } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public config = {
    toastComponent: Toast,
    closeButton: false,
    timeOut: 2000,
    disableTimeout: false,
    positionClass: 'toast-top-right'
  };

  constructor(private toastr: ToastrService) {
  }

  public showSuccess(message, title) {
    this.toastr.success(message, title, this.config);
  }

  public showError(message, title) {
    this.toastr.error(message, title, this.config);
  }

  public showInfo(message, title) {
    this.toastr.info(message, title, this.config);
  }

  public showWarning(message, title) {
    this.toastr.warning(message, title, this.config);
  }
}
