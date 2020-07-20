<template>
  <div class="container mx-auto min-h-full p-4 bg-gray-100">
    <h1 class="text-2xl mt-4 font-bold uppercase">Your awesome async app</h1>
    <div class="flex flex-col md:flex-row">
      <div class="p-4" style="min-width: 200px">
        <div class="mt-8">
          <div class="font-bold flex justify-between items-center">
            YOUR ITEMS
            <span class="text-gray-500 hover:text-gray-900 cursor-pointer" title="Refresh the list"
              @click="fetchItems">
              <svg xmlns="http://www.w3.org/2000/svg" class="toe-icon ti ti-refresh" width="24" height="24" viewBox="0 0 64 64" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round">
                <path d="M45.274 29.772c-1.094-8.15-8.075-14.435-16.525-14.435-9.203 0-16.674 7.471-16.674 16.674s7.471 16.675 16.674 16.675c4.423 0 8.664-1.757 11.791-4.884l2.862 2.863a20.722 20.722 0 01-14.653 6.069c-11.437 0-20.723-9.285-20.723-20.723 0-11.437 9.286-20.723 20.723-20.723 10.623 0 19.379 7.994 20.582 18.294l3.551-3.551L56 29.148l-8.792 8.792-8.796-8.796 3.118-3.117 3.744 3.745z" fill-rule="nonzero"></path>
              </svg>
            </span>
          </div>
          <div :class="{'cp-list mt-4': isLoadingItems}">
            <div
              class="text-gray-700 mt-4 transition-all duration-300 transform hover:translate-x-1 cursor-pointer hover:text-black"
              v-for="item in items" :key="item.id">
              &bullet; {{ item.product }}
            </div>
            <div class="mt-4" v-if="!items.length && !isLoadingItems">
              No items found
            </div>
          </div>
        </div>
        <div class="mt-8">
          <div class="font-bold flex justify-between items-center">
            RECENT USERS
            <span class="text-gray-500 hover:text-gray-900 cursor-pointer" title="Refresh the list"
              @click="fetchUsers">
              <svg xmlns="http://www.w3.org/2000/svg" class="toe-icon ti ti-refresh" width="24" height="24" viewBox="0 0 64 64" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round">
                <path d="M45.274 29.772c-1.094-8.15-8.075-14.435-16.525-14.435-9.203 0-16.674 7.471-16.674 16.674s7.471 16.675 16.674 16.675c4.423 0 8.664-1.757 11.791-4.884l2.862 2.863a20.722 20.722 0 01-14.653 6.069c-11.437 0-20.723-9.285-20.723-20.723 0-11.437 9.286-20.723 20.723-20.723 10.623 0 19.379 7.994 20.582 18.294l3.551-3.551L56 29.148l-8.792 8.792-8.796-8.796 3.118-3.117 3.744 3.745z" fill-rule="nonzero"></path>
              </svg>
            </span>
          </div>
          <div :class="{'cp-users mt-4': isLoadingUsers}">
            <div class="text-gray-700 mt-4 flex items-center" v-for="user in users" :key="user.id">
              <img :src="user.avatar" width="21" height="21" class="rounded-full inline-block" />
              <span class="ml-2">{{ user.username }}</span>
            </div>
            <div class="mt-4" v-if="!users.length && !isLoadingUsers">
              No users found
            </div>
          </div>
        </div>
      </div>
      <div
        class="p-4 flex-auto"
        :class="{'cp-post w-full pt-12': isLoadingPosts}">
        <div
          class="mt-8 shadow rounded p-4 bg-white"
          v-for="post in posts"
          :key="post.id">
          <h2 class="text-xl font-bold leading-8" :class="{'cp-line-2': isLoadingPostId === post.id}">{{ post.title }}</h2>
          <div :class="{'cp-postinfo': isLoadingPostId === post.id}" class="text-xs text-gray-500">
            <span v-show="post.date">{{ post.date }}</span>
            <span class="inline-block ml-4" v-show="post.views">{{ post.views }} reads</span>
            <span class="inline-flex ml-4 items-center" v-show="post.rating">
              {{ post.rating }}/5
              <span class="text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="toe-icon ti ti-star-filled" width="18" height="18" viewBox="0 0 64 64" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M32.001 9.188l5.666 17.438h18.335L41.169 37.403l5.666 17.438-14.834-10.777-14.833 10.777 5.666-17.438L8 26.626h18.335l5.666-17.438z"></path>
                </svg>
              </span>
            </span>
          </div>
          <div class="mt-4" :class="{'cp-paragraph': isLoadingPostId === post.id}">
            {{ post.body }}
          </div>
          <div class="flex items-center justify-between mt-4">
            <div>
              <button class="rounded px-4 py-2 bg-blue-500 text-white font-semibold" v-show="isLoadingPostId !== post.id">
                Read more
              </button>
            </div>
            <button class="rounded p-2 text-green-500 self-end" title="Change data" @click="fetchPosts(post.id)"
              v-show="!isLoadingPostId || isLoadingPostId === post.id">
              <svg xmlns="http://www.w3.org/2000/svg" class="toe-icon ti ti-refresh" width="24" height="24" viewBox="0 0 64 64" fill="currentColor" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round">
                <path d="M45.274 29.772c-1.094-8.15-8.075-14.435-16.525-14.435-9.203 0-16.674 7.471-16.674 16.674s7.471 16.675 16.674 16.675c4.423 0 8.664-1.757 11.791-4.884l2.862 2.863a20.722 20.722 0 01-14.653 6.069c-11.437 0-20.723-9.285-20.723-20.723 0-11.437 9.286-20.723 20.723-20.723 10.623 0 19.379 7.994 20.582 18.294l3.551-3.551L56 29.148l-8.792 8.792-8.796-8.796 3.118-3.117 3.744 3.745z" fill-rule="nonzero"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="text-center flex justify-center my-8">
          <button @click="fetchPosts()"
            class="bg-green-500 text-white rounded px-4 py-2 inline-block"
            :disabled="isLoadingPosts">
            {{ isLoadingPosts ? 'Loading...' : 'Refresh Posts' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { lorem, date, random, internet, commerce } from 'faker'

function mockPost () {
  return {
    title: lorem.sentence(),
    body: lorem.paragraph(),
    date: new Date(date.past()).toDateString(),
    id: random.uuid(),
    views: random.number(300),
    rating: random.number({ min: 0.5, max: 5, precision: 1 }),
    user: internet.userName()
  }
}

function mockPosts () {
  return [...new Array(Math.round(Math.random() * 20))].map(mockPost)
}

function mockUsers () {
  return [...new Array(Math.round(Math.random() * 12))].map(_ => ({
    id: random.uuid(),
    avatar: internet.avatar(),
    username: internet.userName()
  }))
}

function mockItems () {
  return [...new Array(Math.round(Math.random() * 12))].map(_ => ({
    id: random.uuid(),
    product: commerce.product()
  }))
}

export default {
  name: 'App',

  setup () {
    const posts = ref([])
    const users = ref([])
    const items = ref([])
    const isLoadingPosts = ref(true)
    const isLoadingUsers = ref(true)
    const isLoadingItems = ref(true)
    const isLoadingPostId = ref(null)

    function delayResponse (fn) {
      setTimeout(() => {
        fn()
      }, Math.random() * 7000)
    }

    function fetchPosts (id = null) {
      if (id) {
        isLoadingPostId.value = id
        const index = posts.value.findIndex(p => p.id === id)
        posts.value.splice(index, 1, {
          id,
          title: '',
          body: '',
          date: '',
          views: '',
          rating: '',
          user: ''
        })
        delayResponse(() => {
          posts.value.splice(index, 1, mockPost())
          isLoadingPostId.value = null
        })

        return
      }

      isLoadingPosts.value = true
      posts.value = []
      delayResponse(() => {
        isLoadingPosts.value = false
        posts.value = mockPosts()
      })
    }

    function fetchUsers () {
      isLoadingUsers.value = true
      users.value = []
      delayResponse(() => {
        users.value = mockUsers()
        isLoadingUsers.value = false
      })
    }

    function fetchItems () {
      isLoadingItems.value = true
      items.value = []
      delayResponse(() => {
        items.value = mockItems()
        isLoadingItems.value = false
      })
    }

    fetchPosts()
    fetchUsers()
    fetchItems()

    return {
      posts,
      users,
      items,
      isLoadingPosts,
      isLoadingUsers,
      isLoadingItems,
      isLoadingPostId,
      fetchPosts,
      fetchUsers,
      fetchItems
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
