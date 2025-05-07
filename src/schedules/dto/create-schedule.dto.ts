import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
    @ApiProperty({ example: '회의', description: '일정 제목' })
    title: string;

    @ApiProperty({ example: '2025-05-07', description: '일정 날짜 (YYYY-MM-DD)' })
    date: string; // YYYY-MM-DD

    @ApiProperty({ example: '14:00:00', description: '일정 시간 (HH:mm:ss)', required: false })
    time?: string; // HH:mm:ss (optional)

    @ApiProperty({ example: true, description: '하루 종일 일정 여부' })
    allDay: boolean;

    @ApiProperty({ example: 'https://example.com', description: '일정 위치 URL', required: false })
    locationUrl?: string;

    @ApiProperty({ example: '팀 회의입니다.', description: '일정 메모', required: false })
    memo?: string;
}
