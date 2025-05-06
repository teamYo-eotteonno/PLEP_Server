import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {} // ✅ userRepository 주입

  private readonly kakaoApiKey = 'YOUR_KAKAO_REST_API_KEY';

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }  

  // 주소 → 좌표 변환 (예: "서울 강남구" → { lat, lng })
  async getAddressToCoords(address: string) {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
      {
        headers: { Authorization: `KakaoAK ${this.kakaoApiKey}` },
      },
    );
    return response.data.documents[0];
  }

  // async updateProfile(userId: number, updateDto: UpdateProfileDto): Promise<User> {
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //
  //   // 변경 가능한 필드만 업데이트
  //   if (updateDto.profileImage !== undefined) user.profileImage = updateDto.profileImage;
  //   if (updateDto.nickname !== undefined) user.nickname = updateDto.nickname;
  //   if (updateDto.bio !== undefined) user.bio = updateDto.bio;
  //
  //   return this.userRepository.save(user);
  // }
}