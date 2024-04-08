'use client';
import { AppShell, Burger, Group, Loader, LoadingOverlay, Progress, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LoginModal from '../LoginModal/LoginModal';
import { useEffect, useState } from 'react';
import FilterSelector from '../FilterSelector/FilterSelector';
import GlobalContext from '@/stateContext/GlobalContext/GlobalContext';
import { GlobalState } from '@/@type/GlobalState.types';

export default function AppLayout(prop: { children: any }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [globalState, setGlobalState] = useState<GlobalState>({ cats: [], type: '' });
  const [isAuth, setIsAuth] = useState(false);
  const [isUpdating, setIsUpdating] = useState(100);

  const updateProgress = (
    <Stack w="100%" align="center">
      <Loader color="blue" />
      <Progress value={isUpdating} w="60vw" />
      <Text>{Math.round(isUpdating) + '%'}</Text>
    </Stack>
  );

  useEffect(() => {
    // Perform localStorage action
    setIsAuth(localStorage.getItem('auth') === 'true');
  }, []);

  return (
    <GlobalContext.Provider value={globalState}>
      <LoadingOverlay visible={isUpdating < 100} loaderProps={{ children: updateProgress }}/>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <Text>
              DLsite Play -ALT-
            </Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          {isAuth ? (
            <FilterSelector setIsAuth={setIsAuth} setFilter={setGlobalState} setIsUpdating={setIsUpdating}/>
          ) : (
            <LoginModal setIsAuth={setIsAuth} />
          )}
        </AppShell.Navbar>
        <AppShell.Main style={isUpdating < 100 ? {overflowY: 'hidden', maxHeight: "100vh"}: {}}>{prop.children}</AppShell.Main>
      </AppShell>
    </GlobalContext.Provider>
  );
}
