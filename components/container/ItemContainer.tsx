import { Center, Loader, Stack } from '@mantine/core';
import ItemDisplayCard from '../ItemDisplayCard/ItemDisplayCard';
import { useContext, useEffect, useState } from 'react';
import { filter } from '@/common/db';
import { GeneralItem } from '@/@type/DlsiteItem.types';
import GlobalContext from '@/stateContext/GlobalContext/GlobalContext';
import InfiniteScroll from 'react-infinite-scroll-component';
export default function ItemContainer() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [displayItems, setDisplayItems] = useState<GeneralItem[]>([]);
  const [haveMore, setHaveMore] = useState(true);
  const globalState = useContext(GlobalContext);
  const PAGE_SIZE = 20;

  useEffect(() => {
    setCurrentPage(0);
    setDisplayItems([]);
    setHaveMore(true);
    (async () => {
      let res = await filter(
        globalState.cats,
        globalState.type,
        PAGE_SIZE,
        0
      );
      setDisplayItems(res);
    })();
  }, [globalState]);

  const fetchMore = () => {
    setCurrentPage(currentPage + 1);
    (async () => {
      let result = await filter(
        globalState.cats,
        globalState.type,
        PAGE_SIZE,
        (currentPage) * PAGE_SIZE
      );
      if (result.length == 0) setHaveMore(false);
      setDisplayItems(displayItems.concat(result));
    })();
  };

  return (
    <Stack bg="var(--mantine-color-body)" justify="flex-start" gap="md">
      {displayItems.length > 0 ? <InfiniteScroll
        dataLength={displayItems.length}
        next={fetchMore}
        hasMore={haveMore}
        loader={
          <Center>
            <Loader />
          </Center>
        }
      >
        {displayItems.map((item) => {
          return <ItemDisplayCard item={item} key={item.workno} />;
        })}
      </InfiniteScroll> : <></>}
    </Stack>
  );
}
