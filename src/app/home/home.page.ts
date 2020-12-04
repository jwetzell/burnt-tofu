import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { SummaryData, SummaryService, UserService, WaniSubjectList } from 'wanikani-api-ng';
import { AppState } from '../state';
import { setSummaryData, setUserData } from '../state/user/user.actions';
import { summaryData, userData } from '../state/user/user.selectors';

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
    private userService: UserService,
    private summaryService: SummaryService,
    private toastController: ToastController) { }

  ngOnInit(): void {
    // ensure the user is set
    // if the user was already logged in the login page wouldn't have set the user.
    this.store.pipe(
      takeUntil(this.destroyed$),
      select(userData),
      filter(user => !user), // only continue if user is undefined
      switchMap(_ => this.userService.getUser())
    ).subscribe(user => this.store.dispatch(setUserData({user})));

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
