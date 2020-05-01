import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService, Preferences, VoiceActor, VoiceActorService, PresentationOrder } from 'wanikani-api-ng';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  constructor(private modalController: ModalController, private userService: UserService, private voiceActorService: VoiceActorService) { }

  ngOnInit() {
    this.preferences = this.userService.getUser().pipe(
      map(user => user.data.preferences),
      tap(preferences=>{
        this.preferencesForm.patchValue(preferences)
      })
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
      map(user => user.data.preferences),
      tap(preferences=>{
        this.preferencesForm.patchValue(preferences)
      })
    )
  }

  compareWithFn(o1,o2){
    return o1 == o2;
  }

}
