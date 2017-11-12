import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController, App, ViewController } from 'ionic-angular';
import { HomePage } from '.././home/home';
import { SmLoginPage } from '../smLogin/smLogin';
import { ServerService } from '../../app/server.service';
import { Http } from '@angular/http';
import { MyApp } from '../../app/app.component';
import { User } from '../../models/user';
import { Message } from '../../models/message';
//import { CoolLocalStorage } from 'angular2-cool-storage';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  private user: User;
  private http: Http;
  serverService: ServerService;
  private message: Message;
  //localStorage: CoolLocalStorage;
  private login_record: number =0;
  private password: string = "";

  constructor(public viewCtrl: ViewController, public app: App, serverService: ServerService, http: Http, public navCtrl: NavController, public appCtrl: App, public toastCtrl: ToastController, public alertCtrl: AlertController, public modalCtrl: ModalController, /*localStorage: CoolLocalStorage*/) {
    this.http = http;
    this.serverService = serverService;          
    this.user = new User(0,"",0,"");
    this.navCtrl = navCtrl;
    this.message = new Message;
    //this.localStorage = localStorage;   
  }

  //로그인
  signIn(){
    this.serverService.getLoginrecord(this.user.user_id)
    .then(message =>
    {
      this.login_record = message.login_record;
      console.log('로그인기록'+this.login_record);
      if(this.login_record == 0)
      this.showPasswordAlert();
      else{
      this.serverService.makeLogin(this.user)
      .then(message =>
      { 
        if(message.key == -1)
          this.presentLoginToast(message);
        if(message.key == 2)
          this.presentLoginToast(message);
        if(message.key == 0){
        
         
          //this.localStorage.setItem('USERID', message.user_id.toString());
          //this.localStorage.setItem('USERAUTH', message.user_auth.toString());
          //this.localStorage.setItem('USERNAME', message.user_name);
         
          ServerService.USERID = message.user_id;
          ServerService.USERNAME = message.user_name;
          ServerService.USERAUTH = message.user_auth;

          this.presentLoginToast(message);
          
          //this.navCtrl.push(HomePage);
          //this.appCtrl.getRootNav().setRoot(HomePage);
          //window.location.reload();

          setTimeout(() => { 
            this.app.getRootNav().setRoot(HomePage);
            }, 300);
            this.dismiss();
      
         
        }
      });
    }
  });
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  presentLoginToast(message) {
      let toast = this.toastCtrl.create({
      message: message.title,
      duration: 3000,
      position: 'bottom',
      });
      toast.present();
  }

  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  openSmLoginPage() {
    let modal = this.modalCtrl.create(SmLoginPage);
    modal.present();
  }

  showPasswordAlert() {
    let prompt = this.alertCtrl.create({
       title: '비밀번호 변경',
       inputs: [
            {
              name: 'password',
              type: 'password',
              placeholder: '기존 비밀번호',
           },
           {
              name: 'newPassword',
              type: 'password', 
              placeholder: '새 비밀번호',
           },
           {
              name: 'newPasswordCheck',
              type: 'password', 
              placeholder: '비밀번호 확인',
          }
       ],
       buttons: [
          {
             text: '취소',
             handler: data => {
             }
          },
          {
             text: '확인',
             handler: data => {
              //비번이 기존꺼랑 일치하는지 여부 틀리면 틀리다.
              
              this.user.user_password = data['newPassword'];
              this.serverService.updatePassword(this.user)
              .then(message =>
              {
                this.presentLoginToast(message);

                //this.localStorage.setItem('USERID', message.user_id.toString());
               // this.localStorage.setItem('USERAUTH', message.user_auth.toString());
                //this.localStorage.setItem('USERNAME', message.user_name);

                ServerService.USERID = message.user_id;
                ServerService.USERNAME = message.user_name;
                ServerService.USERAUTH = message.user_auth;
              
               // this.navCtrl.push(HomePage);
                //this.appCtrl.getRootNav().setRoot(HomePage);
                //window.location.reload();
                setTimeout(() => { 
                  this.app.getRootNav().setRoot(HomePage);
                  }, 300);
                  this.dismiss();
               
            });
            }                   
          }
       ]
    });
    prompt.present();
    }
  }


