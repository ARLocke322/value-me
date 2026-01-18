import type { ErrorResponse, MissingResponse } from "@/types/api/companies";

export const isErrorResponse = (response: unknown):
  response is ErrorResponse => {
  return (
    typeof response == 'object' &&
    response != null &&
    'error' in response &&
    typeof response.error == 'string'
  );
}

export const isMissingResponse = (response: unknown)
  : response is MissingResponse => {
  return (
    typeof response == 'object' &&
    response != null &&
    'message' in response &&
    typeof response.message == 'string'
  );
}
