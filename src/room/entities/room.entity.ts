export class Room {
  roomId: string;
  owner: string;
  players: string[] = [];

  constructor(owner: string) {
    this.roomId = Math.random().toString(36).substr(2, 6);
    this.owner = owner;
    this.players.push(this.owner);
  }
}
