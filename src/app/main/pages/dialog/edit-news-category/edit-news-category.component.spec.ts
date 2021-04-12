import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewsCategoryComponent } from './edit-news-category.component';

describe('EditNewsCategoryComponent', () => {
  let component: EditNewsCategoryComponent;
  let fixture: ComponentFixture<EditNewsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNewsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNewsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
