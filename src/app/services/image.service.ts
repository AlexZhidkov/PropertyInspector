import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image } from '../model/image';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ImageService extends BaseService<Image> {
  firestorePath: string;
  constructor(afs: AngularFirestore, route: ActivatedRoute) {
    super(afs);
  }

  assignCollection(path: string) {
    console.log(path);
    this.firestorePath = path;
    this.setCollection(this.firestorePath);
  }
}
