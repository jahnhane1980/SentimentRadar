import Toast from 'react-native-toast-message';

export const NotificationService = {
  showSuccess: (title, message = '') => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      position: 'bottom',
    });
  },
  showError: (title, message = '') => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'bottom',
    });
  },
  showInfo: (title, message = '') => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      position: 'bottom',
    });
  }
};