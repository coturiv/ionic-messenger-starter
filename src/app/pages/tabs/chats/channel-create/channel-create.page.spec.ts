import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCreatePage } from './channel-create.page';

describe('ChannelCreatePage', () => {
  let component: ChannelCreatePage;
  let fixture: ComponentFixture<ChannelCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
