import { Thread } from './../../shared/models/thread';
import { DatabaseService } from 'src/app/shared/database/database.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/shared/models/user';
import { time } from 'console';
import { Time } from '@angular/common';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() lid:string;
  @Input() uid:string;
  @Input() currentTime:Time;

  // map with threadID and threadOwner as value
  threadOwners: Map<string,User>;
  threads: Observable<Thread[] | undefined>;

  
  message:string;
  newThread:Thread;
  constructor(private db: DatabaseService) { }

  ngOnInit(): void {
    let map = new Map<string,User>();
    this.threads = this.db.getLectureThreads(this?.lid);

    this.threads.subscribe(threads=> {
      //sort by time
      this.threads=of(threads?.sort((a, b) => Number(a.timePosted) - Number(b.timePosted)));

      threads?.forEach(thread => {
        this.db.getUser(thread.threadOwnerID).subscribe(user => {
          if(user){
            let threadOwner:User = {
              id: '',
              email: user.email,
              fname: user.fname,
              lname: user.lname,
              role: user.role
            }
            map.set(thread.id, threadOwner)
          }
        })
      })
    })
    this.threadOwners = map;
  }

  sendChat(){
    let timestamp = new Timestamp(Date.now()/1000, 0);

    let thread:Thread = {
      datePosted: timestamp,
      threadOwnerID: this.uid,
      message: this.message,
      replies: [],
      timePosted : (this.currentTime ? JSON.stringify(this.currentTime) : '0'), 
      id: '',
      lectureID: this.lid,
    }  
    this.db.createThread(thread)
    this.message='';
  }

  openReplyWindow(thread:Thread){
//    this.replyThread =thread;
  }


  convertTime(t:string){
    let timeNum=Number(t)/100
    if(timeNum ===0) return '0:00';
    let time = timeNum.toString().replace('.',':');
    return time.slice(0,time.indexOf(':')+3)    
  }

  getDate(date:Timestamp){
    return new Date(date.seconds * 1000).toLocaleDateString('en-us');
  }
}
