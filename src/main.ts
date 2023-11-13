import { NestFactory } from '@nestjs/core';

import { RootConfig } from '@config/config';
import { CorsConfig } from '@config/cors.config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { AppModule } from './app/app.module';
import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware';

import helmet from 'helmet';

import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true, snapshot: true });

    // Get Env
    const { ALLOW_ORIGIN } = await app.resolve(CorsConfig);
    const { PORT, API_DOC } = await app.resolve(RootConfig);

    // Logger Pino
    app.useLogger(app.get(Logger));
    app.useGlobalInterceptors(new LoggerErrorInterceptor());

    // Register Middleware
    app.use(helmet());
    app.use(CorrelationIdMiddleware());

    // Versioning
    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'v',
    });

    // CORS
    app.enableCors({
        exposedHeaders: ['x-correlation-id', 'content-disposition'],
        origin: ALLOW_ORIGIN,
    });

    // Swagger
    app.use(
        ['/apidoc', '/apidoc-json'],
        basicAuth({
            challenge: true,
            users: {
                [API_DOC.username]: API_DOC.password,
            },
        }),
    );

    const title = 'Test MongoDB API';
    const config = new DocumentBuilder().setTitle(title).setDescription(title).setVersion('0.0.1').addBearerAuth().build();
    const customSwaggerOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: title,
    };
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('apidoc', app, document, customSwaggerOptions);

    // Auto-validation
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    await app.listen(PORT);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
