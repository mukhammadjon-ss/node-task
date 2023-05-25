import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const createUserDto: CreateUserDto = {
    name: 'Name',
    address: 'Address',
    description: 'Description',
    dob: new Date('2023-05-25T08:22:03.948Z'),
  };

  const mockUser = {
    name: 'Name',
    address: 'Address',
    description: 'Description',
    dob: new Date('2023-05-25T08:22:03.948Z'),
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'Name 1',
                address: 'Address 1',
                description: 'Description 1',
                dob: '2023-05-25T08:22:03.948Z',
              },
              {
                name: 'Name 2',
                address: 'Address 2',
                description: 'Description 2',
                dob: '2023-05-25T08:22:03.948Z',
              },
              {
                name: 'Name 3',
                address: 'Address 3',
                description: 'Description 3',
                dob: '2023-05-25T08:22:03.948Z',
              },
            ]),
            create: jest.fn().mockResolvedValue(createUserDto),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest
              .fn()
              .mockRejectedValue({ ...createUserDto, name: 'updated name' }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    expect(controller.findAll()).resolves.toEqual([
      {
        name: 'Name 1',
        address: 'Address 1',
        description: 'Description 1',
        dob: '2023-05-25T08:22:03.948Z',
      },
      {
        name: 'Name 2',
        address: 'Address 2',
        description: 'Description 2',
        dob: '2023-05-25T08:22:03.948Z',
      },
      {
        name: 'Name 3',
        address: 'Address 3',
        description: 'Description 3',
        dob: '2023-05-25T08:22:03.948Z',
      },
    ]);

    expect(service.findAll).toHaveBeenCalled();
  });

  it('add new user', async () => {
    const createSpy = jest
      .spyOn(service, 'create')
      .mockResolvedValueOnce(mockUser);

    await controller.create(createUserDto);
    expect(createSpy).toHaveBeenCalledWith(createUserDto);
  });

  it('should return user by id', async () => {
    expect(controller.findOne('1')).resolves.toEqual({
      name: 'Name',
      address: 'Address',
      description: 'Description',
      dob: new Date('2023-05-25T08:22:03.948Z'),
      _id: 'a id',
    });

    expect(service.findOne).toHaveBeenCalled();
  });

  it('should update data', async () => {
    const userDataToUpdate = { ...createUserDto, name: 'updated name' };
    const updateSpy = jest
      .spyOn(service, 'update')
      .mockResolvedValueOnce(userDataToUpdate);

    await controller.update('a _id', userDataToUpdate);
    expect(updateSpy).toHaveBeenCalledWith('a _id', userDataToUpdate);
  });
});
