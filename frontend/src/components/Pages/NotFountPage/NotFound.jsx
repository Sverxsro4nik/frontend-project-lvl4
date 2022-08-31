import React from 'react';
import { useTranslation } from 'react-i18next';
import getRoutes from '../../../routes/routes';

import image from '../../../assets/404.svg';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className='text-center h-100 overflow-hidden'>
      <img src={image} alt={t('notFound')} className='img-fluid h-25'/>
      <h1>{t('notFound')}</h1>
      <p className='text-muted'>
        {t('youCan')}
        <a href={getRoutes.chatPage()}>{t('mainPage')}</a>
      </p>
    </div>
  );
};

export default NotFound;
