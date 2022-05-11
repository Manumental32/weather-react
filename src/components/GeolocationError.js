/* eslint-disable no-restricted-globals */
import React from 'react';
import ErrorView from './ErrorView';

export default function GeolocationError() {
  return (
    <ErrorView
      description="No pudimos localizarlo. Revise los permisos. "
      buttonText="Recargar la página"
      handlerRetry={() => location.reload()}
    />
  );
}
