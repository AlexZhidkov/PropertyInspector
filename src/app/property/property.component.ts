import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { Room } from '../model/room';
import { RoomService } from '../services/room.service';
import { PropertyService } from '../services/property.service';
import { ImagesLoadIndicatorService } from '../services/images-load-indicator.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  propertyId: string;
  property: Observable<Property>;
  rooms: Observable<Room[]>;
  isRoomListLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public propertyService: PropertyService,
    private roomService: RoomService,
    private imagesLIS: ImagesLoadIndicatorService) { }

  ngOnInit() {
    this.isRoomListLoading = true;
    this.propertyId = this.route.snapshot.paramMap.get('id');
    const propertiesPath = 'properties';
    this.propertyService.assignCollection(propertiesPath);
    this.property = this.propertyService.get(this.propertyId);
    const roomsPath = 'properties/' + this.propertyId + '/rooms';
    this.roomService.assignCollection(roomsPath);
    this.rooms = this.roomService.list();
    this.rooms.subscribe(e => {
      this.isRoomListLoading = false;
    });
  }

  addNewRoom() {
    const newRoom: Room = {
      name: '',
      notes: '',
      rating: 0
    };
    this.roomService.add(newRoom).then(room =>
      this.router.navigate(['room/' + this.propertyId + '/' + room.id]));
  }
}
