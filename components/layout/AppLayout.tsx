'use client';
import { AppShell, Burger, Group, Text } from '@mantine/core';
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
  useEffect(() => {
    // Perform localStorage action
    setIsAuth(localStorage.getItem('auth') === 'true');
  }, []);

  return (
    <GlobalContext.Provider value={globalState}>
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
            <Text>Fuck</Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          {isAuth ? (
            <FilterSelector setIsAuth={setIsAuth} setFilter={setGlobalState} />
          ) : (
            <LoginModal setIsAuth={setIsAuth} />
          )}
        </AppShell.Navbar>
        <AppShell.Main>{prop.children}</AppShell.Main>
      </AppShell>
    </GlobalContext.Provider>
  );
}
