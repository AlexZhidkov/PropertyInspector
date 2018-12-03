import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { Room } from '../model/room';
import { RoomService } from '../services/room.service';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  propertyId: string;
  property: Observable<Property>;
  rooms: Observable<Room[]>;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private roomService: RoomService) { }

  ngOnInit() {
    this.isLoading = true;
    this.propertyId = this.route.snapshot.paramMap.get('id');
    const propertiesPath = 'properties';
    this.propertyService.assignCollection(propertiesPath);
    this.property = this.propertyService.get(this.propertyId);
    this.property.subscribe(e => {
      this.isLoading = false;
    });
    const roomsPath = 'properties/' + this.propertyId + '/rooms';
    this.roomService.assignCollection(roomsPath);
    this.rooms = this.roomService.list();
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
