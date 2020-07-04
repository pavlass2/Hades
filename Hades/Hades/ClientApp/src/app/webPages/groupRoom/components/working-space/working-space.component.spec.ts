import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingSpaceComponent } from './working-space.component';

describe('WorkingSpaceComponent', () => {
  let component: WorkingSpaceComponent;
  let fixture: ComponentFixture<WorkingSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
