function Toast({ mensagem }) {
  if (!mensagem) {
    return null;
  }

  return (
    <div className="toast-app" role="status" aria-live="polite">
      {mensagem}
    </div>
  );
}

export default Toast;
