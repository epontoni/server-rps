interface PlayerPlay {
  player: string;
  play: string;
}

export class Round {
  p1: PlayerPlay = { player: '', play: ''};
  p2: PlayerPlay = { player: '', play: ''};
  winner: string;
  ongoing: boolean = true;

  setPlay(player: string, play: string) {
    if (this.p1.player === '') {
      this.p1 = { player, play };
    } else {
      this.p2 = { player, play };
    }
  }

  setWinner() {
    if (this.p1.play === this.p2.play) {
      this.winner = 'draw';
    } else if (
      (this.p1.play === 'rock' && this.p2.play === 'scissors') ||
      (this.p1.play === 'paper' && this.p2.play === 'rock') ||
      (this.p1.play === 'scissors' && this.p2.play === 'paper')
    ) {
      this.winner = this.p1.player;
    } else {
      this.winner = this.p2.player;
    }

    return this.winner;
  }
}
