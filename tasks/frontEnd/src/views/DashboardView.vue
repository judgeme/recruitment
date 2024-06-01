<template>
  <Box paddingBlock="400" class="header">
    <div style="display: flex; align-items: center; gap: 10px">
      <Text variant="headingLg" as="h1"> Reviews Dashboard </Text>
      <router-view v-if="$route.path === '/reviews'">
        <Badge variant="" as="h1">
          {{ startIndex }}-{{ endIndex }} of {{ reviews.length }} Reviews</Badge
        >
      </router-view>
      <router-view v-if="$route.path === '/published-reviews'">
        <Badge
          variant=""
          as="h1"
          :tone="reviewsStore.published.length > 0 ? 'success' : 'attention'"
          size="large"
          >{{ reviewsStore.published.length }} Published Reviews</Badge
        >
      </router-view>
      <router-view v-if="$route.path === '/store-reviews'">
        <Badge variant="" as="h1" tone="attention" size="large">0 Store Reviews</Badge>
      </router-view>
    </div>
    <RouterLink to="/new-review">
      <Button class="button" accessibilityLabel="Write a Product Review">
        Create a Product Review &nbsp;<IconWrite />
      </Button>
    </RouterLink>
  </Box>

  <LegacyCard>
    <div v-if="reviewsStore.reviewCount">
      <Tabs :tabs="tabs" :selected="selected" @select="handleTabChange"> </Tabs>
    </div>
    <div v-else><SkeletonTabs :count="tabs.length" /></div>
    <router-view></router-view>
  </LegacyCard>
</template>

<script setup lang="ts">
import { useReviewsStore } from '@/stores/reviewsStore'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()

const reviewsStore = useReviewsStore()

type Reviewer = {
  name: string
  email: string
  image: string
  country: string
}

type Review = {
  date: string
  rating: string
  reviewTitle: string
  reviewBody: string
  reviewImages: string[]
  verifiedPurchase: boolean
  published: boolean
}

type ReviewItem = {
  shopName: string
  productName: string
  reviewer: Reviewer
  review: Review
  id: string
}

const reviews = ref<ReviewItem[]>([])

onMounted(() => {
  reviewsStore.getReviews()
})

watch(
  () => reviewsStore.sorted,
  (updatedReviews) => {
    reviews.value = updatedReviews
    calculateDisplayedReviews()
    calculateTotalPages()
  },
  { deep: true }
)

const selected = ref(0)

const handleTabChange = (selectedTabIndex: number) => {
  selected.value = selectedTabIndex
  const selectedTab = tabs[selectedTabIndex]

  router.push(selectedTab.to)
}

const tabs = [
  {
    id: 'all-reviews',
    content: 'All Reviews',
    get badge() {
      return reviewsStore.reviewCount
    },
    accessibilityLabel: 'All Reviews',
    to: '/reviews'
  },
  {
    id: 'published-reviews',
    content: 'Published Reviews',
    get badge() {
      return reviewsStore.published.length
    },
    to: '/published-reviews'
  },
  {
    id: 'store-reviews',
    content: 'Store Reviews',
    get badge() {
      return 0
    },
    to: '/store-reviews'
  }
]

const ITEMS_PER_PAGE = 10

const currentPage = ref(1)

const totalPages = ref(0)

const displayedReviews = ref<ReviewItem[]>([])

const calculateDisplayedReviews = () => {
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  displayedReviews.value = reviews.value.slice(startIndex, endIndex)
}

const calculateTotalPages = () => {
  totalPages.value = Math.ceil(reviews.value.length / ITEMS_PER_PAGE)
}

watch(currentPage, () => {
  calculateDisplayedReviews()
})

calculateDisplayedReviews()

const startIndex = computed(() => (currentPage.value - 1) * ITEMS_PER_PAGE + 1)
const endIndex = computed(() => Math.min(currentPage.value * ITEMS_PER_PAGE, reviews.value.length))
</script>

<style lang="scss">
.review-body {
  white-space: normal;
  word-wrap: break-word;
  max-width: 800px;
  box-sizing: border-box;
}

.verifiedBadge {
  background-color: lighten(#329999, 50%);
  color: darken(#329999, 50%);
}

.reviewImages {
  display: flex;
  gap: 10px;
}

.reviewSection {
  margin: 20px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span.Polaris-Text--root.Polaris-Text--medium.Polaris-Text--bodySm {
  display: flex;
  align-items: center;
}

.pageNumbers {
  width: 500px;
  /* display: block; */
  padding: 20px 20px;
}
</style>
