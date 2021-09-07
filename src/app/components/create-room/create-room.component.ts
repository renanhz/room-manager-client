import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Room } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  room: Room = new Room();
  submitted = false;
  form: FormGroup;

  constructor(
    private roomService: RoomService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      date: [null, [Validators.required]],
      startHour: [null, [Validators.required]],
      endHour: [null, [Validators.required]]
    });
  }

  ngOnInit() {
  }

  save() {
    this.roomService.createRoom(this.room)
      .subscribe(data => console.log(data), error => console.log(error));
    this.room = new Room();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/rooms']);
  }

}
