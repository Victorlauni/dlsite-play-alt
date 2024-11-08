import { Center, Divider, Loader, Stack } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ItemDisplayCard from '../ItemDisplayCard/ItemDisplayCard';
import { filter, getItemCount } from '@/common/db';
import { GeneralItem } from '@/@type/DlsiteItem.types';
import GlobalContext from '@/stateContext/GlobalContext/GlobalContext';

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
      const res = await filter(globalState.cats, globalState.type, globalState.keyword, PAGE_SIZE, 0);
      setDisplayItems(res);
    })();
  }, [globalState]);


  const fetchMore = async () => {
      const result = await filter(
        globalState.cats,
        globalState.type,
        globalState.keyword,
        PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
      );
      if ((currentPage+1)*PAGE_SIZE >= await getItemCount()) setHaveMore(false);
      setDisplayItems(displayItems.concat(result));
      setCurrentPage(currentPage + 1);
  };

  return (
    <Stack bg="var(--mantine-color-body)" justify="flex-start" gap="md">
      {displayItems.length >= 0 ? (
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
          {displayItems.map((item) => 
          <>
            <ItemDisplayCard item={item} key={item.workno} />
            <Divider my="md"/>
          </>)}
        </InfiniteScroll>
      ) : (
        <></>
      )}
    </Stack>
  );
}
