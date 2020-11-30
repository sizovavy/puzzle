import { PuzzleService } from './../puzzle.service';
import { Blank } from './../blank';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {

  size:number = 4
  blankObj: Blank = {
    x: undefined,
    y: undefined
  }
  field:Array<Array<number>>

  constructor(private puzzleService:PuzzleService){} 


  ngOnInit(){
    this.field = this.puzzleService.createField(this.size,this.blankObj)
  }

  onSizeChanged(num:number){
    if(num) this.size = num
    this.field = this.puzzleService.createField(this.size,this.blankObj)
  }


  click(i,j){

      this.puzzleService.clickHandler(this.blankObj,this.field,i,j)      

  }

}
