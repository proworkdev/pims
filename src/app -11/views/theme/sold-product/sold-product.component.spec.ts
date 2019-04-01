import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldProductComponent } from './sold-product.component';

describe('ProductComponent', () => {
  let component: SoldProductComponent;
  let fixture: ComponentFixture<SoldProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
