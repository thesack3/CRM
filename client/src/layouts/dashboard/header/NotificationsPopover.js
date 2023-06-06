import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListSubheader,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fToNow } from '../../../utils/formatTime';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { GET_UNREAD_TEXT } from '../../../queries/textQueries';
import { UPDATE_TEXT_IS_READ } from '../../../mutations/sendSms';

export default function NotificationsPopover() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const { data, loading, refetch } = useQuery(GET_UNREAD_TEXT, {
    variables: { userId: '' },
  });

  const [updateTextIsRead] = useMutation(UPDATE_TEXT_IS_READ);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleNavigate = async (id) => {
    navigate(`/lead/${id}`);
    const response = await updateTextIsRead({
      variables: {
        leadId: id,
      },
    });
    await refetch();
  };
  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={data?.unreadTexts?.count || '0'} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {data?.unreadTexts?.count || 0} unread messages
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {data &&
              data?.unreadTexts?.rows &&
              data?.unreadTexts?.rows?.map((notification) => (
                <div
                  key={notification.id}
                  style={{ display: 'flex', gap: '1rem', padding: '.8rem 1.5rem', cursor: 'pointer' }}
                  onClick={() => handleNavigate(notification?.lead?.id)}
                >
                  <img src="/assets/icons/ic_notification_mail.svg" />
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      <p style={{ margin: 0 }}>
                        {notification?.lead?.firstName || ''} {notification?.lead?.lastName || ''}:{' '}
                        {notification?.body || ''}
                      </p>
                      <p style={{ margin: 0, color: 'gray', textTransform: 'capitalize' }}>
                        {fToNow(notification?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </List>
        </Scrollbar>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}
