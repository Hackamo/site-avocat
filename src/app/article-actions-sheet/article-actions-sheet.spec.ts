import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleActionsSheet } from './article-actions-sheet';

describe('ArticleActionsSheet', () => {
  let component: ArticleActionsSheet;
  let fixture: ComponentFixture<ArticleActionsSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleActionsSheet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleActionsSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
