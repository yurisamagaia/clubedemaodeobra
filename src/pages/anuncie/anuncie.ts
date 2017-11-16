import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EmailComposer } from '@ionic-native/email-composer';
import { Http } from '@angular/http';
import { AppModule } from '../../app/app.module';

@Component({
  selector: 'page-anuncie',
  templateUrl: 'anuncie.html'
})
export class AnunciePage {

  anuncie: any;
  private url: string = AppModule.getUrl();

  constructor(public navCtrl: NavController, private emailComposer: EmailComposer, private http: Http) {
    this.http.get(this.url+'anuncie.php').map(res => res.json()).subscribe(data => {
       this.anuncie = data;
   });
  }

  sendEmail(){
    this.emailComposer.isAvailable().then((available: boolean) =>{
     if(available) {
       let email = {
          to: 'max@mustermann.de',
          cc: 'erika@mustermann.de',
          subject: 'Anucie',
          body: 'How are you? Nice greetings from Leipzig',
          isHtml: true
        };

        // Send a text message using default options
        this.emailComposer.open(email);
     }
    });
  }

}
