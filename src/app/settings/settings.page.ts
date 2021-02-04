import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { PresentationOrder, UserService, VoiceActor, VoiceActorService } from 'wanikani-api-ng';
import { AppState } from '../state';
import { userData } from '../state/user/user.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {

  private destroyed = new Subject<boolean>();

  voiceActors: Observable<VoiceActor[]>
  // WaniKani accepts batch sizes from 3 to 10 inclusive this array is for using ngFor
  batchSizes = Array(8).fill(1).map((x,i)=>i+3)

  // these are used for iterating over enums in ngFor
  keys = Object.keys
  presentationOrderEnum = PresentationOrder

  preferencesForm = new FormGroup({
    default_voice_actor_id: new FormControl(''),
    lessons_autoplay_audio: new FormControl(''),
    lessons_batch_size: new FormControl(''),
    lessons_presentation_order: new FormControl(''),
    reviews_autoplay_audio: new FormControl(''),
    reviews_display_srs_indicator: new FormControl(''),
  })

  constructor(  private modalController: ModalController,
                private userService: UserService,
                private store: Store<AppState>,
                private voiceActorService: VoiceActorService,
                private toastController: ToastController) { }

  ngOnInit() {
    this.preferencesForm.disable();
    this.store.pipe(
      select(userData),
      filter(x => !!x),
      map(user => user.preferences),
      takeUntil(this.destroyed)
    ).subscribe(
      (preferences)=>{
        this.preferencesForm.patchValue(preferences)
        this.preferencesForm.enable();
      }
    )

    this.voiceActors = this.voiceActorService.getAllVoiceActors().pipe(
      map(voiceActorCollection => voiceActorCollection.data)
    )
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  close(){
    this.modalController.dismiss()
  }

  updatePreferences(){
    if(this.preferencesForm.enabled){
      this.userService.updateUser(this.preferencesForm.value).pipe(
        map(user => user.data.preferences),
        take(1)
      ).subscribe(
        ()=>{
          // this could be more elegant but works for now
          this.toastController.create({
            duration: 2000,
            message: 'Preferences Successfully Updated',
            color: 'success'
          }).then(
            (toast)=>{
              toast.present()
            }
          )
        },
        ()=>{
          // this could be more elegant but works for now
          this.toastController.create({
            duration: 2000,
            message: 'Updating Preferences Failed',
            color: 'danger'
          }).then(
            (toast)=>{
              toast.present()
            }
          )
        }
      )
    }
  }

  compareWithFn(o1,o2){
    return o1 === o2;
  }

}
