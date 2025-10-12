import { forwardRef, useImperativeHandle } from 'react';
import { useTogglable } from '../../contextos/TogglableContexto';

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const { visibilidad, cambiarVisibilidad } = useTogglable();

  useImperativeHandle(ref, () => ({
    togglableVisibilidad: cambiarVisibilidad,
  }));

  return (
    <div>
      {!visibilidad && (
        <button onClick={cambiarVisibilidad}>{buttonLabel}</button>
      )}
      {visibilidad && (
        <div className="mostrar-contenido">
          {children}
          <button onClick={cambiarVisibilidad}>Cancelar</button>
        </div>
      )}
    </div>
  );
});

export default Togglable;
