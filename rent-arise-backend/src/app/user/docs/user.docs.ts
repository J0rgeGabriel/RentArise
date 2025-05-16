import { applyDecorators } from "@nestjs/common/decorators/core/apply-decorators";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";
import { ApiResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator";

export function DocGetAllUsers() {
  return applyDecorators(
    ApiOperation({ summary: 'List all users.' }),
    ApiResponse({ status: 200, description: 'List of users' })
  );
}

export function DocShowUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Returns user data.' }),
    ApiResponse({ status: 200, description: 'User data successfully returned.' }),
    ApiResponse({ status: 404, description: 'User not found.' })
  );
}

export function DocUpdateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a user by id.' }),
    ApiResponse({ status: 200, description: 'User updated successfully.' }),
    ApiResponse({ status: 404, description: 'User not found.' })
  );
}

export function DocDeleteUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a user by id.' }),
    ApiResponse({ status: 204, description: 'User removed successfully.' }),
    ApiResponse({ status: 404, description: 'User not found.' })
  );
}