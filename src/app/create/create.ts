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
  @Input() postId: string;

  image: File;
 
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private appService: AppService
  ) {
    console.log(this.postId);
  }

  ngOnChanges(): void {
    console.log('postId', this.postId);
  }

  uploadFile(event: any): void {
    let fileList: FileList = event.target.files;
    this.image = (fileList.length) ? fileList[0] : null;
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
