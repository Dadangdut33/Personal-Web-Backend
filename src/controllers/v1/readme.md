# V1 API

## Status code

https://www.rfc-editor.org/rfc/rfc4918#section-11.2

- 200: Success
- 201: Created
- 400: Bad request -> Invalid input
- 422: Unprocessable entity -> [Data not found](https://stackoverflow.com/questions/40439663/correct-http-error-code-if-id-passed-in-body-not-exists-invalid)
- 500: Internal server error -> Unexpected error
