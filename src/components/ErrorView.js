import React from 'react';

export default function ErrorView({
  handlerRetry,
  description = 'Ocurrió un error...',
  buttonText = 'Reintentar'
}) {
  return (
    <div>
      {description}
      <button type="button" onClick={handlerRetry}>
        {buttonText}
      </button>
    </div>
  );
}
