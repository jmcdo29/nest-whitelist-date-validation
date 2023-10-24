import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        // Experiment with setting whitelist to true, false, undefined
        // or removing the whitelist property completely
        whitelist: false,
        transform: false,
        transformOptions: {
          enableImplicitConversion: false,
        },
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/?date=2023-10-24T10:00:00')
      .expect(200)
      .expect('typeof string');
  });
});
