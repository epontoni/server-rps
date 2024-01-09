import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Player } from './entities/player.entity';

@Injectable()
export class RoomService {
  private rooms: Record<string, Room> = {};
  //private players: Record<string, Player> = {}; // *

  // addPlayer(socketId: string, nickname: string) {
  //   console.log('[Service: addPlayer]', socketId, nickname);
  //   const player = new Player(socketId, nickname);
  //   this.players[player.id] = player;
  //   console.log('[Service: list of players]', this.players);
  //   return player;
  // }

  create(createRoomDto: CreateRoomDto) {
    const room = new Room(createRoomDto.socketId, createRoomDto.nickname);
    console.log('[Service: create]', room);
    this.rooms[room.roomId] = room;
    console.log('[Service: list of rooms]', this.rooms);
    return room;
  }

  joinRoom(roomId: string, socketId: string, nickname: string) {
    console.log('[Service: joinRoom]', roomId, nickname);
    console.log('[Service: joinRoom] Before add player', this.rooms);
    const room = this.rooms[roomId];
    const player = new Player(socketId, nickname);
    room.addPlayer(player);
    console.log('[Service: joinRoom] After add player', this.rooms);
    return room;
  }

  rival(roomId: string) {
    console.log('[Service: rival]', roomId);
    const room = this.rooms[roomId];
    return room.players[1].socketId;
  }

  play(playerMove: any) {
    console.log('[Service: play]', playerMove);
    const room = this.rooms[playerMove.roomId]; // Selecciono la sala
    console.log('[Service: play] Sala seleccionada', room);
    const onGoingRound = room.rounds[room.rounds.length - 1]?.ongoing; // Elijo el último round y compruebo si está en curso
    console.log('[Service: play] onGoingRound', onGoingRound);
    if (onGoingRound) {
      const round = room.rounds[room.rounds.length - 1];
      round.setPlay(playerMove.socketId, playerMove.move, playerMove.isOwner);
      const winner = round.setWinner();

      for (const player of room.players) {
        if (player.socketId === winner) {
          player.score++;
        }
      }

      round.ongoing = false;
      return round;
    } else {
      const round = room.addRound();
      round.setPlay(playerMove.socketId, playerMove.move, playerMove.isOwner);
      console.log('Room, round: ', room, round);
    }
  }

  removeBySocketId(socketId: string) {
    console.log('[Service: removeBySocketId]', socketId);

    //console.log('[Service: list of rooms BEFORE disconnection]', this.rooms);

    for (const roomId in this.rooms) {
      const room = this.rooms[roomId];
      if (room.owner.socketId === socketId) {
        delete this.rooms[roomId];
        break;
      }
    }
    //console.log('[Service: list of rooms AFTER disconnection]', this.rooms);
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: string) {
    return this.rooms[id];
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: string) {
    return `This action removes a #${id} room`;
  }
}
