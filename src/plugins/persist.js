export function persistPlugin({ store }) {
  const key = `pinia-${store.$id}`

  const saved = localStorage.getItem(key)
  if (saved) store.$patch(JSON.parse(saved))

  // 寫入邏輯增加過濾
  store.$subscribe((_, state) => {
    // 建立一個複製品，避免改到原始 state
    const stateToPersist = { ...state }

    // 這些東西不需要被「永久儲存」
    const blacklist = ['loading', 'error', 'requestPromise']
    blacklist.forEach(key => delete stateToPersist[key])

    localStorage.setItem(key, JSON.stringify(stateToPersist))
  })
}