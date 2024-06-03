<script setup lang="ts">
import { useReviewsStore } from '@/stores/reviewsStore'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Reviews from '@/components/ReviewsList.vue'

const router = useRouter()
const route = useRoute()

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
    accessibilityLabel: 'Published Reviews',
    to: '/published-reviews'
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




const showPublished = computed(() => route.path === '/published-reviews')

const allReviewsBadgeTone = computed(() => {
  return showPublished.value ? (reviewsStore.published.length > 0 ? 'success' : 'attention') : undefined;
});

const showBadgeText = computed(() => {
  if (showPublished.value) {
    return `${reviewsStore.published.length} Published Reviews`
  } else {
    return `${startIndex.value}-${endIndex.value} of ${reviews.value.length} Reviews`
  }
})
</script>

<template>
  <Box paddingBlock="400" class="header">
    <div style="display: flex; align-items: center; gap: 10px">
      <Text variant="headingLg" as="h1"> Reviews Dashboard </Text>
       <Badge :tone="allReviewsBadgeTone" as="h1">
        {{ showBadgeText }}
      </Badge>
    </div>
    <RouterLink to="/new-review">
      <Button class="button" accessibilityLabel="Write a Product Review">
        Create a Product Review
      </Button>
    </RouterLink>
  </Box>

  <LegacyCard>
    <div v-if="reviewsStore.reviewCount">
      <Tabs :tabs="tabs" :selected="selected" @select="handleTabChange" />
    </div>
    <div v-else>
      <SkeletonTabs :count="tabs.length" />
    </div>
    <Reviews :showPublished="showPublished" />
  </LegacyCard>
</template>

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
  padding: 20px 20px;
}
</style>
