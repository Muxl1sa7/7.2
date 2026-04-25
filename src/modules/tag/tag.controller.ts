import { Controller } from "@nestjs/common";
import { ApiBearerAuth, ApiInternalServerErrorResponse } from "@nestjs/swagger";







@ApiBearerAuth("Jwt-auth")
@ApiInternalServerErrorResponse({description:"Internal server error"})
@Controller('tag')
export class TagController {
    
}