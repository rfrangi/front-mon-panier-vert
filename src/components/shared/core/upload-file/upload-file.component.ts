import {Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: `./upload-file.component.html`,
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

  @ViewChild('fileInput') public fileInput!: ElementRef;

  @Input() public src!: any;
  @Output() public onChange: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    if(this.src) {
      this.src = 'http://d11mhhwvxnv6xf.cloudfront.net/' + this.src;
    }
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          this.src = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.onChange.emit(imgFile.target.files[0]);
      console.log(imgFile.target.files[0], imgFile)
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    }
  }

  public showPopinUplad(): void {
    document.getElementById('uploadFile')?.click();
  }
}
