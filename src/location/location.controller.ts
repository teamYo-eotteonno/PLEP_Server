import { Controller, Get, Query, UseGuards, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { JwtAuthGuard} from "../auth/jwt-auth.guard";
import { SearchNearbyDto } from './dto/search-nearby.dto';
import { SaveLocationDto } from './dto/save-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('nearby')
  async findNearby(@Query() searchNearbyDto: SearchNearbyDto) {
    return this.locationService.findNearbyAttractions(
      searchNearbyDto.latitude,
      searchNearbyDto.longitude,
      searchNearbyDto.radius,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async saveLocation(@Body() saveLocationDto: SaveLocationDto) {
    return this.locationService.saveUserLocation(
      saveLocationDto.userId,
      saveLocationDto.name,
      saveLocationDto.latitude,
      saveLocationDto.longitude,
      saveLocationDto.address,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('saved')
  async getSavedLocations(@Query('userId') userId: number) {
    return this.locationService.getUserSavedLocations(userId);
  }
}