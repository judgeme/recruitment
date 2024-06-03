<script lang="ts" setup>
import StarRating from '@/components/ui/StarRating.vue'
import { useReviewsStore } from '@/stores/reviewsStore'
import { createRatingFromFirstDigit } from '@/utils/helper'
import { useIndexResourceState } from '@ownego/polaris-vue'
import { useTimeAgo } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ showPublished: boolean }>()

const reviewsStore = useReviewsStore()
const router = useRouter()

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
  () => (props.showPublished ? reviewsStore.published : reviewsStore.sorted),
  (updatedReviews) => {
    reviews.value = updatedReviews
    calculateDisplayedReviews()
    calculateTotalPages()
  },
  { deep: true }
)

const resourceName = {
  singular: 'review',
  plural: 'reviews'
}

const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(
  reviews.value
)

const deleteSelectedReviews = () => {
  if (selectedResources.value.length === 0) {
    console.warn('No reviews selected for deletion')
    return
  }

  selectedResources.value.forEach((id) => reviewsStore.deleteReview(id))

  selectedResources.value = []
}

const publishSelectedReviews = () => {
  if (selectedResources.value.length === 0) {
    console.warn('No reviews selected for publication')
    return
  }

  selectedResources.value.forEach((id) => reviewsStore.publishReview(id))

  selectedResources.value = []
}

const promotedBulkActions = [
  {
    content: 'Delete All Selected Reviews',
    onAction: () => deleteSelectedReviews()
  },
  {
    content: 'Publish All Selected Reviews',
    onAction: () => publishSelectedReviews()
  }
]

const handleDeleteReview = (review: string) => {
  reviewsStore.deleteReview(review)
}

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

const handlePageChange = (page: number) => {
  currentPage.value = page
  const navbar = document.getElementById('navbar')
  navbar?.scrollIntoView({ behavior: 'smooth' })
}


const handlePublish = (review: string) => {
  reviewsStore.publishReview(review)
}

calculateDisplayedReviews()

const startIndex = computed(() => (currentPage.value - 1) * ITEMS_PER_PAGE + 1)
const endIndex = computed(() => Math.min(currentPage.value * ITEMS_PER_PAGE, reviews.value.length))

const handleEditReview = (id: string) => {
  router.push(`/edit-review/${id}`)
}
</script>

<template>
  <div v-if="reviews.length > 0">
    <IndexTable
      :loading="reviewsStore.loading"
      :promotedBulkActions="promotedBulkActions"
      :resourceName="resourceName"
      :itemCount="reviews.length ? reviews.length : 1"
      :selectedItemsCount="allResourcesSelected ? 'All' : selectedResources.length"
      @selection-change="handleSelectionChange"
      :hasZebraStriping="true"
      :headings="[
        { title: 'Customer' },
        { title: 'Location' },
        { title: 'Created' },
        { title: 'Review' },
        { title: 'Actions' }
      ]"
    >
      <IndexTableRow
        v-for="({ id, reviewer, review }, index) in displayedReviews"
        :id="id"
        :key="id"
        :position="index"
        :selected="selectedResources.includes(id)"
      >
        <!-- Customer -->
        <IndexTableCell :padding="300" :flush="true">
          <BlockStack gap="200">
            <InlineStack :wrap="false" gap="200" blockAlign="center">
              <Avatar :source="reviewer.image" />
            </InlineStack>
            <Text variant="bodyMd" fontWeight="bold" as="span">{{ reviewer.name }}</Text>
            <Text variant="headingXs" fontWeight="regular" as="p">Email Address:</Text>
            <a :href="`mailto:${reviewer.email}`">{{ reviewer.email }}</a>
            <div>
              <Badge v-show="review.verifiedPurchase" class="verifiedBadge"
                >Verified Purchase</Badge
              >
            </div>
          </BlockStack>
        </IndexTableCell>
        <!-- Country -->
        <IndexTableCell :flush="true">
          <Box minWidth="100px">
            <Badge size="small">📍 {{ reviewer.country }}</Badge>
          </Box>
        </IndexTableCell>
        <!-- Date -->
        <IndexTableCell :flush="true">
          {{ useTimeAgo(review.date).value }}
        </IndexTableCell>
        <!-- Rating -->
        <IndexTableCell>
          <BlockStack gap="200" class="reviewSection" align="center">
            <div>
              <StarRating
                :rating="createRatingFromFirstDigit(review.rating)"
                :readOnly="true"
                :star-size="10"
              />
            </div>
            <div>
              <Text variant="bodyMd" fontWeight="bold">{{ review.reviewTitle }}</Text>
            </div>
            <div class="review-body">{{ review.reviewBody }}</div>
            <div class="reviewImages">
              <Avatar
                size="xl"
                :source="image"
                v-for="(image, index) in review.reviewImages"
                :key="index"
              />
            </div>
          </BlockStack>
          <box paddingBlock="200">
            <div v-if="!review.published">
              <Button @click="()=> handlePublish(id)">Publish Review</Button>
            </div>
            <div v-else>
              <Text tone="success">This review has been published already</Text>
              <Box paddingBlock="200">
                <Button @click="() => handlePublish(id)">Hide Review</Button>
              </Box>
            </div>
          </box>
        </IndexTableCell>
        <!-- Action -->
        <IndexTableCell>
          <Link dataPrimaryLink> </Link>
          <ButtonGroup variant="segmented">
            <Button @click="() => handleEditReview(id)">View</Button>
            <Button @click="() => handleEditReview(id)">Edit</Button>
            <Button @click="() => handleDeleteReview(id)">Delete</Button>
          </ButtonGroup>
        </IndexTableCell>
      </IndexTableRow>
    </IndexTable>
  </div>

  <div v-else>
    <EmptyState
      heading="There are currently no reviews"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>Once reviews are available they will appear here</p>
    </EmptyState>
  </div>
  <Divider borderColor="border" borderWidth="100" />
  <BlockStack gap="500" inlineAlign="center">
    <!-- Pagination Controls -->
    <Box paddingBlockStart="300">
      <div>
        <Button
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
          size="large"
          >Previous</Button
        >
        <span class="pageNumbers">Page {{ currentPage }} of {{ totalPages }}</span>
        <Button
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
          size="large"
          >Next</Button
        >
      </div>
    </Box>
    <Box paddingBlockEnd="300">
      <div class="pagination-info">
        <Badge>{{ startIndex }}-{{ endIndex }} of {{ reviews.length }} Reviews</Badge>
      </div>
    </Box>
  </BlockStack>
</template>
