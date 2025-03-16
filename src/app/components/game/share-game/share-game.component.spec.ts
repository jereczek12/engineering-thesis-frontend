import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareGameComponent } from './share-game.component';

describe('ShareGameComponent', () => {
  let component: ShareGameComponent;
  let fixture: ComponentFixture<ShareGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
