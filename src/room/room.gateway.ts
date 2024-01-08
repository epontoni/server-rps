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
      
      //const nickname = socket.handshake.auth.nickname;
      //const player = this.roomService.addPlayer(socket.id, nickname);
      //socket.emit('playerCreated', player);


      // Client disconnect from server
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        // Things to do when client disconnect from server
        // - If the client created a room, delete it.
        this.roomService.removeBySocketId(socket.id);
      });
    });
  }

  @SubscribeMessage('createRoom')
  create(@MessageBody() createRoomDto: CreateRoomDto) {
    console.log('[Event: createRoom]', createRoomDto);
    const room = this.roomService.create(createRoomDto);
    this.server.emit('roomCreated', room);
    return room;
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() data: any) {
    console.log('[Event: joinRoom]', data.roomId, data.socketId, data.nickname);
    const room = this.roomService.joinRoom(
      data.roomId,
      data.socketId,
      data.nickname,
    );
    this.server.emit('roomJoined', room);
    //return roomId;
  }

  @SubscribeMessage('findAllRoom')
  findAll() {
    return this.roomService.findAll();
  }

  @SubscribeMessage('findOneRoom')
  findOne(@MessageBody() id: string) {
    return this.roomService.findOne(id);
  }

  @SubscribeMessage('updateRoom')
  update(@MessageBody() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(updateRoomDto.id, updateRoomDto);
  }

  @SubscribeMessage('removeRoom')
  remove(@MessageBody() id: string) {
    return this.roomService.remove(id);
  }
}
