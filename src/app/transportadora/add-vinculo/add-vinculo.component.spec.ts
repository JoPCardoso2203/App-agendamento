import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVinculoComponent } from './add-vinculo.component';

describe('AddVinculoComponent', () => {
  let component: AddVinculoComponent;
  let fixture: ComponentFixture<AddVinculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVinculoComponent]
    });
    fixture = TestBed.createComponent(AddVinculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
