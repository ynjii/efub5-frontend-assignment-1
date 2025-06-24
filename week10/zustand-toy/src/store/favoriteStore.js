import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { produce } from 'immer'

export const useFavoriteStore = create(
  persist(
    devtools(
      (set) => ({
        items: [],
        // 곡 추가
        addItem: (item) =>
          set(
            produce((state) => {
              state.items.push({
                id: item.id,
                title: item.title,
                artist: item.artist,
                url: item.url,
                note: item.note || '',
              })
            })
          ),
        // 곡 정보 수정
        updateItem: (id, data) =>
          set(
            produce((state) => {
              const idx = state.items.findIndex((i) => i.id === id)
              if (idx !== -1) Object.assign(state.items[idx], data)
            })
          ),
        // 곡 삭제
        removeItem: (id) =>
          set(
            produce((state) => {
              state.items = state.items.filter((i) => i.id !== id)
            })
          ),
      }),
      { name: 'fav-devtools' }
    ),
    { name: 'fav-persist' }
  )
)
