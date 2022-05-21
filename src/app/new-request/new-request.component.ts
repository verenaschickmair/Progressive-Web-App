import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent implements OnInit {

  constructor() { }

  public appointmentNumber = 1;

  ngOnInit(): void {
  }

}
