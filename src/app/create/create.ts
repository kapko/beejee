import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { AppService } from '../app.service';
import { PostDataInterface } from '../app.interface';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';

// email=as&username=kapko&text=asdas&status=12&token=beejee
@Component({
  selector: 'app-create',
  templateUrl: './create.html',
})
export class CreateEditComponent {
  public file_srcs: string[] = [];
  image: File;
  src: string = "";
  resizeOptions: ResizeOptions = {
      resizeMaxHeight: 320,
      resizeMaxWidth: 240
  };
 
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private appService: AppService
  ) {
  }

  selected(imageResult: any) {
    this.src = imageResult.resized
        && imageResult.resized.dataURL
        || imageResult.dataURL;
  }

  uploadFile(event: any): void {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.image = fileList[0];
    }
  }

  submitForm(data: PostDataInterface): void{
    let formData = new FormData();
    for (let i in data) {
      formData.append(i, data[i])
    }

    formData.append('image', this.image, this.image.name);

    this.appService.postData(formData).subscribe(item => {
      console.log('response', item);
    });
  }

}
