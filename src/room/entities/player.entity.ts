//import { v4 as uuid } from 'uuid';

export class Player {
  //id: string;
  socketId: string;
  nickname: string;
  score: number = 0;

  constructor(socketId: string, nickname: string) {
    //this.id = uuid();
    this.socketId = socketId;
    this.nickname = nickname;
  }
}
