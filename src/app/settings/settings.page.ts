import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService, VoiceActor, VoiceActorService, PresentationOrder } from 'wanikani-api-ng';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, take } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {

  private destroyed = new Subject<boolean>();

  voiceActors: Observable<VoiceActor[]>
  //WaniKani accepts batch sizes from 3 to 10 inclusive this array is for using ngFor
  batchSizes = Array(8).fill(1).map((x,i)=>i+3)

  //these are used for iterating over enums in ngFor
  keys = Object.keys
  presentationOrderEnum = PresentationOrder

  preferencesForm = new FormGroup({
    default_voice_actor_id: new FormControl(""),
    lessons_autoplay_audio: new FormControl(""),
    lessons_batch_size: new FormControl(""),
    lessons_presentation_order: new FormControl(""),
    reviews_autoplay_audio: new FormControl(""),
    reviews_display_srs_indicator: new FormControl(""),
  })

  constructor(  private modalController: ModalController, 
                private userService: UserService, 
                private voiceActorService: VoiceActorService,
                private toastController: ToastController) { }

  ngOnDestroy(): void {
    this.destroyed.next(true);
  }

  ngOnInit() {
    this.userService.getUser().pipe(
      map(user => user.data.preferences),
      takeUntil(this.destroyed)
    ).subscribe(
      (preferences)=>{
        this.preferencesForm.patchValue(preferences)
      }
    )

    this.voiceActors = this.voiceActorService.getAllVoiceActors().pipe(
      map(voiceActorCollection => voiceActorCollection.data)
    )
  }

  close(){
    this.modalController.dismiss()
  }

  updatePreferences(){
    this.userService.updateUser(this.preferencesForm.value).pipe(
      map(user => user.data.preferences),
      take(1)
    ).subscribe(
      ()=>{
        //this could be more elegant but works for now
        this.toastController.create({
          duration: 2000,
          message: 'Preferences Successfully Updated',
          color: 'success'
        }).then(
          (toast)=>{
            toast.present()
          }
        )
      }
    )
  }

  compareWithFn(o1,o2){
    return o1 == o2;
  }

}
