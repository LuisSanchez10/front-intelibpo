import { Component, OnInit } from '@angular/core';
import { DataGraphicsService } from '../../services/data-graphics.service'

@Component({
  selector: 'app-form-calls',
  templateUrl: './form-calls.component.html',
  styleUrls: ['./form-calls.component.scss']
})
export class FormCallsComponent implements OnInit {
  saved:boolean = false;

  constructor(private gethttp: DataGraphicsService) { }

  ngOnInit() {
  }

  myData = {
    "first_name": "Luis", 
    "last_name": "Sanchez",
    "call_time": "2019-09-03 22:13:17",
    "duration_call": "124",
    "topic_id": 2
  };

  public textedJson = JSON.stringify(this.myData, undefined, 4);

  saveCall(){
    console.log(this.textedJson);
    this.gethttp.saveCall(this.textedJson)
    .subscribe((res: any) => {
        this.saved = true;
      }, err => {
        this.saved = false;
        console.log(err);
    });
  }

}
