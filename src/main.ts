import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CorsConfig } from '@config/cors.config';
import { RootConfig } from '@config/config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { CorrelationIdMiddleware } from './middleware/correlation-id.middleware';
import helmet from 'helmet';

import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });

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
