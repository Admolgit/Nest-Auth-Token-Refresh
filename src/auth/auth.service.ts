import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async registerUser(user) {
    const { email, password } = user;

    const userExists = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return 'User already exist';
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await this.usersRepository.save({
      email,
      password: hashedPassword,
    });

    return savedUser;
  }

  async login(user) {
    const { email, password } = user;

    // Find user by email
    const foundUser = await this.userRepo.findOne({ where: { email } });
    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Define secret keys (store in .env in production)
    const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'accessSecretKey';
    const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refreshSecretKey';

    // Generate access token (expires in 1 hour)
    const accessToken = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      ACCESS_SECRET,
      { expiresIn: '1h' },
    );

    // Generate refresh token (expires in 7 days)
    const refreshToken = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      REFRESH_SECRET,
      { expiresIn: '7d' },
    );

    // Optionally: Save refresh token in the database (for invalidation later)
    foundUser.refreshToken = refreshToken;
    await this.userRepo.save(foundUser);

    return {
      accessToken,
      refreshToken,
      user: { id: foundUser.id, email: foundUser.email },
    };
  }

  async refreshToken(oldRefreshToken: string) {
    try {
      const REFRESH_SECRET =
        process.env.JWT_REFRESH_SECRET || 'refreshSecretKey';

      // Decode the refresh token
      const decoded = jwt.verify(
        oldRefreshToken,
        REFRESH_SECRET,
      ) as jwt.JwtPayload;

      if (!decoded.id) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Find user by ID
      const user = await this.userRepo.findOne({ where: { id: decoded.id } });

      if (!user || user.refreshToken !== oldRefreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate a new access token
      const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'accessSecretKey';
      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email },
        ACCESS_SECRET,
        { expiresIn: '1h' },
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
