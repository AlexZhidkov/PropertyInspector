import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Property } from '../model/property';
import { ActivatedRoute } from '@angular/router';



@Injectable()
export class PropertyService extends BaseService<Property> {
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
