import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { SummaryData, SummaryService, WaniSubjectList } from 'wanikani-api-ng';
import { AppState } from '../state';
import { setSummaryData } from '../state/user/user.actions';
import { summaryData } from '../state/user/user.selectors';

const emptySubjectList = { available_at: new Date(), subject_ids: [] };

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  destroyed$ = new Subject<void>();

  firstReview: Observable<WaniSubjectList>;
  firstLesson: Observable<WaniSubjectList>;
  upcomingReviews: Observable<WaniSubjectList[]>;

  summary$: Observable<SummaryData>;

  showNoReviewsToast = false;
  showNoLessonsToast = false;

  constructor(
    private store: Store<AppState>,
    private summaryService: SummaryService,
    private toastController: ToastController) { }

  ngOnInit(): void {
    this.summaryService.getSummary().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(summary => this.store.dispatch(setSummaryData({summary})));

    this.summary$ = this.store.pipe(
      select(summaryData),
      filter(x => !!x)
    );

    this.firstReview = this.summary$.pipe(
      map(data => data.reviews.length ? data.reviews[0] : emptySubjectList)
    );

    this.firstLesson = this.summary$.pipe(
      map(data => data.lessons.length ? data.lessons[0] : emptySubjectList)
    );

    this.upcomingReviews = this.summary$.pipe(
      map(data => data.reviews.slice(1))
    );
  }

  ngOnDestroy(): void {

  }

  startLesson(lesson: WaniSubjectList): void {
    if (!lesson.subject_ids.length) {
      this.toastController.create({
        message: 'No lessons available',
        duration: 500
      }).then(toast => toast.present());
    } else {

    }
  }

  startReview(review: WaniSubjectList): void {
    if (!review.subject_ids.length) {
      this.toastController.create({
        message: 'No reviews available',
        duration: 500
      }).then(toast => toast.present());
    } else {

    }
  }
}
