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
  const PAGE_SIZE = 10;

  useEffect(() => {
    setCurrentPage(0);
    setHaveMore(true);
    (async () => {
      let res = await filter(
        globalState.cats,
        globalState.type,
        PAGE_SIZE,
        currentPage * PAGE_SIZE
      );
      setDisplayItems(res);
      if (res.length == 0) setHaveMore(false);
      else setHaveMore(true);
    })();
  }, [globalState]);

  const fetchMore = () => {
    (async () => {
      let result = await filter(
        globalState.cats,
        globalState.type,
        PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
      );
      if (result.length == 0) setHaveMore(false);
      setDisplayItems(displayItems.concat(result));
    })();
    setCurrentPage(currentPage + 1);
  };

  return (
    <Stack bg="var(--mantine-color-body)" justify="flex-start" gap="md">
      <InfiniteScroll
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
      </InfiniteScroll>
    </Stack>
  );
}
