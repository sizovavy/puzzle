import { Blank } from './blank';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  private createArr(num:number){

    let array:Array<number> = new Array()
    for (let i = num*num - 1; i > 0; i--) {           
      array.push(i)      
    }
      return array

  }

  private shuffleArr(array:Array<number>){

    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }   
    array.push(-1)    
    return array 

  }

  private arrayTo2d(array:Array<number>,len:number,blankObj:Blank){

    let resArray:Array<Array<number>> = new Array()
  
    for(let i = 0; i < len; i++){
      resArray.push([])
      for(let j = 0; j < len; j++){        
        resArray[i].push(array[len*i+j])
      }
    }

    blankObj.x = len - 1
    blankObj.y = len - 1
    return resArray

  }

  createField(len:number,blankObj:Blank){ 

    return this.arrayTo2d( this.shuffleArr(this.createArr(len)),len,blankObj)

  }

  clickHandler(blankObj:Blank,array:Array<Array<number>>,curX:number,curY:number){

    let diff = Math.abs(blankObj.x - curX) + Math.abs(blankObj.y -curY)

    if(diff !==1) return;

    let temp = array[curX][curY];
    array[curX][curY] = array[blankObj.x][blankObj.y]
    array[blankObj.x][blankObj.y] = temp;

    blankObj.x = curX;
    blankObj.y = curY;  
    
    if(this.checkTheWin(array)) alert("Вы выигали!")       

  }

  checkTheWin(array:Array<Array<number>>){
    
    return array.flat().every((e,i,a)=>{
     
      if(i==0) return true;
      if(a[i-1] < e) return true;
      if(i==array.length*array.length-1 && e==-1) return true;
      return false
    })

  }
}
