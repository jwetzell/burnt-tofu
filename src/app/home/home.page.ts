import { Component, OnInit } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SummaryService, WaniSubjectList } from 'wanikani-api-ng';

const emptySubjectList = { available_at: new Date(), subject_ids: [] };

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  firstReview: Observable<WaniSubjectList>;
  firstLesson: Observable<WaniSubjectList>;
  upcomingReviews: Observable<WaniSubjectList[]>;

  showNoReviewsToast = false;
  showNoLessonsToast = false;

  constructor(
    private summaryService: SummaryService,
    private toastController: ToastController) { }

  ngOnInit(): void {
    const summary = this.summaryService.getSummary().pipe(
      shareReplay(),
      map(summary => summary.data)
    );

    this.firstReview = summary.pipe(
      map(data => data.reviews.length ? data.reviews[0] : emptySubjectList)
    );

    this.firstLesson = summary.pipe(
      map(data => data.lessons.length ? data.lessons[0] : emptySubjectList)
    );

    this.upcomingReviews = summary.pipe(
      map(data => data.reviews.slice(1))
    );
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
