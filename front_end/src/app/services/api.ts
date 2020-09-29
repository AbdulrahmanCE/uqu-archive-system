const apiUrl = 'http://localhost:8000/ocr';

export const api = {
  newForm: `${apiUrl}/new_form`,
  predict: `${apiUrl}/predict`,
  models: `${apiUrl}/models`,
  upload: `${apiUrl}/upload`,
  checkTask: `${apiUrl}/check_task`
};
