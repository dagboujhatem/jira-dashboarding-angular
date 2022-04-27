import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  sweetAlertMessage: any ;
  constructor(private translate: TranslateService) { 
    this.sweetAlertMessage =  this.translate.instant('common.SweetAlert');
  }

  deleteConfirmation()
  {
    return Swal.fire({
      title: this.sweetAlertMessage?.title,
      text: this.sweetAlertMessage?.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4dbd74',
      cancelButtonColor: '#f86c6b',
      confirmButtonText: `<i class="fa fa-check" aria-hidden="true"></i> ${this.sweetAlertMessage?.confirmButtonText}`,
      cancelButtonText: `<i class="fa fa-times" aria-hidden="true"></i> ${this.sweetAlertMessage?.cancelButtonText}`
    });

  }

}
