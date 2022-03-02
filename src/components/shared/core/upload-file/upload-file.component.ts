import {Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: `./upload-file.component.html`,
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  public showPopinUplad(): void {
    document.getElementById('uploadFile')?.click();
  }
}
