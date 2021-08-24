import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publicprofile',
  templateUrl: './publicprofile.component.html',
  styleUrls: ['./publicprofile.component.scss'],
})
export class PublicprofileComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 10,
    // slidesPerView: 2.2,
    // centeredSlide:true,
    // slidesPerColumn: 1,
  };
  constructor() { }

  ngOnInit() {}

}
