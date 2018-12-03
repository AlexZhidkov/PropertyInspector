import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image } from '../model/image';
import { HttpClient } from '@angular/common/http';

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
    this.httpClient.get('https://us-central1-propertyinspector-dev.cloudfunctions.net/getImageUrl?url=' + url)
      .subscribe(r => {
        const newImage: Image = {
          url: r['url']
        };
        this.add(newImage);
      });
  }
}
