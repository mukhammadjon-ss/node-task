import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

const mockUser = {
  name: 'Name',
  address: 'Address',
  description: 'Description',
  dob: new Date('2023-05-25T08:22:03.948Z'),
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue([
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
              ]),
            }),
            create: jest.fn().mockImplementationOnce(() =>
              Promise.resolve({
                name: 'Name',
                address: 'Address',
                description: 'Description',
                dob: new Date('2023-05-25T08:22:03.948Z'),
              }),
            ),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    const result = await service.findAll();
    expect(result.length).toEqual(2);
  });

  it('should add new user', async () => {
    const newUser = await service.create({
      name: 'Name',
      address: 'Address',
      description: 'Description',
      dob: new Date('2023-05-25T08:22:03.948Z'),
    });

    expect(newUser).toEqual(mockUser);
  });
});
