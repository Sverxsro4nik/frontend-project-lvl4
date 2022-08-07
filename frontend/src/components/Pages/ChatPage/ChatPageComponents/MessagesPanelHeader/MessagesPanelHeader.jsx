import React from 'react';
import { useTranslation } from 'react-i18next';

const MessagesPanelHeader = ({ activeChannel, messagesCount }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"># {activeChannel ? activeChannel.name : ''}</p>
      <span className="text-muted">
        {messagesCount} {t('messages')}
      </span>
    </div>
  );
};

export default MessagesPanelHeader;
