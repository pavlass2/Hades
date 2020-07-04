import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRoomComponent } from './main-room.component';

describe('MainRoomComponent', () => {
  let component: MainRoomComponent;
  let fixture: ComponentFixture<MainRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
