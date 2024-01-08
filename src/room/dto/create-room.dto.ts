import { Room } from '../entities/room.entity';

export class CreateRoomDto extends Room {
  socketId: string;
  nickname: string;
}
