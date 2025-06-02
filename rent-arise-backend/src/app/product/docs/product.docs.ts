import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function DocCreateProduct() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new product.' }),
    ApiResponse({ status: 201, description: 'Product created successfully.' })
  );
}

export function DocGetAvailableProducts() {
  return applyDecorators(
    ApiOperation({ summary: 'List all available products (not owned by current user).' }),
    ApiResponse({ status: 200, description: 'List of available products.' })
  );
}

export function DocGetMyProducts() {
  return applyDecorators(
    ApiOperation({ summary: 'List all products created by the current user.' }),
    ApiResponse({ status: 200, description: 'List of user-owned products.' })
  );
}

export function DocShowProduct() {
  return applyDecorators(
    ApiOperation({ summary: 'Retrieve product details by ID.' }),
    ApiResponse({ status: 200, description: 'Product data successfully returned.' }),
    ApiResponse({ status: 404, description: 'Product not found.' })
  );
}

export function DocUpdateProduct() {
  return applyDecorators(
    ApiOperation({ summary: 'Update a product by ID.' }),
    ApiResponse({ status: 200, description: 'Product updated successfully.' }),
    ApiResponse({ status: 404, description: 'Product not found.' })
  );
}

export function DocDeleteProduct() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a product by ID.' }),
    ApiResponse({ status: 204, description: 'Product deleted successfully.' }),
    ApiResponse({ status: 404, description: 'Product not found.' })
  );
}