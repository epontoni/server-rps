//import { v4 as uuid } from "uuid";
//import uuidToPin from "../../utils/uuidToPin";
import { Player } from "./player.entity";
import { Round } from "./round.entity";

export class Room {
  //id: string;
  roomId: string;
  owner: Player;
  players: Player[] = [];
  rounds: Round[] = [];

  constructor(socketId: string, nickname: string) {
    //this.id = uuid();
    this.roomId = Math.random().toString(36).substr(2, 6); // uuidToPin(this.id);
    this.owner = new Player(socketId, nickname);
    this.players.push(this.owner);
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  addRound() {
    const round = new Round();
    this.rounds.push(round);
    return round;
  }
}
