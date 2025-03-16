import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuDialogComponent } from './cpu-dialog.component';

describe('CpuDialogComponent', () => {
  let component: CpuDialogComponent;
  let fixture: ComponentFixture<CpuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
