import {
  Button,
  Checkbox,
  CheckboxGroup,
  Chip,
  ChipGroup,
  Collapse,
  Group,
  Input,
  Loader,
  LoadingOverlay,
  Progress,
  ScrollArea,
  Space,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { fetchCat, fetchCatBulk, update } from '../../serverAction/serverAction';
import { db } from '@/common/db';
import { WORK_CATEGORY } from '@/common/const';
import GlobalContext from '@/stateContext/GlobalContext/GlobalContext';
import { GlobalState } from '@/@type/GlobalState.types';

export default function FilterSelector(props: {
  setIsAuth: (auth: boolean) => void;
  setFilter: Dispatch<SetStateAction<{ cats: number[]; type: string, keyword: string }>>;
  setIsUpdating: Dispatch<SetStateAction<number>>;
}) {
  const { setIsUpdating } = props;
  const [cat, setCat] = useState<string[]>([]);
  const [type, setType] = useState<string>('SOU');
  const [keyword, setKeyword] = useState<string>('');
  const [appealOpen, { toggle: appealToggle }] = useDisclosure(false);
  const [systemOpen, { toggle: systemToggle }] = useDisclosure(false);
  const [playOpen, { toggle: playToggle }] = useDisclosure(false);
  const [itemOpen, { toggle: itemToggle }] = useDisclosure(false);
  const [characterOpen, { toggle: characterToggle }] = useDisclosure(false);
  const [appearenceOpen, { toggle: appearenceToggle }] = useDisclosure(false);

  useEffect(() => {
    selectAllCat();
  }, []);

  useEffect(() => {
    (async () => {
      const isItemFetched = (await db.items.count()) > 0;
      if (!isItemFetched) await updateItemsList();
    })();
  }, []);

  useEffect(() => {
    props.setFilter({ cats: cat.map((c) => parseInt(c)), type: type, keyword: keyword });
  }, [cat, type, keyword]);

  const isAllCatChecked = (): boolean => (
      cat.length ==
      Object.keys(WORK_CATEGORY.R18.appeal)
        .concat(Object.keys(WORK_CATEGORY.R18.system))
        .concat(Object.keys(WORK_CATEGORY.R18.item))
        .concat(Object.keys(WORK_CATEGORY.R18.play))
        .concat(Object.keys(WORK_CATEGORY.R18.character))
        .concat(Object.keys(WORK_CATEGORY.R18.appearence)).length
    );

  const deselectAllCat = () => {
    setCat([]);
  };

  const selectAllCat = () => {
    setCat(
      Object.keys(WORK_CATEGORY.R18.appeal)
        .concat(Object.keys(WORK_CATEGORY.R18.system))
        .concat(Object.keys(WORK_CATEGORY.R18.item))
        .concat(Object.keys(WORK_CATEGORY.R18.play))
        .concat(Object.keys(WORK_CATEGORY.R18.character))
        .concat(Object.keys(WORK_CATEGORY.R18.appearence))
    );
  };

  const updateItemsList = async () => {
    try {
      setIsUpdating(0);
      const items = await update();
      for (const item of items) {
        await db.items.put(item).catch((e) => console.error(e));
      }
      setIsUpdating(50);

      await updateItemsCat();
      console.log('Update Completed.');
    } catch (e) {
      props.setIsAuth(false);
      localStorage.setItem('auth', 'false');
    }
    setIsUpdating(100);
  };

  const updateItemCat = async (workno: string) => {
    console.log(`${workno} begin...`);
    const ex = await db.workCats.get(workno);
    if (ex == undefined) {
      const cats = await fetchCat(workno);
      await db.workCats.put({ workno, cat: cats });
    }
    console.log(`${workno} completed.`);
  };

  const updateItemBulk = async (worknos: string[]) => {
    const worknoReq = [];
    for (const workno of worknos) {
      const ex = await db.workCats.get(workno);
      if (ex == undefined) {
        worknoReq.push(workno);
      }
    }
    const res = await fetchCatBulk(worknoReq);
    Object.entries(res).forEach((res) => {
      (async () => {
        await db.workCats.put({ workno: res[0], cat: res[1] });
      })();
    });
  };

  const updateItemsCat = async () => {
    const totalItems = await db.items.count();
    const asyncThreads = 25;
    for (let i = 0; i < totalItems; i += asyncThreads) {
      setIsUpdating(50 + (i / totalItems) * 50);
      let listOfKey: string[] = [];
      await db.items
        .offset(i)
        .limit(asyncThreads)
        .primaryKeys((keys) => (listOfKey = keys));
      await updateItemBulk(listOfKey);
    }
  };

  return (
    <>
      <ScrollArea>
        <Stack>
          <Text>Work Category</Text>
          <Checkbox
            label="Select all categories"
            checked={isAllCatChecked()}
            indeterminate={cat.length > 0 && !isAllCatChecked()}
            onChange={() => {
              if (isAllCatChecked()) deselectAllCat();
              else selectAllCat();
            }}
          />
          <CheckboxGroup value={cat} onChange={setCat}>
            <Button fullWidth onClick={appealToggle} variant="outline">
              Appeal
            </Button>
            <Space h="md" />
            <Collapse in={appealOpen}>
              <Group pb="md">
                {Object.entries(WORK_CATEGORY.R18.appeal).map((val) => (
                  <Checkbox value={val[0]} label={val[1]} key={val[0]} />
                ))}
              </Group>
            </Collapse>

            <Button fullWidth onClick={systemToggle} variant="outline">
              System
            </Button>
            <Space h="md" />
            <Collapse in={systemOpen}>
              <Group pb="md">
                {Object.entries(WORK_CATEGORY.R18.system).map((val) => (
                  <Checkbox value={val[0]} label={val[1]} key={val[0]} />
                ))}
              </Group>
            </Collapse>

            <Button fullWidth onClick={playToggle} variant="outline">
              Play
            </Button>
            <Space h="md" />
            <Collapse in={playOpen}>
              <Group pb="md">
                {Object.entries(WORK_CATEGORY.R18.play).map((val) => (
                  <Checkbox value={val[0]} label={val[1]} key={val[0]} />
                ))}
              </Group>
            </Collapse>

            <Button fullWidth onClick={itemToggle} variant="outline">
              Item
            </Button>
            <Space h="md" />
            <Collapse in={itemOpen}>
              <Group pb="md">
                {Object.entries(WORK_CATEGORY.R18.item).map((val) => (
                  <Checkbox value={val[0]} label={val[1]} key={val[0]} />
                ))}
              </Group>
            </Collapse>

            <Button fullWidth onClick={characterToggle} variant="outline">
              Character
            </Button>
            <Space h="md" />
            <Collapse in={characterOpen}>
              <Group pb="md">
                {Object.entries(WORK_CATEGORY.R18.character).map((val) => (
                  <Checkbox value={val[0]} label={val[1]} key={val[0]} />
                ))}
              </Group>
            </Collapse>

            <Button fullWidth onClick={appearenceToggle} variant="outline">
              Appearence
            </Button>
            <Space h="md" />
            <Collapse in={appearenceOpen}>
              <Group pb="md">
                {Object.entries(WORK_CATEGORY.R18.appearence).map((val) => (
                  <Checkbox value={val[0]} label={val[1]} key={val[0]} />
                ))}
              </Group>
            </Collapse>
          </CheckboxGroup>
          <Text>Work Type</Text>
          <ChipGroup value={type} onChange={setType} multiple={false}>
            <Chip value="SOU">ASMR</Chip>
          </ChipGroup>

          <TextInput 
            placeholder='Search by keywords' 
            onChange={e => setKeyword(e.currentTarget.value)}
            value={keyword}
            />
          <Button onClick={updateItemsList}>Update</Button>

        </Stack>
      </ScrollArea>
    </>
  );
}
