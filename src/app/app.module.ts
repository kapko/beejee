import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
// components
import { HomeComponent } from './home/home.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CreateEditComponent } from './create/create';
import { Ng2ImgToolsModule } from 'ng2-img-tools';
import { Ng2FileInputModule } from 'ng2-file-input';
import { AppService } from './app.service';
import { ImageUploadModule } from 'ng2-imageupload';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2FileInputModule.forRoot(),
    ReactiveFormsModule,
    Ng2ImgToolsModule,
    HttpModule,
    ImageUploadModule
  ],
  providers: [
    AppService,
  ],
  entryComponents: [
    HomeComponent,
    CreateEditComponent,
    AppComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
