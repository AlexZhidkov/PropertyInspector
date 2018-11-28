import { Injectable } from '@angular/core';
import { BaseService } from '../model/BaseService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from '../model/room';
import { ActivatedRoute } from '@angular/router';



@Injectable()
export class RoomService extends BaseService<Room> {
  constructor(afs: AngularFirestore, route: ActivatedRoute) {
    console.log('Room Service called');
    const path = 'properties/cNwLRyZXadjFGzvPpne9/rooms';
    super(path, afs);
  }
}
