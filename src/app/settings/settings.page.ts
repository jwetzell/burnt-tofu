import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService, Preferences, VoiceActor, VoiceActorService, PresentationOrder } from 'wanikani-api-ng';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  preferences: Observable<Preferences>
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

  ngOnInit() {
    this.preferences = this.userService.getUser().pipe(
      map(user => user.data.preferences),
      take(1) //prevents the following subscribe from triggering more than once?
    )

    this.preferences.subscribe(
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
    this.preferences = this.userService.updateUser(this.preferencesForm.value).pipe(
      map(user => user.data.preferences)
    )
    
    this.preferences.subscribe(
      (preferences)=>{
        this.preferencesForm.patchValue(preferences)
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
