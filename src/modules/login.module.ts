import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './/auth/jwt.strategy';

@Module({
    imports: [
    JwtModule.register({
        secret: 'your_secret_key',
        signOptions: { expiresIn: '1h' },
    }),
    ],
    providers: [JwtStrategy],
    exports: [JwtModule],
})
export class AuthModule {}