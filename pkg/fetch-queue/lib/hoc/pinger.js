async function ping(url) {
  try {
    await fetch(url, {
      method: 'POST',
      keepalive: true,
    });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default async function* pinger(url, interval = 1000) {
  while (true) {
    yield await new Promise((resolve, reject) =>
      setTimeout(async () => {
        resolve(await ping(url));
      }, interval)
    );
  }
}
