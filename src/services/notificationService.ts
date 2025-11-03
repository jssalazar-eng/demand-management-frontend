import { toast, ToastOptions, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configuración base para todas las notificaciones
const defaultConfig: ToastOptions = {
  position: "top-right" as ToastPosition,
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

// Configuraciones específicas por tipo
const configs = {
  success: {
    ...defaultConfig,
    autoClose: 3000,
    className: "toast-success-haceb",
  },
  error: {
    ...defaultConfig,
    autoClose: 6000,
    className: "toast-error-haceb",
  },
  warning: {
    ...defaultConfig,
    autoClose: 5000,
    className: "toast-warning-haceb",
  },
  info: {
    ...defaultConfig,
    autoClose: 4000,
    className: "toast-info-haceb",
  },
  loading: {
    ...defaultConfig,
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    className: "toast-loading-haceb",
  } as ToastOptions,
};

class NotificationService {
  // Notificación de éxito
  static success(message: string, options?: Partial<ToastOptions>) {
    return toast.success(message, { ...configs.success, ...options });
  }

  // Notificación de error
  static error(message: string, options?: Partial<ToastOptions>) {
    return toast.error(message, { ...configs.error, ...options });
  }

  // Notificación de advertencia
  static warning(message: string, options?: Partial<ToastOptions>) {
    return toast.warn(message, { ...configs.warning, ...options });
  }

  // Notificación de información
  static info(message: string, options?: Partial<ToastOptions>) {
    return toast.info(message, { ...configs.info, ...options });
  }

  // Notificación de carga (loading)
  static loading(message: string, options?: Partial<ToastOptions>) {
    return toast.loading(message, { ...configs.loading, ...options });
  }

  // Actualizar una notificación existente
  static update(
    toastId: any,
    options: {
      render: string;
      type: "success" | "error" | "warning" | "info";
      isLoading?: boolean;
      autoClose?: number;
    }
  ) {
    const config = configs[options.type];
    return toast.update(toastId, {
      ...config,
      render: options.render,
      type: options.type,
      isLoading: options.isLoading || false,
      autoClose: options.autoClose || config.autoClose,
    });
  }

  // Cerrar todas las notificaciones
  static dismissAll() {
    toast.dismiss();
  }

  // Cerrar una notificación específica
  static dismiss(toastId: any) {
    toast.dismiss(toastId);
  }

  // Notificaciones específicas para la aplicación
  static demandCreated(title: string) {
    return this.success(`✅ Demanda "${title}" creada exitosamente`);
  }

  static demandUpdated(title: string) {
    return this.success(`📝 Demanda "${title}" actualizada correctamente`);
  }

  static demandDeleted(title: string) {
    return this.success(`🗑️ Demanda "${title}" eliminada`);
  }

  static dataLoaded(entity: string) {
    return this.info(`📊 ${entity} cargados correctamente`);
  }

  static connectionError(details?: string) {
    const baseMessage = "🔌 Sin conexión a internet";
    const fullMessage = details 
      ? `${baseMessage}: ${details}` 
      : `${baseMessage}. Verifica tu conexión e intenta nuevamente.`;
    
    return this.error(fullMessage, {
      autoClose: false, // No cerrar automáticamente
      closeOnClick: true,
    });
  }

  static serverError() {
    return this.error(
      "🚨 El servidor no está disponible. Intenta más tarde.",
      {
        autoClose: 8000,
      }
    );
  }

  static validationError(message: string) {
    return this.warning(`⚠️ ${message}`);
  }

  static unauthorized() {
    return this.error("🔒 No tienes permisos para realizar esta acción");
  }

  static genericError(message?: string) {
    return this.error(
      message || "❌ Ha ocurrido un error inesperado. Intente nuevamente."
    );
  }
}

export default NotificationService;
