import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrServiceService {

  constructor(private toastr: ToastrService) { }

  showSuccess(headline: string, textVal: string) {
    this.toastr.success(textVal, headline);
  }

  showError(headline: string, textVal: string){
    this.toastr.error(textVal, headline);
  }

  showSuccessDeleteGroup(headline: string, textVal: string) {
    this.toastr.success(textVal, headline, {
      timeOut: 3000,
    });
  }


}
