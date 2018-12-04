import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image } from '../model/image';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ImageService extends BaseService<Image> {
  firestorePath: string;

  constructor(afs: AngularFirestore, private httpClient: HttpClient) {
    super(afs);
  }

  assignCollection(path: string) {
    this.firestorePath = path;
    this.setCollection(this.firestorePath);
  }

  addImageUrl(url: string) {
    if (url.indexOf('https://photos.app.goo.gl/') === 0) {
      this.httpClient.get(environment.firebaseFunctionsUrl + 'getImageUrl?url=' + url)
        .subscribe(r => this.addNewImage(r['url']));
    } else {
      this.addNewImage(url);
    }
  }

  addNewImage(imageUrl: string) {
    const newImage: Image = {
      url: imageUrl
    };
    this.add(newImage);
  }
}
