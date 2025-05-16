import { applyDecorators } from "@nestjs/common/decorators/core/apply-decorators";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";
import { ApiResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator";

export function DocRegister() {
  return applyDecorators(
    ApiOperation({ summary: 'Register a new user.' }),
    ApiResponse({ status: 201, description: 'User successfully registered.' }),
    ApiResponse({ status: 400, description: 'Validation failed.' })
  );
}

export function DocLogin() {
  return applyDecorators(
    ApiOperation({ summary: 'Authenticate user and return JWT token.' }),
    ApiResponse({ status: 200, description: 'Login successful, token returned.' }),
    ApiResponse({ status: 401, description: 'Invalid credentials.' })
  );
}