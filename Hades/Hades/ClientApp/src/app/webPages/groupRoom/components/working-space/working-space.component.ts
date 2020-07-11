import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-working-space',
  templateUrl: './working-space.component.html',
  styleUrls: ['./working-space.component.scss']
})
export class WorkingSpaceComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroll') scroll: ElementRef;

  refreshIntervalId;

  constructor() { }

  ngOnInit(): void {
  }

  scrollToBottom(): void {
    try {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();     
  } 

}
