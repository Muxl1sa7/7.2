import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiInternalServerErrorResponse } from "@nestjs/swagger";
import { TagService } from "./tag.service";
import { createTagDto } from "./dto/create-tag.dto";
import { get } from "http";
import { AuthGuard } from "src/common/guards/auth-guards";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decarator";
import { RolesUser } from "src/shared/enums/roles.enum";







@ApiBearerAuth("Jwt-auth")
@ApiInternalServerErrorResponse({description:"Internal server error"})
@Controller('tag')
export class TagController {
constructor(private readonly tagService: TagService) {}


@UseGuards(AuthGuard,RolesGuard)
@Roles(RolesUser.ADMIN, RolesUser.SUPERADMIN, RolesUser.USER)
@Post()
create(@Body() createTagDto:createTagDto, @Req() req.user){
    return this.tagService.create(createTagDto, req.user.id);
}

@Get()
findAll(){
    return this.tagService.findAll();
}


@Get (':id')
findOne(@Param('id')id: string){
    return this.tagService.finOne(+id);
}

@Patch(':id')
@UseGuards(AuthGuard,RolesGuard)
@Roles(RolesUser.ADMIN, RolesUser.SUPERADMIN)
update(@Param('id') id: string, @Body() updateTagDto:UpdateTagDto){
    return this.tagService.update(+id, updateTagDto)
}


@Delete(':id')
@UseGuards(AuthGuard,RolesGuard)
@Roles(RolesUser.ADMIN, RolesUser.SUPERADMIN)
remove(@Param('id') id:string){
    return this.tagService.remove(+id);
}
}