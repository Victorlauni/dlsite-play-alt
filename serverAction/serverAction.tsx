'use server';

import { cookies } from 'next/headers';
import { JSDOM } from 'jsdom';
import { RedisClient } from '@/common/redis';

const constructHeaderWithCookies = () => {
  const cookieArr = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const c of cookies().getAll()) {
    cookieArr.push(`${c.name}=${c.value}`);
  }
  const header = new Headers();
  header.append('Cookie', cookieArr.join('; '));
  return header;
};

const saveCookies = (res: Response) => {
  const resCookies = res.headers.getSetCookie();
  for (const cookie of resCookies) {
    const cookieKV = cookie.split(';')[0];
    const [key, value] = cookieKV.split('=');
    cookies().set(key, value);
  }
};

const forwardCookiesAndRedirect = async (res: Response): Promise<Response> => {
  const url = res.headers.get('location') ?? '';
  console.log(`Redirected to ${url}`);
  saveCookies(res);
  const header = constructHeaderWithCookies();
  const newRes = await fetch(url, {
    cache: 'no-store',
    credentials: 'include',
    headers: header,
    redirect: 'manual',
  });
  if (newRes.status > 300 && newRes.status < 400) return forwardCookiesAndRedirect(newRes);
  return Promise.resolve(newRes);
};

export async function login(accountInfo: { email: string; password: string }): Promise<any> {
  await fetch('https://login.dlsite.com/login?user=self', {
    credentials: 'include',
    cache: 'no-store',
  })
    .then((res) => {
      const resCookies = res.headers.getSetCookie();
      let XSRF = '';
      for (const cookie of resCookies) {
        const cookieKV = cookie.split(';')[0];
        const [key, value] = cookieKV.split('=');
        if (key === 'XSRF-TOKEN') XSRF = value;
        cookies().set(key, value);
      }
      const formData = new FormData();
      formData.append('login_id', accountInfo.email);
      formData.append('password', accountInfo.password);
      formData.append('_token', XSRF);
      const header = constructHeaderWithCookies();
      return fetch('https://login.dlsite.com/login', {
        body: formData,
        cache: 'no-store',
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        headers: header,
        redirect: 'manual',
      });
    })
    .then((res) => forwardCookiesAndRedirect(res))
    .then((res) => res.text())
    .then((res) => {
      if (!res.includes('ログイン中です')) {
        throw new Error('Login failed.');
      } else {

      }
    });

  return Promise.resolve(cookies().getAll());
}

export async function update(): Promise<any> {
  let data: any[] = [];
  await fetch('https://play.dlsite.com/login', {
    credentials: 'include',
    cache: 'no-store',
    redirect: 'manual',
  })
    .then((res) => forwardCookiesAndRedirect(res))
    .then((res) => {
      saveCookies(res);
      return fetch('https://play.dlsite.com/api/authorize', {
        credentials: 'include',
        cache: 'no-cache',
        headers: constructHeaderWithCookies(),
      });
    })
    .then(async (_) => {
      const itemCount = await fetch('https://play.dlsite.com/api/product_count?last=0', {
        credentials: 'include',
        cache: 'no-store',
        headers: constructHeaderWithCookies(),
      })
        .then((res) => res.json())
        .then((json) => json.user);
      if (isNaN(itemCount)) throw new Error('Cred expired.');
      console.log(`Total Items: ${itemCount}`);
      const dataFetch = [];
      for (let i = 0, page = 1; i < itemCount; i += 50, page++) {
        console.log(`Fetching...   (${i}/${itemCount})`);
        dataFetch.push(
          fetch(`https://play.dlsite.com/api/purchases?last=0&page=${page}`, {
            credentials: 'include',
            cache: 'no-store',
            headers: constructHeaderWithCookies(),
          })
        );
      }
      return Promise.all(dataFetch);
    })
    .then(async (res) => {
      for (const val of res) {
        data = data.concat((await val.json()).works);
      }
    })
    .catch((err) => {
      throw err;
    });

  return Promise.resolve(data);
}

export async function fetchCat(workno: string): Promise<number[]> {
  const catList: number[] = [];
  const url = `https://www.dlsite.com/maniax/work/=/product_id/${workno}.html`;
  await fetch(url)
    .then((res) => res.text())
    .then((res) => {
      const doc = new JSDOM(res);
      const childList = doc.window.document.getElementsByClassName('main_genre').item(0)?.children;
      for (let i = 0; i < (childList?.length ?? 0); i++) {
        const child = childList?.item(i)!!;
        const href = child.getAttribute('href') ?? '';
        //const catName = child.textContent
        //console.log(`${catName} ${href}`)
        const hrefRX = /.+genre\/([0-9]*)\/from.+/g;
        const catNo = hrefRX.exec(href);
        if (catNo != null && catNo.length > 1) catList.push(parseInt(catNo[1], 10));
      }
    });
  return Promise.resolve(catList);
}

export async function getCatFromKvOrFetch(workno: string): Promise<number[]> {
  const redis = await RedisClient.getRedisClient();
  const catNos = await redis.sMembers(`dlsite:workcat:${workno}`);
  if (catNos == null || catNos.length === 0) {
    const catNosInt = await fetchCat(workno);
    if (catNosInt.length > 0) await redis.sAdd(`dlsite:workcat:${workno}`, catNosInt.map((num: number) => num.toString()));
    else await redis.SADD(`dlsite:workcat:${workno}`, '-1');
    return catNosInt;
  }
  return Promise.resolve(catNos.filter((v) => v !== '-1').map((v) => parseInt(v, 10)));
}

export async function fetchCatBulk(worknos: string[]): Promise<Record<string, number[]>> {
  const promiseList = [];
  const result: Record<string, number[]> = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const workno of worknos) {
    promiseList.push(getCatFromKvOrFetch(workno));
  }
  (await Promise.all(promiseList)).forEach((val, ind) => {
    result[worknos[ind]] = val;
  });
  return Promise.resolve(result);
}
