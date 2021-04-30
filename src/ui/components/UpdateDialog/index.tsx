import {
  Box,
  Button,
  ButtonGroup,
  Chevron,
  Margins,
} from '@rocket.chat/fuselage';
import React, { useEffect, useRef, FC } from 'react';
import { useTranslation } from 'react-i18next';

import * as updateDialogActions from '../../../common/actions/updateDialogActions';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import { useAppVersion } from '../../../common/hooks/useAppVersion';
import { Dialog } from '../Dialog';

export const UpdateDialog: FC = () => {
  const currentVersion = useAppVersion();
  const newVersion = useAppSelector(({ updates }) =>
    updates.updateCheck?.status === 'fulfilled'
      ? updates.updateCheck.newVersion
      : null
  );
  const openDialog = useAppSelector(({ openDialog }) => openDialog);
  const isVisible = openDialog === 'update';

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const installButtonRef = useRef<HTMLButtonElement>();

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    installButtonRef.current?.focus();
  }, [isVisible]);

  const handleSkipButtonClick = (): void => {
    dispatch(updateDialogActions.skipUpdateClicked());
  };

  const handleRemindLaterButtonClick = (): void => {
    dispatch(updateDialogActions.remindUpdateLaterClicked());
  };

  const handleInstallButtonClick = (): void => {
    dispatch(updateDialogActions.installButtonClicked());
  };

  const handleClose = (): void => {
    dispatch(updateDialogActions.dismissed());
  };

  return (
    <Dialog isVisible={isVisible} onClose={handleClose}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Margins block='x8'>
          <Box fontScale='h1'>{t('dialog.update.announcement')}</Box>
          <Box>{t('dialog.update.message')}</Box>
        </Margins>

        <Margins block='x32'>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <Margins inline='x16'>
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                color='info'
              >
                <Box>{t('dialog.update.currentVersion')}</Box>
                <Box fontScale='p2'>{currentVersion}</Box>
              </Box>
              <Chevron right size='32' />
              <Box display='flex' flexDirection='column' alignItems='center'>
                <Box>{t('dialog.update.newVersion')}</Box>
                <Box fontScale='p2'>{newVersion}</Box>
              </Box>
            </Margins>
          </Box>
        </Margins>
      </Box>

      <ButtonGroup>
        <Button type='button' onClick={handleSkipButtonClick}>
          {t('dialog.update.skip')}
        </Button>
        <Button type='button' onClick={handleRemindLaterButtonClick}>
          {t('dialog.update.remindLater')}
        </Button>
        <Button
          ref={installButtonRef}
          type='button'
          primary
          onClick={handleInstallButtonClick}
        >
          {t('dialog.update.install')}
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};
