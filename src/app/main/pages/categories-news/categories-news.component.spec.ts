import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesNewsComponent } from './categories-news.component';

describe('CategoriesNewsComponent', () => {
  let component: CategoriesNewsComponent;
  let fixture: ComponentFixture<CategoriesNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
