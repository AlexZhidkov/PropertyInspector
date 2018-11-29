import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from '../model/room';
import { ActivatedRoute } from '@angular/router';



@Injectable()
export class RoomService extends BaseService<Room> {
  firestorePath: string;
  constructor(afs: AngularFirestore, route: ActivatedRoute) {
    super(afs);
  }

  assignCollection(path: string) {
    this.firestorePath = path;
    this.setCollection(this.firestorePath);
  }
}
