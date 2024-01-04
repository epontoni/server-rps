import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }})
export class RoomGateway implements OnModuleInit {
  @WebSocketServer()
  public server: Server;

  constructor(private readonly roomService: RoomService) {}

  onModuleInit() {
    // Client connect to server
    this.server.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);

      // Things to do when client connect to server
      // - Send a welcome message to client: socket.emit('message', 'Welcome to server')
      // - Notify all client that a new client has connected to server: socket.broadcast.emit('message', 'A new user has joined the chat')
      // - Add client to a clients list: clients.push(socket)

      // Client disconnect from server
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }

  @SubscribeMessage('createRoom')
  create(@MessageBody() createRoomDto: CreateRoomDto) {
    console.log('[Event: createRoom]', createRoomDto)
    return this.roomService.create(createRoomDto);
  }

  @SubscribeMessage('findAllRoom')
  findAll() {
    return this.roomService.findAll();
  }

  @SubscribeMessage('findOneRoom')
  findOne(@MessageBody() id: number) {
    return this.roomService.findOne(id);
  }

  @SubscribeMessage('updateRoom')
  update(@MessageBody() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(updateRoomDto.id, updateRoomDto);
  }

  @SubscribeMessage('removeRoom')
  remove(@MessageBody() id: number) {
    return this.roomService.remove(id);
  }
}
