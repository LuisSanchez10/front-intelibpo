import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'; 
import { DataGraphicsService } from '../../services/data-graphics.service'

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {
  result_bar = [];   
  Hour = [];  
  Count = [];  
  barchart:any;  

  result_pie = [];  
  Topics = [];  
  CountChar = [];  
  chart:any; 

  fecha_init: string;
  fecha_fin: string;

  show_bar:boolean = false;
  show_pie:boolean = false;


  constructor(private getData: DataGraphicsService) { }

  ngOnInit() {
    this.initDate()
    this.diagramBar();
    this.diagramChar()
  }

  //Inicializar fechas
  initDate(){
    let date = new Date();
    this.fecha_fin = date.toISOString().split('T')[0];
    this.fecha_init = new Date(date.setDate(date.getDate() - 100)).toISOString().split('T')[0];
  }

  initValue(){
    this.Topics = [];  
    this.CountChar = [];  
    this.Hour = [];  
    this.Count = [];  
  }

  setdate(){
    if (this.fecha_init && this.fecha_fin){
      let d1 = new Date(this.fecha_init);
      let d2 = new Date(this.fecha_fin);
      if(d2.getTime() >= d1.getTime()){
        this.show_bar = false;
        this.show_pie = false;
        this.initValue();
        this.diagramBar();
        this.diagramChar()
      }
    }
  }

  //Diagrama de barras
  diagramBar(){
    this.getData.getDataBar(this.fecha_init,this.fecha_fin)
      .subscribe((data) => {  
      this.result_bar = data['data'];
      this.result_bar.forEach(x => {  
        this.Hour.push(x.hour);  
        this.Count.push(x.count);  
      });  
      //destroy to reload data
      if (this.barchart) {
        this.barchart.destroy();
      } 
      this.barchart = new Chart('canvas', {  
        type: 'bar',  
        data: {  
          labels: this.Hour,  
          datasets: [  
            {  
              data: this.Count,  
              borderColor: '#3cba9f',  
              backgroundColor: [  
                "#3cb371",  
                "#0000FF",  
                "#9966FF",  
                "#4C4CFF",  
                "#00FFFF",  
                "#f990a7",  
                "#aad2ed",  
                "#FF00FF",  
                "Blue",  
                "Red",  
                "Blue"  ,
                "#800000",
                "#FFFF00",  
                "#808000",  
                "#00FF00",  
                "#008000",  
                "#00FFFF",  
                "#008080",  
                "#0000FF",  
                "#000080",  
                "#FF00FF",  
                "#800080",  
                "#C0C0C0"  ,
                "#808080"
              ],  
              fill: true  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: false  
          },  
          scales: {  
            xAxes: [{  
              display: true  
            }],  
            yAxes: [{  
              display: true  
            }],  
          }  
        }  
      });
      this.show_bar = true;  
    });
  }

  //Diagrama de chars
  diagramChar(){
    this.getData.getDataPie(this.fecha_init,this.fecha_fin)
      .subscribe((data) => {  
      this.result_pie = data['data'];
      this.result_pie .forEach(x => {  
        this.Topics.push(x.name);  
        this.CountChar.push(x.count);  
      });  
      //destroy to reload data
      if (this.chart) {
        this.chart.destroy();
      } 
      this.chart = new Chart('canvas-char', {  
        type: 'doughnut',  
        data: {  
          labels: this.Topics,  
          datasets: [  
            {  
              data: this.CountChar,  
              borderColor: '#3cba9f',  
              backgroundColor: [  
                "#3cb371",  
                "#0000FF",  
                "#9966FF",  
                "#4C4CFF",  
                "#00FFFF"
              ],  
              fill: true  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: true  
          },  
          scales: {  
            xAxes: [{  
              display: false  
            }],  
            yAxes: [{  
              display: true  
            }],  
          }  
        }  
      });  
      this.show_pie = true;
    }); 
  }

}
