'use client';
import { AppShell, Burger, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LoginModal from '../LoginModal/LoginModal';

export default function AppLayout(prop: {children: any}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
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
        {localStorage.getItem("auth") === "true" ? <></> : <LoginModal />}
      </AppShell.Navbar>
      <AppShell.Main>{prop.children}</AppShell.Main>
    </AppShell>
  );
}