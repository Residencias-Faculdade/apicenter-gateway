import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendList } from './backend-list';

describe('BackendList', () => {
  let component: BackendList;
  let fixture: ComponentFixture<BackendList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackendList],
    }).compileComponents();

    fixture = TestBed.createComponent(BackendList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
