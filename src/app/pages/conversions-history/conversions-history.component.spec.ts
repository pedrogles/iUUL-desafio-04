import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversionsHistoryComponent } from './conversions-history.component';

describe('ConversionsHistoryComponent', () => {
  let component: ConversionsHistoryComponent;
  let fixture: ComponentFixture<ConversionsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversionsHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
