import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayList } from './gateway-list';

describe('GatewayList', () => {
  let component: GatewayList;
  let fixture: ComponentFixture<GatewayList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatewayList],
    }).compileComponents();

    fixture = TestBed.createComponent(GatewayList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
