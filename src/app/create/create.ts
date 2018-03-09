import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { AppService } from '../app.service';
import { PostDataInterface } from '../app.interface';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { concatStatic } from 'rxjs/operator/concat';

// email=as&username=kapko&text=asdas&status=12&token=beejee
@Component({
  selector: 'app-create',
  templateUrl: './create.html',
})
export class CreateEditComponent {
  @Input() postId: string;

  image: File;

  previewData: PostDataInterface;

  showPreview: boolean = false;

  showLoader: boolean = false;
 
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private appService: AppService
  ) {}

  ngOnChanges(): void {
    console.log('postId', this.postId);
  }

  uploadFile(event: any): void {
    let fileList: FileList = event.target.files;
    this.image = (fileList.length) ? fileList[0] : null;
  }

  previewPost(data: PostDataInterface): void {
    this.showPreview = true;
    this.previewData = data;
  }

  submitForm(data: PostDataInterface): void{
    if (!this.image) {
      alert('Pls upload your image');
      return;
    };
    let formData = new FormData();
    for (let i in data) {
      formData.append(i, data[i])
    }
    formData.append('image', this.image, this.image.name);
    this.showLoader = true;

    this.appService.postData(formData)
      .map(res => res.json())
      .subscribe(item => {
        this.showLoader = false;
        alert((item.status === 'error') ? 'Some Error Man!)' : 'Cool you have added new Post');
      });
  }
}
