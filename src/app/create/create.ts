import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { AppService } from '../app.service';
import { PostDataInterface } from '../app.interface';
import { ImageResult, ResizeOptions } from 'ng2-imageupload';
import { concatStatic } from 'rxjs/operator/concat';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.html',
  providers: [Md5]
})
export class CreateEditComponent {
  @Input() post: any;

  previewData: PostDataInterface;
  form: FormGroup;
  image: File;
  postEditValue: boolean = false;
  showPreview: boolean = false;
  showLoader: boolean = false;
  postId: string = null;
 
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private appService: AppService,
    private fb: FormBuilder,
    private _md5: Md5,
    private homeComponent: HomeComponent
  ) {
    this.form = this.fb.group({
      username: [''],
      email: [''],
      text: [''],
      status: [''],
    });
  }

  ngOnChanges(): void {
    if (!this.post) return;

    this.postEditValue = true;
    this.showPreview = false;
    this.form.controls['text'].setValue(this.post.text);
    this.form.controls['status'].setValue(this.post.status);
  }

  uploadFile(event: any): void {
    let fileList: FileList = event.target.files;
    this.image = (fileList.length) ? fileList[0] : null;
  }

  submitForm(data: PostDataInterface): void{
    // update post
    if (this.post) { 
      this.updatePost(data); 
      return;
    }

    if (!this.image) {
      alert('Pls upload your image');
      return;
    };

    let formData = new FormData();
    for (let i in data) {
      formData.append(i, data[i])
    }

    formData.append('image', this.image, this.image.name);

    // switch loader
    this.showLoader = true;
    this.appService.postData(formData)
      .map(res => res.json())
      .subscribe(item => {
        this.showLoader = false;
        alert((item.status === 'error') ? 'Some Error Man!)' : 'Cool you have added new Post');
      });
  }

  updatePost(data: PostDataInterface): void {
    let urlForMd5 = `status=${this.fixedEncodeURIComponent(data.status)}&text=${this.fixedEncodeURIComponent(data.text)}&token=beejee`;

    let formData = new FormData();
    formData.append('status', '' + data.status);
    formData.append('text', data.text);
    formData.append('token', 'beejee');
    // let urlMd5 = data
    formData.append('signature', this.appService.md5Code(urlForMd5));

    this.appService
      .updateData(formData, `${this.post.id}?developer=kapar`)
      .subscribe(res => {
        alert('update you post');
        this.homeComponent.getAllPosts();
      });
  }

  fixedEncodeURIComponent(str): string {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
  }
  
}
