import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() len:number;
  @Output() onSizeChanged = new EventEmitter<number>()
  myForm : FormGroup;
  
  constructor() {

    this.myForm = new FormGroup({
              
      "size": new FormControl(this.len, [Validators.required,Validators.pattern("^([3-9]|10)$")]),

    });
  }  

  ngOnInit(): void {
    this.myForm.controls['size'].setValue(this.len)
  }

  onSizeChange(num:number){
    this.myForm.controls['size'].markAsPristine()
    this.onSizeChanged.emit(num);
  }

}
