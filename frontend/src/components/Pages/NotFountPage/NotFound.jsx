import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <div>
      {t('notFound')}
      {' '}
      {location.pathname}
    </div>
  );
};

export default NotFound;
