export class CreateGroupDto {
  name: string;
  description: string;
  createdBy: number; // 방장 ID
  hashtags: string[];
}
