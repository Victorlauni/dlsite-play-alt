'use client';

import {
  Button,
  LoadingOverlay,
  Modal,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { login, update } from '../../serverAction/serverAction';

export default function LoginModal(props: { setIsAuth: (isAuth: boolean) => void }) {
  const [opened, { open, close }] = useDisclosure(true);
  const [accountInfo, setAccountInfo] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const tryLogin = async () => {
    setIsLoading(true);
    notifications.show({ message: 'fds' });
    try {
      await login(accountInfo);
    } catch (e) {
      setMessage('Error logging you in... Please try again...');
      setIsLoading(false);
      return;
    }

    // try {
    //   await update();
    // } catch (e) {
    //   setMessage('Error fetching dlsite play...');
    //   setIsLoading(false);
    //   return;
    // }

    props.setIsAuth(true);
    localStorage.setItem('auth', 'true');
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {}}
      withCloseButton={false}
      title="Please login to your DLSite account."
      centered
    >
      <Stack>
        <LoadingOverlay visible={isLoading} zIndex={1000} />
        <TextInput
          placeholder="Email"
          onChange={(e) =>
            setAccountInfo({ email: e.currentTarget.value, password: accountInfo.password })
          }
          value={accountInfo.email}
        />
        <PasswordInput
          placeholder="Password"
          onChange={(e) =>
            setAccountInfo({ email: accountInfo.email, password: e.currentTarget.value })
          }
          value={accountInfo.password}
        />
        <Button disabled={isLoading} onClick={async () => tryLogin()}>
          Login
        </Button>
        <Text size="sm" c="red">
          {message}
        </Text>
      </Stack>

      {/* <Button onClick={async () => prop.setData(await update())}/> */}
    </Modal>
  );
}
