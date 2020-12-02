import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Assignment, AssignmentService, WaniSubject, WaniSubjectService } from 'wanikani-api-ng';


const slideOpts = {
  initialSlide: 1,
  speed: 400
};

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.page.html',
  styleUrls: ['./lesson.page.scss'],
})
export class LessonPage implements OnInit {

  allLessons: Observable<Assignment[]>;
  allSubjects: Observable<WaniSubject[]>;

  

  constructor(
    private assignmentService: AssignmentService,
    private subjectService: WaniSubjectService
  ) { }

  ngOnInit() {
    this.allLessons = this.assignmentService.getAllAssignments({immediately_available_for_lessons:true}).pipe(
      shareReplay(),
      map(collection=>collection.data)
    )

    this.allSubjects = this.allLessons.pipe(
      map(lessons=>lessons.map(lesson=>lesson.data.subject_id)),
      switchMap(ids=>this.subjectService.getAllSubjects({ids})),
      map(subjects=>subjects.data)
    )

    this.allSubjects.subscribe((subjects)=>{
      console.log(subjects)
    })
  }
}
